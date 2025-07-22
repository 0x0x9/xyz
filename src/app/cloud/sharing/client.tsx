'use client';

import type { ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Link as LinkIcon, Lock, FileImage, FileText, File, Clock, HardDrive, Globe, Folder } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { shareDocumentAction } from '@/app/actions';
import type { Doc } from '@/ai/types';

const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes || bytes === 0) return '0 Octets';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getFileIcon = (mimeType: string): ReactNode => {
    if (mimeType === 'application/x-directory') return <Folder className="h-10 w-10 text-yellow-400" />;
    if (mimeType.startsWith('image/')) return <FileImage className="h-10 w-10 text-blue-400" />;
    if (mimeType.startsWith('text/')) return <FileText className="h-10 w-10 text-green-400" />;
    return <File className="h-10 w-10 text-gray-400" />;
};

const SharingCard = ({ doc, onShareToggle, onCopyLink }: { doc: Doc; onShareToggle: (doc: Doc) => void; onCopyLink: (shareLink: string) => void }) => {
    const isFolderPlaceholder = doc.mimeType === 'application/x-directory';
    if (isFolderPlaceholder) return null;

    return (
        <Card className="glass-card flex flex-col text-center overflow-hidden">
            <CardHeader className="p-6 items-center">
                <div className={cn(
                    "relative w-16 h-16 flex items-center justify-center rounded-2xl",
                    doc.mimeType.startsWith('image/') && "bg-blue-500/10",
                    doc.mimeType.startsWith('text/') && "bg-green-500/10",
                    doc.mimeType === 'application/x-directory' && "bg-yellow-500/10",
                    !doc.mimeType.startsWith('image/') && !doc.mimeType.startsWith('text/') && doc.mimeType !== 'application/x-directory' && "bg-gray-500/10"
                )}>
                    {getFileIcon(doc.mimeType)}
                     <div className={cn(
                        "absolute -inset-2 rounded-full opacity-15 blur-lg",
                        doc.mimeType.startsWith('image/') && "bg-blue-500",
                        doc.mimeType.startsWith('text/') && "bg-green-500",
                        doc.mimeType === 'application/x-directory' && "bg-yellow-500",
                        !doc.mimeType.startsWith('image/') && !doc.mimeType.startsWith('text/') && doc.mimeType !== 'application/x-directory' && "bg-gray-500"
                    )}></div>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow flex flex-col">
                <CardTitle className="text-base font-semibold truncate flex-grow" title={doc.name.split('/').pop() || doc.name}>
                    {doc.name.split('/').pop()}
                </CardTitle>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-4 mt-3">
                    <span className="flex items-center gap-1.5"><HardDrive className="h-3 w-3" /> {formatBytes(doc.size)}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {doc.updatedAt ? format(new Date(doc.updatedAt), 'dd/MM/yy', { locale: fr }) : 'N/A'}</span>
                </div>
                 {doc.shareId && (
                    <Badge variant="outline" className="mt-3 mx-auto border-green-500/30 bg-green-500/10 text-green-300 text-xs">
                        <Globe className="h-3 w-3 mr-1.5"/>Partage public actif
                    </Badge>
                )}
            </CardContent>
            <CardFooter className="mt-auto bg-black/5 dark:bg-black/20 p-2 border-t border-white/10 dark:border-white/10">
                 {doc.shareId ? (
                    <div className="flex w-full gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onCopyLink(`https://xyzz.ai/share/${doc.shareId!}`)} className="flex-1 hover:bg-accent/50"><LinkIcon className="h-4 w-4 mr-2" /> Copier le lien</Button>
                        <Button variant="ghost" size="sm" onClick={() => onShareToggle(doc)} className="flex-1 hover:bg-accent/50 text-muted-foreground"><Lock className="h-4 w-4 mr-2" /> Rendre privé</Button>
                    </div>
                ) : (
                    <Button variant="ghost" size="sm" onClick={() => onShareToggle(doc)} className="w-full hover:bg-accent/50"><Share2 className="h-4 w-4 mr-2" /> Activer le partage</Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default function SharingClient({ docs, onDataChange }: { docs: Doc[], onDataChange: () => void }) {
    const { toast } = useToast();

    const handleShareToggle = async (doc: Doc) => {
        try {
            const { shareLink } = await shareDocumentAction({ docId: doc.id, makePublic: !doc.shareId });
            if (shareLink) {
                navigator.clipboard.writeText(shareLink);
                toast({ title: "Lien de partage copié !", description: "Le fichier est maintenant public."});
            } else {
                toast({ title: "Partage désactivé", description: "Ce fichier est maintenant privé."});
            }
            onDataChange();
        } catch (error: any) {
             toast({ variant: "destructive", title: "Erreur de partage", description: error.message });
        }
    };

    const copyLink = (url: string) => {
        navigator.clipboard.writeText(url);
        toast({ title: "Lien copié !", description: "Le lien de partage a été copié." });
    };

    const sortedDocs = [...docs].sort((a,b) => {
        const aName = a.name.split('/').pop() ?? '';
        const bName = b.name.split('/').pop() ?? '';
        return aName.localeCompare(bName);
    });

    return (
        <>
            <div className="mb-6">
                <h2 className="text-3xl font-bold">Partage</h2>
                <p className="text-gray-400">Gérez les liens de partage de vos fichiers.</p>
            </div>
            {sortedDocs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedDocs.map(doc => (
                        <SharingCard key={doc.id} doc={doc} onShareToggle={handleShareToggle} onCopyLink={copyLink} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-white/10 rounded-xl">
                    <Share2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 font-semibold">Vous n'avez aucun fichier.</p>
                    <p className="text-sm">Ajoutez des fichiers pour pouvoir les partager.</p>
                </div>
            )}
        </>
    );
}
