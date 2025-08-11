
'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Send, ArrowLeft, MessageSquare, BrainCircuit, Trash2, Edit, PanelLeftOpen, FolderOpen, PanelRightClose, PanelLeftClose, Sparkles, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OriaHistoryMessage, ProjectPlan, OriaChatOutput, Doc } from '@/ai/types';
import { AnimatePresence, motion } from 'framer-motion';
import { oriaChatAction, deleteDocumentAction, listDocumentsAction } from '@/app/actions';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import DocManager from '@/components/doc-manager';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar';
import { useTheme } from 'next-themes';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/components/auth-component';
import { useToast } from '@/hooks/use-toast';


// Types
type ChatPartner = {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
};

// Sub-components
function ProjectTracker({ activeProject, setActiveProject, onProjectDeleted, projects, loading }: { activeProject: ProjectPlan | null, setActiveProject: (project: ProjectPlan | null) => void, onProjectDeleted: (deletedId: string) => void, projects: ProjectPlan[], loading: boolean }) {
    const [projectToDelete, setProjectToDelete] = useState<ProjectPlan | null>(null);
    const { toast } = useToast();

    const calculateProgress = useCallback((tasks: ProjectPlan['tasks']) => {
        if (!tasks || tasks.length === 0) return 0;
        const allChecklistItems = tasks.flatMap(task => task.checklist);
        if (allChecklistItems.length === 0) return 0;
        const completedItems = allChecklistItems.filter(item => item.completed).length;
        return (completedItems / allChecklistItems.length) * 100;
    }, []);

    const handleDeleteProject = async () => {
        if (!projectToDelete || !projectToDelete.id) return;
        
        try {
            // This is a mock action. In a real app, this would delete from a database.
            // await deleteDocumentAction({ docId: projectToDelete.id });
             toast({ title: "Projet supprimé", description: `"${projectToDelete.title}" a été supprimé. (Simulation)` });
            const deletedId = projectToDelete.id;
            setProjectToDelete(null);
            onProjectDeleted(deletedId);
        } catch (error) {
            toast({ variant: 'destructive', title: "Erreur", description: "La suppression du projet a échoué."})
        }
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
                <p className="text-center text-xs text-muted-foreground p-4">Aucun projet Maestro trouvé.</p>
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

function OriaChatWindow({ partner, onBack, activeProject }: { partner: ChatPartner, onBack: () => void, activeProject: ProjectPlan | null }) {
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
            setMessages(prev => [...prev, { role: 'model', content: { type: 'response', response: result.error || "Désolée, une erreur est survenue." } }]);
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
    
    const getProjectContext = () => {
        if (!activeProject) return 'aucun';
        return `L'utilisateur travaille sur le projet "${activeProject.title}". Le brief créatif est : "${activeProject.creativeBrief}"`;
    }

    return (
        <div className="glass-card h-full flex flex-col">
            <header className="p-4 border-b border-white/10 flex items-center gap-4 flex-shrink-0">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center">
                    <Sparkles className="text-white h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold">{partner.displayName}</h3>
                    {activeProject && <p className="text-xs text-muted-foreground truncate max-w-xs">Contexte : {activeProject.title}</p>}
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
                    <input type="hidden" name="context" value={getProjectContext()} />
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

function ProjectPlanView({ project, setProject }: { project: ProjectPlan, setProject: (p: ProjectPlan) => void }) {
    const categories = [...new Set(project.tasks.map(task => task.category))];

    const handleChecklistChange = (taskIndex: number, itemIndex: number, checked: boolean) => {
        const updatedProject = JSON.parse(JSON.stringify(project));
        updatedProject.tasks[taskIndex].checklist[itemIndex].completed = checked;
        setProject(updatedProject);
    };

    return (
        <ScrollArea className="h-full">
            <div className="p-4 md:p-6 space-y-8">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <blockquote className="border-l-4 border-primary pl-4 text-muted-foreground italic">
                    {project.creativeBrief}
                </blockquote>
                <div className="space-y-8">
                    {categories.map(category => (
                        <div key={category}>
                            <h3 className="text-xl font-semibold mb-4">{category}</h3>
                            <div className="space-y-4">
                                {project.tasks.filter(t => t.category === category).map((task, taskIndex) => (
                                    <div key={taskIndex} className="p-4 rounded-lg bg-background/50 border border-white/10">
                                        <h4 className="font-semibold">{task.title}</h4>
                                        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                                        <div className="space-y-2">
                                            {task.checklist.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center gap-3">
                                                    <Checkbox
                                                        id={`task-${taskIndex}-item-${itemIndex}`}
                                                        checked={item.completed}
                                                        onCheckedChange={(checked) => handleChecklistChange(project.tasks.findIndex(t => t.title === task.title), itemIndex, !!checked)}
                                                    />
                                                    <label htmlFor={`task-${taskIndex}-item-${itemIndex}`} className="text-sm text-foreground/90 has-[:checked]:line-through has-[:checked]:text-muted-foreground cursor-pointer">
                                                        {item.text}
                                                    </label>
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

function TopMenuBar({ activeProject, onProjectDeleted, toggleSidebar, isSidebarVisible }: { activeProject: ProjectPlan | null, onProjectDeleted: (id: string) => void, toggleSidebar: () => void, isSidebarVisible: boolean }) {
    const { theme, setTheme } = useTheme();

    const handleDeleteProject = async () => {
        if (!activeProject || !activeProject.id) return;
        onProjectDeleted(activeProject.id);
    };
    
    return (
        <Menubar className="rounded-none border-x-0 border-t-0 px-2 lg:px-4 bg-muted/30 backdrop-blur-md">
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 mr-1">
                        {isSidebarVisible ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
                    </Button>
                </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Fichier</MenubarTrigger>
                <MenubarContent className="glass-card">
                    <MenubarItem>Nouveau Projet <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                    <MenubarItem>Nouvelle Fenêtre</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem disabled>Sauvegarder <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
                    <MenubarItem disabled>Fermer l'onglet <MenubarShortcut>⌘W</MenubarShortcut></MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Projet</MenubarTrigger>
                 <MenubarContent className="glass-card">
                    <MenubarItem disabled={!activeProject}>Renommer le projet...</MenubarItem>
                    <MenubarItem disabled={!activeProject} onClick={handleDeleteProject} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                        Supprimer le projet
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Affichage</MenubarTrigger>
                <MenubarContent className="glass-card">
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
    const { user } = useAuth();
    
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<ProjectPlan[]>([]);
        
    const [activeProject, setActiveProject] = useState<ProjectPlan | null>(null);
    const [showSidebar, setShowSidebar] = useState(true);
    
    const oriaPartner: ChatPartner = {
        uid: 'oria-chat-bot',
        displayName: 'Oria (Assistante Projet)',
        photoURL: null,
    };

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const result: Doc[] = await listDocumentsAction();
            const maestroProjects = result
                .filter(doc => doc.name.startsWith('maestro-'))
                .map(doc => {
                    // This is a simplified mock. In a real app, you'd fetch and parse file content.
                    return {
                        id: doc.id,
                        title: doc.name.replace('maestro-', '').replace('.json', '').replace(/_/g, ' '),
                        creativeBrief: 'Un brief créatif inspirant pour ce projet génial.',
                        tasks: [
                            { title: 'Définir la vision', description: 'Clarifier les objectifs', category: 'Stratégie', duration: '1 jour', checklist: [{text: 'Faire un brainstorming', completed: true}, {text: 'Valider le concept', completed: false}]},
                            { title: 'Créer le contenu', description: 'Produire les livrables', category: 'Production', duration: '5 jours', checklist: [{text: 'Rédiger les textes', completed: false}, {text: 'Créer les visuels', completed: false}]}
                        ],
                        events: [],
                        imagePrompts: []
                    } as ProjectPlan;
                });
            setProjects(maestroProjects);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de charger les projets.'});
        } finally {
            setLoading(false);
        }
    }, [toast]);
    
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);
    
    const onProjectDeleted = (deletedId: string) => {
        if (activeProject && activeProject.id === deletedId) {
            setActiveProject(null);
        }
        setProjects(prev => prev.filter(p => p.id !== deletedId));
    };
    
    const updateActiveProject = (updatedProject: ProjectPlan) => {
        setActiveProject(updatedProject);
        setProjects(prevProjects => prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p));
    }

    const MainContent = () => {
        if (!activeProject) {
            return (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                    <MessageSquare className="mx-auto h-20 w-20 text-muted-foreground/30" />
                    <p className="mt-6 text-xl font-semibold text-foreground">Bienvenue sur (X)cloud</p>
                    <p className="mt-2">Sélectionnez un projet pour commencer à le gérer.</p>
                </div>
            );
        }

        return (
            <Tabs defaultValue="project" className="h-full flex flex-col">
                <div className="p-2 border-b border-border">
                    <TabsList className="mx-auto">
                        <TabsTrigger value="project">
                            <BrainCircuit className="h-4 w-4 mr-2"/>
                            Plan du Projet
                        </TabsTrigger>
                        <TabsTrigger value="chat">
                            <Sparkles className="h-4 w-4 mr-2"/>
                            Discuter avec Oria
                        </TabsTrigger>
                        <TabsTrigger value="files">
                            <FolderOpen className="h-4 w-4 mr-2"/>
                            Fichiers du projet
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="project" className="flex-1 min-h-0 -mt-2">
                    <ProjectPlanView project={activeProject} setProject={updateActiveProject} />
                </TabsContent>
                <TabsContent value="files" className="flex-1 min-h-0 -mt-2 p-1">
                    <DocManager onDataChange={fetchProjects} />
                </TabsContent>
                <TabsContent value="chat" className="flex-1 min-h-0 -mt-2">
                    <OriaChatWindow partner={oriaPartner} onBack={() => setActiveProject(null)} activeProject={activeProject} />
                </TabsContent>
            </Tabs>
        );
    };

    return (
        <div className="flex h-full w-full">
            <div className="flex-1 flex flex-col glass-card p-0">
                <TopMenuBar 
                    activeProject={activeProject} 
                    onProjectDeleted={onProjectDeleted} 
                    toggleSidebar={() => setShowSidebar(!showSidebar)}
                    isSidebarVisible={showSidebar}
                />
                <div className="flex-1 flex min-h-0">
                    <AnimatePresence>
                        {showSidebar && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 'clamp(250px, 30%, 320px)', opacity: 1 }}
                                exit={{ width: 0, opacity: 0, padding: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="flex-shrink-0 flex flex-col border-r border-white/10 overflow-hidden"
                            >
                                <ScrollArea className="flex-1">
                                    <div className="p-4 flex items-center gap-3 border-b border-border">
                                        <Avatar>
                                            <AvatarFallback>{user?.displayName?.substring(0,2) || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold truncate text-sm">{user?.displayName || 'Utilisateur'}</p>
                                            <p className="text-xs text-muted-foreground">Espace de travail</p>
                                        </div>
                                    </div>
                                    <ProjectTracker activeProject={activeProject} setActiveProject={setActiveProject} onProjectDeleted={onProjectDeleted} projects={projects} loading={loading} />
                                </ScrollArea>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex-1 min-w-0">
                       <MainContent />
                    </div>
                </div>
            </div>
        </div>
    );
}

    