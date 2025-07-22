
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Image as ImageIcon, FileText, Layers, Users, Film, AudioLines, TerminalSquare, X, Maximize, Minimize, Zap, LayoutTemplate, Music, Code2, Network, Calendar, Guitar, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

// Loading skeletons for each tool
const ToolSkeleton = () => <Card className="glass-card w-full h-full min-h-[400px]"><CardHeader><Skeleton className="h-7 w-48" /></CardHeader><CardContent><Skeleton className="h-full w-full" /></CardContent></Card>;

// Dynamic imports for each generator
const LazyMaestroGenerator = dynamic(() => import('@/components/maestro-generator'), { ssr: false, loading: ToolSkeleton });
const LazyPromptorGenerator = dynamic(() => import('@/components/promptor-generator'), { ssr: false, loading: ToolSkeleton });
const LazyMotionGenerator = dynamic(() => import('@/components/motion-generator'), { ssr: false, loading: ToolSkeleton });
const LazyVoiceGenerator = dynamic(() => import('@/components/voice-generator'), { ssr: false, loading: ToolSkeleton });
const LazyTextGenerator = dynamic(() => import('@/components/text-generator'), { ssr: false, loading: ToolSkeleton });
const LazyImageGenerator = dynamic(() => import('@/components/image-generator'), { ssr: false, loading: ToolSkeleton });
const LazyAlphaEditor = dynamic(() => import('@/components/code-editor'), { ssr: false, loading: ToolSkeleton });
const LazyBrandIdentity = dynamic(() => import('@/app/brand-identity/client'), { ssr: false, loading: ToolSkeleton });
const LazyFrameGenerator = dynamic(() => import('@/components/frame-generator'), { ssr: false, loading: ToolSkeleton });
const LazyPersonaGenerator = dynamic(() => import('@/components/persona-generator'), { ssr: false, loading: ToolSkeleton });
const LazyCodeGenerator = dynamic(() => import('@/components/code-generator'), { ssr: false, loading: ToolSkeleton });
const LazySoundGenerator = dynamic(() => import('@/components/sound-generator'), { ssr: false, loading: ToolSkeleton });
const LazyNexusGenerator = dynamic(() => import('@/components/nexus-generator'), { ssr: false, loading: ToolSkeleton });
const LazyAgendaClient = dynamic(() => import('@/app/agenda/client'), { ssr: false, loading: ToolSkeleton });
const LazyMuseGenerator = dynamic(() => import('@/components/muse-generator'), { ssr: false, loading: ToolSkeleton });


const availableTools = [
    { id: 'maestro', name: 'Maestro', icon: BrainCircuit, component: <LazyMaestroGenerator /> },
    { id: 'promptor', name: '(X)promptor', icon: Lightbulb, component: <LazyPromptorGenerator /> },
    { id: 'brand-identity', name: '(X)brand', icon: Layers, component: <LazyBrandIdentity /> },
    { id: 'motion', name: '(X)motion', icon: Film, component: <LazyMotionGenerator /> },
    { id: 'voice', name: '(X)voice', icon: AudioLines, component: <LazyVoiceGenerator /> },
    { id: 'text', name: 'Texte', icon: FileText, component: <LazyTextGenerator /> },
    { id: 'image', name: 'Image', icon: ImageIcon, component: <LazyImageGenerator /> },
    { id: 'editor', name: '(X).alpha', icon: TerminalSquare, component: <LazyAlphaEditor /> },
    { id: 'frame', name: '(X)frame', icon: LayoutTemplate, component: <LazyFrameGenerator /> },
    { id: 'persona', name: '(X)persona', icon: Users, component: <LazyPersonaGenerator /> },
    { id: 'code', name: '(X)code', icon: Code2, component: <LazyCodeGenerator /> },
    { id: 'sound', name: '(X)sound', icon: Music, component: <LazySoundGenerator /> },
    { id: 'nexus', name: '(X)nexus', icon: Network, component: <LazyNexusGenerator /> },
    { id: 'agenda', name: '(X)agenda', icon: Calendar, component: <LazyAgendaClient /> },
    { id: 'muse', name: '(X)muse', icon: Guitar, component: <LazyMuseGenerator /> },
];

interface ActiveTool {
    id: string;
    instanceId: number;
    name: string;
    icon: React.ElementType;
    component: React.ReactNode;
    size: 'standard' | 'full';
}

interface FusionClientProps {
    isPanel?: boolean;
    toolsToLoadFromDock?: string | null;
}

export default function FusionClient({ isPanel = false, toolsToLoadFromDock = null }: FusionClientProps) {
    const [activeTools, setActiveTools] = useState<ActiveTool[]>([]);
    const searchParams = useSearchParams();

    const addTool = useCallback((toolId: string) => {
        const toolToAdd = availableTools.find(t => t.id === toolId);
        if (toolToAdd) {
            const newTool: ActiveTool = { 
                ...toolToAdd, 
                instanceId: Math.random(), 
                size: (toolId === 'editor' || toolId === 'brand-identity' || toolId === 'muse') ? 'full' : 'standard' 
            };
            setActiveTools(prev => {
                if (prev.some(t => t.id === newTool.id)) {
                    return prev;
                }
                return [...prev, newTool];
            });
        }
    }, []);

    const removeTool = (instanceId: number) => {
        setActiveTools(prev => prev.filter(t => t.instanceId !== instanceId));
    };

    const toggleToolSize = (instanceId: number) => {
        setActiveTools(prev => prev.map(tool => 
            tool.instanceId === instanceId 
                ? { ...tool, size: tool.size === 'standard' ? 'full' : 'standard' }
                : tool
        ));
    };
    
    // Handles loading from URL for the main /fusion page
    useEffect(() => {
        const toolsToLoad = searchParams.get('tools');
        if (toolsToLoad) {
            const toolIds = [...new Set(toolsToLoad.split(','))];
            toolIds.forEach(id => addTool(id));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, addTool]);

    // Handles loading from Oria into the dock
    useEffect(() => {
        if (toolsToLoadFromDock) {
            const toolIds = [...new Set(toolsToLoadFromDock.split(','))];
            toolIds.forEach(id => addTool(id));
        }
    }, [toolsToLoadFromDock, addTool]);
    
    return (
        <div>
            <Card className="glass-card mb-8">
                <CardHeader>
                    <CardTitle className={cn("text-xl", isPanel && "text-lg")}>Ajouter un outil à votre espace</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {availableTools.map(tool => (
                        <Button
                            key={tool.id}
                            variant="outline"
                            onClick={() => addTool(tool.id)}
                            disabled={activeTools.some(t => t.id === tool.id)}
                            size={isPanel ? "sm" : "default"}
                        >
                            <tool.icon className="mr-2 h-4 w-4" />
                            {tool.name}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {activeTools.length > 0 ? (
                <div className={cn(
                        "grid grid-cols-1 gap-8 items-start",
                        !isPanel && "xl:grid-cols-2"
                    )}>
                    {activeTools.map((tool) => (
                        <div 
                            key={tool.instanceId} 
                            className={cn(
                                "relative group transition-all duration-300 ease-in-out",
                                tool.size === 'full' && !isPanel ? 'xl:col-span-2' : 'col-span-1'
                            )}
                        >
                            {tool.component}
                            <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                                    onClick={() => toggleToolSize(tool.instanceId)}
                                    aria-label={tool.size === 'standard' ? "Agrandir l'outil" : "Réduire l'outil"}
                                >
                                    {tool.size === 'standard' ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => removeTool(tool.instanceId)}
                                    aria-label="Fermer l'outil"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-muted-foreground/20 rounded-3xl">
                     <Zap className="mx-auto h-12 w-12 text-primary/50" />
                     <h2 className="text-2xl font-semibold text-muted-foreground mt-4">Votre toile (X)fusion est vide.</h2>
                     <p className="text-muted-foreground mt-2">Cliquez sur un outil ci-dessus pour commencer à créer.</p>
                </div>
            )}
        </div>
    );
}
