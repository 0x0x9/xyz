
'use client';

import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Image from 'next/image';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { listDocumentsAction, uploadDocumentAction, shareDocumentAction, deleteDocumentAction, createFolderAction, deleteFolderAction, getSignedUrlAction, renameDocumentAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

import { Folder, FileText, FileImage, File, UploadCloud, MoreVertical, Download, Share2, Trash2, Edit, X, FolderPlus, Home, List, LayoutGrid } from 'lucide-react';
import type { Doc } from '@/ai/types';

type ItemToDelete = { type: 'file'; doc: Doc } | { type: 'folder'; path: string; name: string };
type ItemToRename = { type: 'file'; doc: Doc } | { type: 'folder'; path: string; name: string };


const getFileIcon = (mimeType: string): ReactNode => {
    if (mimeType.startsWith('image/')) return <FileImage className="h-5 w-5 text-blue-400 shrink-0" />;
    if (mimeType.startsWith('text/')) return <FileText className="h-5 w-5 text-green-400 shrink-0" />;
    return <File className="h-5 w-5 text-gray-400 shrink-0" />;
};

const getFileIconForGrid = (mimeType: string): ReactNode => {
    const className = "w-16 h-16 text-muted-foreground/80";
    if (mimeType.startsWith('image/')) return <FileImage className={cn(className, "text-blue-500/70")} />;
    if (mimeType.startsWith('text/')) return <FileText className={cn(className, "text-green-500/70")} />;
    return <File className={cn(className)} />;
};

const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes || bytes === 0) return '0 Octets';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};


export default function DocManager({ onDataChange, onFileSelect, extraActions }: { onDataChange?: () => void, onFileSelect?: (doc: Doc) => void, extraActions?: React.ReactNode }) {
    const [docs, setDocs] = useState<Doc[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();
    
    const [currentPath, setCurrentPath] = useState('');
    const [previewFile, setPreviewFile] = useState<Doc | null>(null);
    const [previewContent, setPreviewContent] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [isCreateFolderDialogOpen, setCreateFolderDialogOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null);
    const [itemToRename, setItemToRename] = useState<ItemToRename | null>(null);
    const [newName, setNewName] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'icons'>('icons');
    const [thumbnails, setThumbnails] = useState<Record<string, string>>({});


    const fetchDocs = useCallback(async () => {
        setLoading(true);
        try {
            const result = await listDocumentsAction();
            setDocs(result || []);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erreur', description: error.message });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs]);

    const currentItems = useMemo(() => {
        const folders = new Set<string>();
        const files: Doc[] = [];

        for (const doc of docs) {
            if (!doc.path.startsWith(currentPath)) continue;

            const relativePath = doc.path.substring(currentPath.length);
            const segments = relativePath.split('/');

            if (segments.length > 1 && segments[0]) {
                folders.add(segments[0]);
            } else if (segments.length === 1 && segments[0]) {
                if (doc.mimeType !== 'application/x-directory') {
                    files.push(doc);
                }
            }
        }
        
        return { 
            files: files.sort((a,b) => a.name.localeCompare(b.name)), 
            folders: Array.from(folders).sort() 
        };
    }, [docs, currentPath]);

    useEffect(() => {
        if (viewMode === 'icons') {
            const imageFiles = currentItems.files.filter(doc => doc.mimeType.startsWith('image/'));
            if (imageFiles.length > 0) {
                imageFiles.forEach(async (doc) => {
                    if (!thumbnails[doc.id]) {
                        try {
                            const result = await getSignedUrlAction({ docId: doc.id });
                            setThumbnails(prev => ({ ...prev, [doc.id]: result.url }));
                        } catch (e) {
                            console.error("Failed to get thumbnail url for " + doc.path, e);
                        }
                    }
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItems.files, viewMode]);

    const handleFileUpload = async (file: File) => {
        setUploading(true);
        const reader = new FileReader();
        reader.onload = async () => {
            const dataUri = reader.result as string;
            try {
                const finalName = currentPath + file.name;
                await uploadDocumentAction({ name: finalName, content: dataUri, mimeType: file.type });
                toast({ title: 'Succès', description: `"${file.name}" a été envoyé dans ${currentPath || 'le dossier principal'}.` });
                fetchDocs();
                onDataChange?.();
            } catch (error: any) {
                 toast({ variant: "destructive", title: "Échec de l'envoi", description: error.message });
            } finally {
                setUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
        e.target.value = '';
    };

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) {
            toast({ variant: 'destructive', description: "Le nom du dossier ne peut pas être vide." });
            return;
        }
        try {
            await createFolderAction({ currentPath, folderName: newFolderName.trim() });
            toast({ title: 'Succès', description: `Dossier "${newFolderName.trim()}" créé.` });
            fetchDocs();
            onDataChange?.();
            setCreateFolderDialogOpen(false);
            setNewFolderName('');
        } catch (error: any) {
             toast({ variant: 'destructive', title: 'Erreur', description: error.message });
        }
    };
    
    const handleDownload = async (doc: Doc) => {
        try {
            const result = await getSignedUrlAction({ docId: doc.id });
            window.open(result.url, '_blank');
        } catch (error: any) {
            toast({ variant: "destructive", title: "Erreur de téléchargement", description: error.message });
        }
    };

    const handleShare = async (doc: Doc) => {
        try {
            const { shareLink } = await shareDocumentAction({ docId: doc.id, makePublic: !doc.shareId });
            if (shareLink) {
                navigator.clipboard.writeText(shareLink);
                toast({ title: "Lien de partage copié !", description: "Le lien public a été copié dans votre presse-papiers."});
            } else {
                toast({ title: "Partage désactivé", description: "Ce fichier est maintenant privé."});
            }
            fetchDocs();
            onDataChange?.();
        } catch (error: any) {
             toast({ variant: "destructive", title: "Erreur de partage", description: error.message });
        }
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        try {
            if (itemToDelete.type === 'file') {
                await deleteDocumentAction({ docId: itemToDelete.doc.id });
                toast({ title: "Fichier supprimé", description: `"${itemToDelete.doc.name.split('/').pop()}" a été supprimé.` });
            } else {
                await deleteFolderAction({ folderPath: itemToDelete.path });
                toast({ title: "Dossier supprimé", description: `Le dossier "${itemToDelete?.name}" et tout son contenu ont été supprimés.` });
            }
            fetchDocs();
            onDataChange?.();
        } catch (error: any) {
             toast({ variant: "destructive", title: "Erreur de suppression", description: error.message });
        } finally {
            setItemToDelete(null);
        }
    };

    const handleRename = async () => {
        if (!itemToRename || !newName.trim()) {
            toast({ variant: "destructive", description: "Le nouveau nom est requis." });
            return;
        }
        try {
            const oldPath = itemToRename.type === 'file' ? itemToRename.doc.path : itemToRename.path;
            const docId = itemToRename.type === 'file' ? itemToRename.doc.id : undefined;

            await renameDocumentAction({ oldPath, newName: newName.trim(), docId });
            toast({ title: "Succès", description: "L'élément a été renommé." });
            fetchDocs();
            onDataChange?.();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Erreur de renommage", description: error.message });
        } finally {
            setItemToRename(null);
            setNewName('');
        }
    };
    
    const handlePreview = async (doc: Doc) => {
        setPreviewFile(doc);
        setPreviewContent(''); // Show loading state
        setIsEditing(false);
        try {
            const result = await getSignedUrlAction({ docId: doc.id });
            const url = result.url;
            if (!url) throw new Error("URL d'aperçu non reçue.");

            if (doc.mimeType.startsWith('image/')) {
                setPreviewContent(url);
            } else if (doc.mimeType.startsWith('text/')) {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
                const textContent = await response.text();
                setPreviewContent(textContent);
            } else {
                setPreviewContent('unsupported');
            }
        } catch (error: any) {
            console.error(error);
            toast({ variant: 'destructive', title: "Erreur d'aperçu", description: "Impossible de charger l'aperçu." });
            setPreviewContent('error');
        }
    };
    
    const handleSaveEdit = async () => {
        if (!previewFile) return;
        const dataUri = `data:${previewFile.mimeType};base64,${btoa(unescape(encodeURIComponent(previewContent)))}`;
        try {
            await uploadDocumentAction({ name: previewFile.path, content: dataUri, mimeType: previewFile.mimeType });
            setIsEditing(false);
            toast({ title: "Fichier sauvegardé !" });
            fetchDocs();
            onDataChange?.();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Erreur de sauvegarde", description: error.message });
        }
    };


    const breadcrumbs = ['Accueil', ...currentPath.split('/').filter(Boolean)];
    const handleBreadcrumbClick = (index: number) => {
        const newPath = breadcrumbs.slice(1, index + 1).join('/') + (index > 0 ? '/' : '');
        setCurrentPath(newPath);
    };

    return (
        <TooltipProvider>
        <div className="h-full flex flex-col">
            <header className="flex-shrink-0 flex flex-wrap items-center justify-between gap-2 p-3 border-b border-white/10 h-auto md:h-14">
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground overflow-hidden">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleBreadcrumbClick(index)} className="flex items-center gap-1">
                                {index === 0 && <Home className="h-4 w-4" />}
                                <span className="truncate max-w-[100px]">{crumb}</span>
                            </Button>
                            {index < breadcrumbs.length - 1 && <span className="text-muted-foreground/50">/</span>}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                     <div className="hidden md:flex items-center gap-1 bg-black/10 dark:bg-white/10 p-0.5 rounded-lg">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')} className="h-7 w-7"><List className="h-4 w-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom"><p>Vue Liste</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                 <Button variant={viewMode === 'icons' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('icons')} className="h-7 w-7"><LayoutGrid className="h-4 w-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom"><p>Vue Icônes</p></TooltipContent>
                        </Tooltip>
                    </div>
                    {extraActions}
                    <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => setCreateFolderDialogOpen(true)}><FolderPlus className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent><p>Nouveau dossier</p></TooltipContent></Tooltip>
                    <Tooltip><TooltipTrigger asChild>
                        <Button asChild variant="ghost" size="icon" disabled={uploading} className="cursor-pointer">
                            <label htmlFor="file-upload">
                                {uploading ? <Skeleton className="h-4 w-4" /> : <UploadCloud className="h-4 w-4" />}
                            </label>
                        </Button>
                    </TooltipTrigger><TooltipContent><p>Envoyer un fichier</p></TooltipContent></Tooltip>
                    <Input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} disabled={uploading} />
                </div>
            </header>
            <div className="flex-1 overflow-y-auto no-scrollbar p-2">
                {loading ? (
                    <div className="space-y-1 pt-1">
                        {Array.from({length: 8}).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 h-9"><Skeleton className="h-5 w-5" /><Skeleton className="h-4 flex-1" /><Skeleton className="h-4 w-16 hidden sm:block" /><Skeleton className="h-4 w-24 hidden md:block" /></div>
                        ))}
                    </div>
                ) : (currentItems.folders.length === 0 && currentItems.files.length === 0) ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground"><p>Ce dossier est vide.</p></div>
                ) : viewMode === 'list' ? (
                     <div className="flex flex-col">
                        <div className="flex items-center gap-3 px-2 pb-1 border-b border-white/10 text-xs text-muted-foreground font-medium sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                            <span className="flex-1">Nom</span>
                            <span className="shrink-0 w-24 hidden sm:block text-right">Taille</span>
                            <span className="shrink-0 w-32 hidden md:block text-right">Dernière modification</span>
                            <span className="shrink-0 w-7"></span>
                        </div>
                        <div className="flex flex-col pt-1">
                            {currentItems.folders.map(folderName => {
                                const fullPath = currentPath + folderName + '/';
                                return (
                                    <div key={folderName} className="group flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-foreground/5">
                                        <button onDoubleClick={() => setCurrentPath(fullPath)} className="flex items-center gap-3 flex-1 cursor-pointer text-left min-w-0">
                                            <Folder className="h-5 w-5 text-yellow-400 shrink-0" />
                                            <span className="text-sm font-medium truncate">{folderName}</span>
                                        </button>
                                        <Popover modal={false}>
                                            <PopoverTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 shrink-0"><MoreVertical className="h-4 w-4"/></Button></PopoverTrigger>
                                            <PopoverContent className="w-48 p-1 glass-card">
                                                <Button variant="ghost" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); setItemToRename({type: 'folder', name: folderName, path: fullPath}); setNewName(folderName); }}><Edit className="h-4 w-4 mr-2"/>Renommer</Button>
                                                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500" onClick={(e) => {e.stopPropagation(); setItemToDelete({type: 'folder', name: folderName, path: fullPath})}}><Trash2 className="h-4 w-4 mr-2"/>Supprimer</Button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )
                            })}
                            {currentItems.files.map(doc => {
                                 const displayName = doc.path.substring(currentPath.length);
                                 return (
                                    <div key={doc.id} className="group flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-foreground/5">
                                        <button onDoubleClick={() => onFileSelect ? onFileSelect(doc) : handlePreview(doc)} className="flex items-center gap-3 flex-1 cursor-pointer text-left min-w-0">
                                            {getFileIcon(doc.mimeType)}
                                            <span className="text-sm font-medium truncate">{displayName}</span>
                                        </button>
                                        <span className="text-xs text-muted-foreground shrink-0 w-24 hidden sm:block text-right">{formatBytes(doc.size)}</span>
                                        <span className="text-xs text-muted-foreground shrink-0 w-32 hidden md:block text-right">{doc.updatedAt ? format(new Date(doc.updatedAt), 'dd/MM/yy HH:mm', { locale: fr }) : 'N/A'}</span>
                                        <div className="w-7 shrink-0">
                                            <Popover modal={false}>
                                                <PopoverTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100"><MoreVertical className="h-4 w-4"/></Button></PopoverTrigger>
                                                <PopoverContent className="w-48 p-1 glass-card">
                                                    <Button variant="ghost" className="w-full justify-start" onClick={(e) => {e.stopPropagation(); onFileSelect ? onFileSelect(doc) : handlePreview(doc)}}><File className="h-4 w-4 mr-2"/>{onFileSelect ? 'Ouvrir' : 'Aperçu'}</Button>
                                                    <Button variant="ghost" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); setItemToRename({type: 'file', doc}); setNewName(displayName); }}><Edit className="h-4 w-4 mr-2"/>Renommer</Button>
                                                    <Button variant="ghost" className="w-full justify-start" onClick={(e) => {e.stopPropagation(); handleDownload(doc)}}><Download className="h-4 w-4 mr-2"/>Télécharger</Button>
                                                    <Button variant="ghost" className="w-full justify-start" onClick={(e) => {e.stopPropagation(); handleShare(doc)}}><Share2 className="h-4 w-4 mr-2"/>{doc.shareId ? 'Arrêter le partage' : 'Partager'}</Button>
                                                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500" onClick={(e) => {e.stopPropagation(); setItemToDelete({type: 'file', doc})}}><Trash2 className="h-4 w-4 mr-2"/>Supprimer</Button>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                 )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 p-4">
                        {currentItems.folders.map(folderName => {
                            const fullPath = currentPath + folderName + '/';
                            return (
                                <button key={folderName} onDoubleClick={() => setCurrentPath(fullPath)} className="group relative rounded-xl p-2 text-center transition-all duration-200 hover:bg-primary/5 focus:bg-primary/5 focus:outline-none flex flex-col items-center">
                                    <div className="relative flex h-24 w-full items-center justify-center">
                                        <Folder className="h-24 w-24 text-yellow-400 drop-shadow-lg" />
                                    </div>
                                    <p className="mt-1 block text-sm font-medium min-h-[2.5rem]">{folderName}</p>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Popover modal={false}><PopoverTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-4 w-4"/></Button></PopoverTrigger>
                                            <PopoverContent className="w-48 p-1 glass-card">
                                                <Button variant="ghost" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); setItemToRename({type: 'folder', name: folderName, path: fullPath}); setNewName(folderName); }}><Edit className="h-4 w-4 mr-2"/>Renommer</Button>
                                                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500" onClick={(e) => {e.stopPropagation(); setItemToDelete({type: 'folder', name: folderName, path: fullPath})}}><Trash2 className="h-4 w-4 mr-2"/>Supprimer</Button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </button>
                            );
                        })}
                        {currentItems.files.map(doc => {
                             const displayName = doc.path.substring(currentPath.length);
                             const isImage = doc.mimeType.startsWith('image/');
                             const thumbnailUrl = thumbnails[doc.id];
                             return (
                                <button key={doc.id} onDoubleClick={() => onFileSelect ? onFileSelect(doc) : handlePreview(doc)} className="group relative rounded-xl p-2 text-center transition-all duration-200 hover:bg-primary/5 focus:bg-primary/5 focus:outline-none flex flex-col">
                                    <div className="aspect-square w-full bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden p-2">
                                        {isImage && thumbnailUrl ? <Image src={thumbnailUrl} alt={displayName} fill className="object-contain" /> : isImage ? <Skeleton className="w-full h-full" /> : <div className="h-full w-full flex items-center justify-center">{getFileIconForGrid(doc.mimeType)}</div>}
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-center min-h-[2.5rem]">{displayName}</p>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <Popover modal={false}>
                                            <PopoverTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-4 w-4"/></Button></PopoverTrigger>
                                            <PopoverContent className="w-48 p-1 glass-card">
                                                <Button variant="ghost" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); onFileSelect ? onFileSelect(doc) : handlePreview(doc)}}><File className="h-4 w-4 mr-2"/>{onFileSelect ? 'Ouvrir' : 'Aperçu'}</Button>
                                                <Button variant="ghost" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); setItemToRename({type: 'file', doc}); setNewName(displayName); }}><Edit className="h-4 w-4 mr-2"/>Renommer</Button>
                                                <Button variant="ghost" className="w-full justify-start" onClick={(e) => {e.stopPropagation(); handleDownload(doc)}}><Download className="h-4 w-4 mr-2"/>Télécharger</Button>
                                                <Button variant="ghost" className="w-full justify-start" onClick={(e) => {e.stopPropagation(); handleShare(doc)}}><Share2 className="h-4 w-4 mr-2"/>{doc.shareId ? 'Arrêter le partage' : 'Partager'}</Button>
                                                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500" onClick={(e) => {e.stopPropagation(); setItemToDelete({type: 'file', doc})}}><Trash2 className="h-4 w-4 mr-2"/>Supprimer</Button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </button>
                             )
                        })}
                    </div>
                )}
            </div>

            <AlertDialog open={isCreateFolderDialogOpen} onOpenChange={setCreateFolderDialogOpen}>
                <AlertDialogContent className="glass-card">
                    <AlertDialogHeader><AlertDialogTitle>Créer un nouveau dossier</AlertDialogTitle><AlertDialogDescription>Entrez le nom du nouveau dossier dans "{currentPath || 'Accueil'}".</AlertDialogDescription></AlertDialogHeader>
                    <div className="py-2"><Input placeholder="Nom du dossier" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()} autoFocus /></div>
                    <AlertDialogFooter><AlertDialogCancel onClick={() => setNewFolderName('')}>Annuler</AlertDialogCancel><AlertDialogAction onClick={handleCreateFolder}>Créer</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

             <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
                <AlertDialogContent className="glass-card">
                    <AlertDialogHeader><AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                           Cette action est irréversible. {itemToDelete?.type === 'file' ? `Le fichier "${itemToDelete.doc.name.split('/').pop()}" sera supprimé.` : `Le dossier "${itemToDelete?.name}" et tout son contenu seront supprimés.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Supprimer</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

             <AlertDialog open={!!itemToRename} onOpenChange={(open) => !open && setItemToRename(null)}>
                <AlertDialogContent className="glass-card">
                    <AlertDialogHeader><AlertDialogTitle>Renommer</AlertDialogTitle><AlertDialogDescription>Entrez le nouveau nom pour "{itemToRename?.type === 'file' ? itemToRename.doc.name.split('/').pop() : itemToRename?.name}".</AlertDialogDescription></AlertDialogHeader>
                    <div className="py-2"><Input value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleRename()} autoFocus /></div>
                    <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={handleRename}>Renommer</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={!!previewFile} onOpenChange={(isOpen) => !isOpen && setPreviewFile(null)}>
                <AlertDialogContent className="max-w-4xl w-[90vw] h-[80vh] flex flex-col p-0 glass-card">
                    <AlertDialogHeader className="flex-none flex flex-row items-center justify-between p-4 border-b border-white/10 space-y-0">
                         <AlertDialogTitle className="truncate pr-4">{previewFile?.name.split('/').pop()}</AlertDialogTitle>
                         <div className="flex items-center gap-2">
                             {isEditing && <Button size="sm" onClick={handleSaveEdit}>Sauvegarder</Button>}
                             {previewFile?.mimeType.startsWith('text/') && <Button size="icon" variant="ghost" onClick={() => setIsEditing(!isEditing)}><Edit className="h-4 w-4"/></Button>}
                              <Button size="icon" variant="ghost" onClick={() => previewFile && handleDownload(previewFile)}><Download className="h-4 w-4" /></Button>
                             <AlertDialogCancel asChild><Button size="icon" variant="ghost"><X className="h-4 w-4"/></Button></AlertDialogCancel>
                         </div>
                    </AlertDialogHeader>
                    <div className="flex-1 p-4 overflow-auto no-scrollbar flex items-center justify-center">
                        {!previewContent ? <Skeleton className="w-full h-full" /> : 
                         previewContent === 'unsupported' ? <div className="text-center text-muted-foreground">
                            <p>La prévisualisation de ce type de fichier n'est pas supportée.</p>
                            <Button className="mt-4" onClick={() => previewFile && handleDownload(previewFile)}>Télécharger</Button>
                         </div> :
                         previewContent === 'error' ? <p>Impossible de charger l'aperçu.</p> :
                         previewFile?.mimeType.startsWith('image/') ? <img src={previewContent} alt={previewFile.name} className="max-w-full max-h-full object-contain mx-auto"/> :
                         isEditing ? <Textarea value={previewContent} onChange={(e) => setPreviewContent(e.target.value)} className="w-full h-full resize-none font-mono bg-white/10"/> : <pre className="whitespace-pre-wrap font-mono">{previewContent}</pre>
                        }
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        </TooltipProvider>
    );
}
