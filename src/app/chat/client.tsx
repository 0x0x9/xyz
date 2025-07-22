
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Send, ArrowLeft, MessageSquare, Search, Sparkles, Loader, Home, AppWindow, Settings, Folder, BrainCircuit, Trash2, Edit, PanelLeft, Wand2, CheckSquare, FolderOpen } from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { OriaHistoryMessage, ProjectPlan, OriaChatOutput } from '@/ai/types';
import { AnimatePresence, motion } from 'framer-motion';
import { oriaChatAction } from '@/app/actions';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Link from 'next/link';
import Explorer from '@/components/explorer';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar';
import { useTheme } from 'next-themes';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


// Types
type Message = {
    id: string;
    senderId: string;
    text: string;
    timestamp: string | null;
};

type ChatPartner = {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
};

type ProjectDoc = {
    id: string;
    name: string;
    title: string;
    creativeBrief: string;
    tasks: ProjectPlan['tasks'];
};

// Mock user for development
const mockUser = {
  uid: 'mock-user-uid',
  displayName: 'Mock User',
  photoURL: null,
};


// Sub-components
function SearchResultsSkeleton() {
    return (
        <div className="p-2 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
                 <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-5 w-3/4" />
                </div>
            ))}
        </div>
    )
}

function ChatWindowSkeleton() {
    return (
        <div className="h-full w-full flex flex-col p-4">
            <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-40" />
            </div>
            <div className="flex-1 space-y-4">
                <Skeleton className="h-12 w-3/4 rounded-2xl self-start" />
                <Skeleton className="h-16 w-1/2 rounded-2xl self-end ml-auto" />
                <Skeleton className="h-8 w-2/3 rounded-2xl self-start" />
            </div>
            <Skeleton className="h-12 w-full mt-4 rounded-full" />
        </div>
    )
}

const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = parseISO(dateString);
    if (!isValid(date)) return '';
    const now = new Date();
    const diffDays = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);

    if (diffDays < 1 && now.getDate() === date.getDate()) {
        return format(date, 'HH:mm'); // Today
    }
    if (diffDays < 2 && now.getDate() - 1 === date.getDate()) {
        return 'Hier'; // Yesterday
    }
    return format(date, 'dd/MM/yy');
};

function ProjectTracker({ activeProject, setActiveProject, onProjectDeleted, projects, loading }: { activeProject: ProjectDoc | null, setActiveProject: (project: ProjectDoc | null) => void, onProjectDeleted: (deletedId: string) => void, projects: ProjectDoc[], loading: boolean }) {
    const [projectToDelete, setProjectToDelete] = useState<ProjectDoc | null>(null);
    const { toast } = useToast();

    const calculateProgress = (tasks: ProjectPlan['tasks']) => {
        if (!tasks || tasks.length === 0) return 0;
        const allChecklistItems = tasks.flatMap(task => task.checklist);
        if (allChecklistItems.length === 0) return 0;
        const completedItems = allChecklistItems.filter(item => item.completed).length;
        return (completedItems / allChecklistItems.length) * 100;
    };

    const handleDeleteProject = async () => {
        if (!projectToDelete) return;
        // In a real app, you would call a server action to delete the document
        toast({ title: "Projet supprimé", description: `"${projectToDelete.title}" a été supprimé.` });
        const deletedId = projectToDelete.id;
        setProjectToDelete(null);
        onProjectDeleted(deletedId); // Notify parent to clear active project if needed & refetch
    };

    return (
        <div className="p-2 space-y-2">
            <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground mb-1">Projets Récents</h3>
            {loading ? (
                Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-full" />
                        </div>
                    </div>
                ))
            ) : projects.length > 0 ? (
                projects.map(proj => (
                    <div key={proj.id} className="group relative">
                        <button
                            onClick={() => setActiveProject(proj)}
                            className={cn(
                                "w-full text-left p-3 rounded-xl transition-colors flex items-center gap-3",
                                activeProject?.id === proj.id ? "bg-primary/10" : "hover:bg-muted/50"
                            )}
                        >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <BrainCircuit className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-semibold truncate text-sm">{proj.title}</p>
                                <div className="w-full bg-muted rounded-full h-1.5 mt-1.5">
                                    <Progress value={calculateProgress(proj.tasks)} className="h-1.5" />
                                </div>
                            </div>
                        </button>
                         <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); setProjectToDelete(proj); }}
                            className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Supprimer le projet"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))
            ) : (
                <p className="text-center text-xs text-muted-foreground p-4">Aucun projet récent trouvé.</p>
            )}

            <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
                <AlertDialogContent className="glass-card">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer le projet ?</AlertDialogTitle>
                        <AlertDialogDescription>
                           Êtes-vous sûr de vouloir supprimer le projet "{projectToDelete?.title}" ? Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteProject} className="bg-destructive hover:bg-destructive/90">
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

function ChatWindow({ partner, currentUser, chatId, onBack }: { partner: ChatPartner, currentUser: typeof mockUser, chatId: string, onBack: () => void }) {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        setLoading(true);
        // Placeholder for fetching messages
        setTimeout(() => {
            setMessages([
                { id: '1', senderId: 'other-user', text: 'Hello!', timestamp: new Date().toISOString() },
                { id: '2', senderId: currentUser.uid, text: 'Hi there!', timestamp: new Date().toISOString() },
            ]);
            setLoading(false);
        }, 1000);
    }, [chatId, toast, currentUser.uid]);
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;
        
        const textToSend = newMessage;
        setNewMessage('');

        const optimisticMessage: Message = { id: Date.now().toString(), senderId: currentUser.uid, text: textToSend, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, optimisticMessage]);

        // Placeholder for sending message
    };

    if (loading) return <div className="glass-card h-full w-full"><ChatWindowSkeleton /></div>;
    
    return (
        <div className="glass-card h-full flex flex-col">
            <header className="p-4 border-b border-white/10 flex items-center gap-4 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
                    <ArrowLeft />
                </Button>
                <Avatar>
                    <AvatarImage src={partner.photoURL || undefined} alt={partner.displayName || 'Avatar'} />
                    <AvatarFallback>{partner.displayName?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{partner.displayName}</h3>
                </div>
            </header>
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                 <div className="space-y-6">
                    <AnimatePresence>
                        {messages.map(msg => (
                            <motion.div
                                key={msg.id}
                                layout
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={cn("flex items-end gap-2", msg.senderId === currentUser?.uid ? 'justify-end' : 'justify-start')}
                            >
                                {msg.senderId !== currentUser?.uid && (
                                    <Avatar className="h-8 w-8 self-end">
                                        <AvatarImage src={partner.photoURL || undefined} />
                                        <AvatarFallback>{partner.displayName?.[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-md",
                                    msg.senderId === currentUser?.uid
                                        ? "bg-primary/80 text-primary-foreground rounded-br-none"
                                        : "bg-background/50 rounded-bl-none"
                                )}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    {msg.timestamp && <p className={cn("text-xs opacity-70 mt-1.5", msg.senderId === currentUser?.uid ? 'text-right' : 'text-left')}>
                                        {formatDate(msg.timestamp)}
                                    </p>}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>
             <div className="p-4 border-t border-white/10 shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-4">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre message..."
                        className="h-11 text-base bg-background/50 rounded-full"
                        autoComplete="off"
                    />
                    <Button type="submit" size="icon" disabled={pending || !newMessage.trim()} aria-label="Envoyer le message" className="rounded-full">
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </div>
    )
}

function OriaChatWindow({ partner, onBack, activeProject }: { partner: ChatPartner, onBack: () => void, activeProject: ProjectDoc | null }) {
    const formRef = useRef<HTMLFormElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<OriaHistoryMessage[]>([]);
    
    const clientAction = async (prevState: any, formData: FormData) => {
        const prompt = formData.get('prompt') as string;
        if (!prompt.trim()) return { ...prevState, error: "Le message ne peut être vide." };
        
        const newHistory = [...messages, { role: 'user', content: prompt }] as OriaHistoryMessage[];
        setMessages(newHistory);
        
        const simpleHistory = newHistory.map(h => ({
            role: h.role,
            content: typeof h.content === 'string' ? h.content : JSON.stringify(h.content)
        }));
        formData.append('history', JSON.stringify(simpleHistory));
        
        const result = await oriaChatAction(prevState, formData);
        
        if (result.message === 'success' && result.result) {
            setMessages(prev => [...prev, { role: 'model', content: result.result as any }]);
        } else {
            setMessages(prev => [...prev, { role: 'model', content: result.error || "Désolée, une erreur est survenue." }]);
        }
        formRef.current?.reset();
        return result;
    }
    
    const [state, formAction] = useFormState(clientAction, { id: 0, result: null, error: null, message: '' });
    const { pending } = useFormStatus();

     useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);
    
    return (
        <div className="glass-card h-full flex flex-col">
            <header className="p-4 border-b border-white/10 flex items-center gap-4 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
                    <ArrowLeft />
                </Button>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center">
                    <Sparkles className="text-white h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold">{partner.displayName}</h3>
                    {activeProject && <p className="text-xs text-muted-foreground">Contexte : {activeProject.title}</p>}
                </div>
            </header>
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                 <div className="space-y-6">
                    <AnimatePresence>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                layout
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={cn("flex items-end gap-2", msg.role === 'user' ? 'justify-end' : 'justify-start')}
                            >
                                {msg.role === 'model' && (
                                    <div className="w-8 h-8 self-end rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center shrink-0">
                                        <Sparkles className="text-white h-4 w-4" />
                                    </div>
                                )}
                                <div className={cn(
                                    "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-md text-sm whitespace-pre-wrap",
                                    msg.role === 'user'
                                        ? "bg-primary/80 text-primary-foreground rounded-br-none"
                                        : "bg-background/50 rounded-bl-none"
                                )}>
                                    {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
                                </div>
                            </motion.div>
                        ))}
                         {pending && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="flex items-end gap-2 justify-start"
                            >
                                 <div className="w-8 h-8 self-end rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center shrink-0">
                                    <Sparkles className="text-white h-4 w-4 animate-pulse" />
                                </div>
                                <div className="max-w-xs p-3 rounded-2xl shadow-md bg-background/50 rounded-bl-none">
                                    <Loader className="animate-spin h-5 w-5 text-muted-foreground" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ScrollArea>
             <div className="p-4 border-t border-white/10 shrink-0">
                <form ref={formRef} action={formAction} className="flex gap-4">
                    <input type="hidden" name="activeProject" value={activeProject ? JSON.stringify({ title: activeProject.title, creativeBrief: activeProject.creativeBrief }) : ''} />
                    <Input
                        name="prompt"
                        placeholder="Discutez avec Oria..."
                        className="h-11 text-base bg-background/50 rounded-full"
                        autoComplete="off"
                        disabled={pending}
                    />
                    <Button type="submit" size="icon" disabled={pending} aria-label="Envoyer le message" className="rounded-full">
                        {pending ? <Loader className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
                    </Button>
                </form>
            </div>
        </div>
    )
}

function ProjectPlanView({ project, setProject }: { project: ProjectDoc, setProject: (p: ProjectDoc) => void }) {
    const categories = [...new Set(project.tasks.map(task => task.category))];
    const { toast } = useToast();

    const handleChecklistChange = async (taskIndex: number, itemIndex: number, checked: boolean) => {
        const updatedProject = { ...project };
        updatedProject.tasks[taskIndex].checklist[itemIndex].completed = checked;
        setProject(updatedProject); // Optimistic update

        // Placeholder for updating project
    };

    return (
        <ScrollArea className="h-full">
            <div className="p-4 md:p-6 space-y-6">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <blockquote className="border-l-4 border-primary pl-4 text-muted-foreground italic">
                    {project.creativeBrief}
                </blockquote>
                <div className="space-y-6">
                    {categories.map(category => (
                        <div key={category}>
                            <h3 className="text-lg font-semibold mb-3">{category}</h3>
                            <div className="space-y-4">
                                {project.tasks.filter(t => t.category === category).map((task, taskIndex) => (
                                    <div key={taskIndex} className="p-4 rounded-lg bg-black/5 dark:bg-black/10">
                                        <h4 className="font-semibold">{task.title}</h4>
                                        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                                        <div className="space-y-2">
                                            {task.checklist.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center gap-3">
                                                    <Checkbox
                                                        id={`task-${taskIndex}-item-${itemIndex}`}
                                                        checked={item.completed}
                                                        onCheckedChange={(checked) => handleChecklistChange(project.tasks.indexOf(task), itemIndex, !!checked)}
                                                    />
                                                    <label htmlFor={`task-${taskIndex}-item-${itemIndex}`} className="text-sm text-foreground/90 has-[:checked]:line-through has-[:checked]:text-muted-foreground">{item.text}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
}

function NavMenu({ activeView, setActiveView }: { activeView: string; setActiveView: (view: string) => void; }) {
    const navItems = [
        { href: "/xos", icon: AppWindow, label: "PulseStudio", view: 'chat' },
        { href: "/account", icon: Settings, label: "Paramètres", view: 'settings' },
    ];
    return (
        <TooltipProvider>
            <nav className="glass-card flex flex-col items-center gap-4 p-3">
                <Link href="/" aria-label="Accueil">
                    <Home className="h-7 w-7 text-foreground" />
                </Link>

                <div className="w-full h-px bg-white/10 my-2"></div>

                <div className="flex flex-col gap-2 flex-1">
                    {navItems.map(item => (
                        <Tooltip key={item.view}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setActiveView(item.view)}
                                    className={cn("h-12 w-12 rounded-2xl", activeView === item.view && "bg-primary/10 text-primary")}
                                >
                                    <item.icon className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </nav>
        </TooltipProvider>
    );
}

function TopMenuBar({ activeProject, setActiveView, onProjectDeleted, toggleSidebar }: { activeProject: ProjectDoc | null, setActiveView: (v: string) => void, onProjectDeleted: (id: string) => void, toggleSidebar: () => void }) {
    const { theme, setTheme } = useTheme();

    const handleDeleteProject = async () => {
        if (!activeProject) return;
        // Placeholder for delete
        onProjectDeleted(activeProject.id);
    };
    
    return (
        <Menubar className="rounded-none border-x-0 border-t-0 px-2 lg:px-4">
            <MenubarMenu>
                <MenubarTrigger>Fichier</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => {}}>
                        Nouveau Projet <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => setActiveView('files')}>
                        Gérer les fichiers <MenubarShortcut>⌘O</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem disabled>
                        Sauvegarder <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Projet</MenubarTrigger>
                 <MenubarContent>
                    <MenubarItem disabled={!activeProject}>
                        Renommer le projet...
                    </MenubarItem>
                    <MenubarItem disabled={!activeProject} onClick={handleDeleteProject} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                        Supprimer le projet
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Affichage</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={toggleSidebar}>
                        Basculer le panneau latéral
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        Changer le thème
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}

// Main Component
export default function MessengerClient() {
    const { toast } = useToast();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<ProjectDoc[]>([]);
    
    const [searchResults, setSearchResults] = useState<ChatPartner[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    const [activeChat, setActiveChat] = useState<{ id: string, partner: ChatPartner } | null>(null);
    const [isStartingChat, setIsStartingChat] = useState(false);
    const [activeView, setActiveView] = useState('chat');
    const [activeProject, setActiveProject] = useState<ProjectDoc | null>(null);
    const [activeMainView, setActiveMainView] = useState('project');
    const [showSidebar, setShowSidebar] = useState(true);
    
    const oriaPartner: ChatPartner = {
        uid: 'oria-chat-bot',
        displayName: 'Oria (Assistante Projet)',
        photoURL: null,
    };

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        // Placeholder for fetching projects
        setTimeout(() => {
             setProjects([
                { id: 'proj1', name: 'maestro-proj1', title: 'Lancement Marque de Vêtements', creativeBrief: 'Une marque de vêtement futuriste...', tasks: [ { category: 'Branding', title: 'Définir identité', description: '...', checklist: [{text: 'Logo', completed: true}, {text: 'Slogan', completed: false}] } ] },
                { id: 'proj2', name: 'maestro-proj2', title: 'Jeu Vidéo Rétro', creativeBrief: 'Un platformer 2D...', tasks: [ { category: 'Design', title: 'Créer les assets', description: '...', checklist: [{text: 'Personnage principal', completed: true}, {text: 'Niveau 1', completed: true}] } ] },
             ]);
            setLoading(false);
        }, 1000);
    }, []);
    
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        const handleSearch = async () => {
            if (searchQuery.length < 3) {
                setSearchResults([]);
                return;
            }
            setIsSearching(true);
            // Placeholder for search
             setTimeout(() => {
                setSearchResults([ { uid: 'user2', displayName: 'Jane Doe', photoURL: null } ]);
                setIsSearching(false);
            }, 500);
        };

        const debounce = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchQuery, toast]);

    const handleSelectUser = async (partner: ChatPartner) => {
        setActiveView('chat');
        if (partner.uid === 'oria-chat-bot') {
            setActiveChat({ id: 'oria-chat-bot', partner });
            return;
        }
        
        setIsStartingChat(true);
        // Placeholder for starting chat
        setTimeout(() => {
            setActiveChat({ id: 'chat123', partner });
            setSearchQuery('');
            setSearchResults([]);
            setIsStartingChat(false);
        }, 500);
    };
    
    const clearActiveChat = () => setActiveChat(null);

    const onProjectDeleted = (deletedId: string) => {
        if (activeProject && activeProject.id === deletedId) {
            setActiveProject(null);
        }
        fetchProjects(); // Refetch projects after deletion
    };
    
    const updateActiveProject = (updatedProject: ProjectDoc) => {
        setActiveProject(updatedProject);
        setProjects(prevProjects => prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p));
    }


    if (loading) {
        return <Skeleton className="h-[85vh] w-full max-w-7xl mx-auto rounded-3xl" />;
    }
    
    const MainContent = () => {
        if (activeChat) {
            if (activeChat.id === 'oria-chat-bot') {
                return <OriaChatWindow partner={oriaPartner} onBack={clearActiveChat} activeProject={activeProject} />;
            }
            return <ChatWindow partner={activeChat.partner} currentUser={mockUser} chatId={activeChat.id} onBack={clearActiveChat} />;
        }
        
        if (activeProject) {
            return (
                <Tabs defaultValue="project" className="h-full flex flex-col">
                    <TabsList className="m-2 mx-auto">
                        <TabsTrigger value="project">
                            <BrainCircuit className="h-4 w-4 mr-2"/>
                            Plan du Projet
                        </TabsTrigger>
                        <TabsTrigger value="chat" onClick={() => setActiveChat({ id: 'oria-chat-bot', partner: oriaPartner })}>
                            <Sparkles className="h-4 w-4 mr-2"/>
                            Discuter avec Oria
                        </TabsTrigger>
                        <TabsTrigger value="files">
                            <FolderOpen className="h-4 w-4 mr-2"/>
                            Fichiers du projet
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="project" className="flex-1 min-h-0 -mt-2">
                        <ProjectPlanView project={activeProject} setProject={updateActiveProject} />
                    </TabsContent>
                    <TabsContent value="files" className="flex-1 min-h-0 -mt-2">
                        <Explorer />
                    </TabsContent>
                </Tabs>
            );
        }

        return (
             <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                <MessageSquare className="mx-auto h-20 w-20 text-muted-foreground/30" />
                <p className="mt-6 text-xl font-semibold text-foreground">Bienvenue sur PulseStudio</p>
                <p className="mt-2">Sélectionnez un projet pour commencer à le gérer, ou une conversation pour discuter.</p>
            </div>
        )
    };

    return (
        <div className="flex h-full w-full gap-6">
            <NavMenu activeView={activeView} setActiveView={setActiveView} />

            <div className="flex-1 flex flex-col glass-card p-0">
                <TopMenuBar 
                    activeProject={activeProject} 
                    setActiveView={setActiveView} 
                    onProjectDeleted={onProjectDeleted} 
                    toggleSidebar={() => setShowSidebar(!showSidebar)}
                />
                <div className="flex-1 flex min-h-0">
                    <div className={cn(
                        "w-full md:w-1/3 lg:w-1/4 flex-shrink-0 flex flex-col transition-all duration-300 border-r border-white/10",
                        !showSidebar ? 'hidden' : 'flex'
                    )}>
                        <div className="p-4 border-b border-white/10">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Chercher un utilisateur..." 
                                    className="bg-background/50 rounded-full pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="p-2">
                                <button
                                    onClick={() => handleSelectUser(oriaPartner)}
                                    className={cn(
                                        "w-full text-left p-3 rounded-xl transition-colors flex items-center gap-3",
                                        activeChat?.id === 'oria-chat-bot' ? "bg-primary/10" : "hover:bg-muted/50"
                                    )}
                                >
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center shrink-0">
                                        <Sparkles className="text-white h-5 w-5" />
                                    </div>
                                    <div className="overflow-hidden flex-1">
                                        <p className="font-semibold truncate">{oriaPartner.displayName}</p>
                                        <p className="text-sm text-muted-foreground truncate">Votre assistante IA</p>
                                    </div>
                                </button>
                            </div>

                            {searchQuery ? (
                                isSearching ? <SearchResultsSkeleton /> : (
                                    <div className="p-2">
                                        <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground mb-1">Résultats</h3>
                                        {searchResults.length > 0 ? (
                                            searchResults.map(p => (
                                                <button key={p.uid} onClick={() => handleSelectUser(p)} className="w-full text-left p-3 rounded-xl hover:bg-muted/50 flex items-center gap-3">
                                                    <Avatar className="h-10 w-10"><AvatarImage src={p.photoURL || undefined} /><AvatarFallback>{p.displayName?.[0].toUpperCase()}</AvatarFallback></Avatar>
                                                    <p className="font-semibold truncate">{p.displayName}</p>
                                                    {isStartingChat && <Loader className="h-4 w-4 animate-spin ml-auto" />}
                                                </button>
                                            ))
                                        ) : (<p className="text-center text-sm text-muted-foreground py-4">Aucun utilisateur trouvé.</p>)}
                                    </div>
                                )
                            ) : null}
                            <div className="w-full h-px bg-white/10 my-2"></div>
                            <ProjectTracker activeProject={activeProject} setActiveProject={setActiveProject} onProjectDeleted={onProjectDeleted} projects={projects} loading={loading} />
                        </ScrollArea>
                    </div>

                    <div className="flex-1 min-w-0">
                       <MainContent />
                    </div>
                </div>
            </div>
        </div>
    );
}
