
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Layers, BrainCircuit, Lightbulb, Users, Mic, Film, AudioLines, Palette, CodeXml, SquareTerminal, Zap, FileText, Image as ImageIconLucide, Sparkles, FilePenLine, Folder, Presentation, LayoutTemplate, Music, Terminal, Calendar, Network, Wand2, Cloud, Guitar, Star } from "lucide-react";
import XosDock from '@/components/xos/dock';
import XosWindow from '@/components/xos/window';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { GenerateFluxOutput } from '@/ai/types';
import { useToast } from '@/hooks/use-toast';
import { getActionResult } from '@/app/actions';
import XosWallpaper from '../xos-wallpaper';
import OriaAnimation from '../ui/oria-animation';
import DesktopIcons from './desktop-icons';

// Dynamic imports for ALL possible windowed apps
const LazyFusion = dynamic(() => import('@/app/fusion/client'));
const LazyBrandIdentity = dynamic(() => import('@/app/brand-identity/client'));
const LazyMaestro = dynamic(() => import('@/components/maestro-generator'));
const LazyPromptor = dynamic(() => import('@/components/promptor-generator'));
const LazyPersona = dynamic(() => import('@/components/persona-generator'));
const LazyTone = dynamic(() => import('@/components/tone-generator'));
const LazyMotion = dynamic(() => import('@/components/motion-generator'));
const LazyVoice = dynamic(() => import('@/components/voice-generator'));
const LazyText = dynamic(() => import('@/components/text-generator'));
const LazyImage = dynamic(() => import('@/components/image-generator'));
const LazyPalette = dynamic(() => import('@/components/palette-generator'));
const LazyCode = dynamic(() => import('@/components/code-generator'));
const LazyEditor = dynamic(() => import('@/components/code-editor'));
const LazyOria = dynamic(() => import('@/components/oria-xos'));
const LazyCloud = dynamic(() => import('@/components/cloud-app'));
const LazyExplorer = dynamic(() => import('@/components/explorer'));
const LazyDeck = dynamic(() => import('@/components/deck-generator'));
const LazyFrame = dynamic(() => import('@/components/frame-generator'));
const LazySound = dynamic(() => import('@/components/sound-generator'));
const LazyTerminal = dynamic(() => import('@/app/terminal/client'));
const LazyAgenda = dynamic(() => import('@/app/agenda/client'));
const LazyNexus = dynamic(() => import('@/components/nexus-generator'));
const LazyFlux = dynamic(() => import('@/components/flux-generator'));
const LazyMuse = dynamic(() => import('@/components/muse-generator'));
const LazyWelcomeApp = dynamic(() => import('@/components/welcome-app'));


export type WindowInstance = {
    id: number;
    appId: string;
    title: string;
    icon: React.ElementType;
    component: React.ReactNode;
    zIndex: number;
    isMinimized: boolean;
    props?: Record<string, any>;
    x: number;
    y: number;
    width: number | string;
    height: number | string;
    isLoading?: boolean;
    loadingProgress?: number;
};

// A serializable version of the window state for localStorage
type SavedWindowInstance = Omit<WindowInstance, 'title' | 'icon' | 'component'>;


const OriaIconAnimation = ({ className }: { className?: string }) => (
    <div className={cn("relative rounded-full overflow-hidden", className)}>
        <OriaAnimation />
    </div>
);

// Define all apps that can be opened as a window
const ALL_APPS_CONFIG = [
    { id: 'welcome', name: 'Bienvenue', icon: Star, component: (props: any) => <LazyWelcomeApp {...props} />, defaultPos: { x: 80, y: 20 }, defaultSize: { width: 1000, height: 750 } },
    { id: 'oria', name: 'Oria', icon: OriaIconAnimation, component: (props: any) => <LazyOria {...props} />, defaultPos: { x: 50, y: 50}, defaultSize: { width: 450, height: 650 } },
    { id: 'cloud', name: '(X)cloud', icon: Cloud, component: (props: any) => <LazyCloud {...props} />, defaultPos: { x: 150, y: 50}, defaultSize: { width: 1200, height: 750 } },
    { id: 'explorer', name: '(X)plorer', icon: Folder, component: (props: any) => <LazyExplorer {...props} />, defaultPos: { x: 170, y: 50}, defaultSize: { width: 800, height: 550 } },
    { id: 'fusion', name: '(X)fusion', icon: Zap, component: (props: any) => <LazyFusion isPanel={true} {...props} />, defaultPos: { x: 290, y: 50}, defaultSize: { width: 1000, height: 750 } },
    { id: 'flux', name: '(X)flux', icon: Wand2, component: (props: any) => <LazyFlux {...props} />, defaultPos: { x: 530, y: 50 }, defaultSize: { width: 1000, height: 750 } },
    { id: 'maestro', name: 'Maestro', icon: BrainCircuit, component: (props: any) => <LazyMaestro {...props} />, defaultPos: { x: 650, y: 50 }, defaultSize: { width: 950, height: 700 } },
    { id: 'image', name: 'Image', icon: ImageIconLucide, component: (props: any) => <LazyImage {...props} />, defaultPos: { x: 770, y: 50 }, defaultSize: { width: 850, height: 650 } },
    { id: 'brand-identity', name: '(X)brand', icon: Layers, component: (props: any) => <LazyBrandIdentity {...props} />, defaultPos: { x: 890, y: 50 }, defaultSize: { width: 900, height: 600 } },
    { id: 'promptor', name: '(X)promptor', icon: Lightbulb, component: (props: any) => <LazyPromptor {...props} />, defaultPos: { x: 290, y: 170 }, defaultSize: { width: 900, height: 550 } },
    { id: 'motion', name: '(X)motion', icon: Film, component: (props: any) => <LazyMotion {...props} />, defaultPos: { x: 410, y: 170 }, defaultSize: { width: 850, height: 750 } },
    { id: 'voice', name: '(X)voice', icon: AudioLines, component: (props: any) => <LazyVoice {...props} />, defaultPos: { x: 530, y: 170 }, defaultSize: { width: 700, height: 500 } },
    { id: 'text', name: 'Texte', icon: FileText, component: (props: any) => <LazyText {...props} />, defaultPos: { x: 650, y: 170 }, defaultSize: { width: 700, height: 600 } },
    { id: 'editor', name: '(X).alpha', icon: SquareTerminal, component: (props: any) => <LazyEditor {...props} />, defaultPos: { x: 890, y: 170 }, defaultSize: { width: 1200, height: 800 } },
    { id: 'frame', name: '(X)frame', icon: LayoutTemplate, component: (props: any) => <LazyFrame {...props} />, defaultPos: { x: 170, y: 290 }, defaultSize: { width: 1100, height: 800 } },
    { id: 'terminal', name: '(X)term', icon: Terminal, component: (props: any) => <LazyTerminal {...props} />, defaultPos: { x: 410, y: 290 }, defaultSize: { width: 800, height: 500 } },
    { id: 'agenda', name: '(X)agenda', icon: Calendar, component: (props: any) => <LazyAgenda {...props} />, defaultPos: { x: 530, y: 290 }, defaultSize: { width: 950, height: 700 } },
    { id: 'nexus', name: '(X)nexus', icon: Network, component: (props: any) => <LazyNexus {...props} />, defaultPos: { x: 770, y: 290 }, defaultSize: { width: 700, height: 700 } },
    { id: 'muse', name: '(X)muse', icon: Guitar, component: (props: any) => <LazyMuse {...props} />, defaultPos: { x: 410, y: 50}, defaultSize: { width: 1200, height: 800 } },
    { id: 'sound', name: '(X)sound', icon: Music, component: (props: any) => <LazySound {...props} />, defaultPos: { x: 200, y: 200}, defaultSize: { width: 500, height: 400 } },
    { id: 'palette', name: '(X)palette', icon: Palette, component: (props: any) => <LazyPalette {...props} />, defaultPos: { x: 220, y: 220}, defaultSize: { width: 600, height: 500 } },
    { id: 'tone', name: '(X)tone', icon: Mic, component: (props: any) => <LazyTone {...props} />, defaultPos: { x: 240, y: 240}, defaultSize: { width: 600, height: 600 } },
    { id: 'persona', name: '(X)persona', icon: Users, component: (props: any) => <LazyPersona {...props} />, defaultPos: { x: 260, y: 260}, defaultSize: { width: 800, height: 700 } },
    { id: 'deck', name: 'Présentation', icon: Presentation, component: (props: any) => <LazyDeck {...props} />, defaultPos: { x: 280, y: 280}, defaultSize: { width: 900, height: 700 } },
    { id: 'code', name: '(X)code', icon: CodeXml, component: (props: any) => <LazyCode {...props} />, defaultPos: { x: 300, y: 300}, defaultSize: { width: 800, height: 700 } },
];

export default function XosClient() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [isBooting, setIsBooting] = useState(true);
    const hasBooted = useRef(false);
    const isInitialLoad = useRef(true);

    const closeWindow = useCallback((id: number) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    }, []);

    const openWindow = useCallback((appId: string, props: Record<string, any> = {}) => {
        const appConfig = ALL_APPS_CONFIG.find(app => app.id === appId);
        if (!appConfig) {
            console.error(`App with id "${appId}" not found.`);
            return;
        }
    
        setWindows(currentWindows => {
            const existingWindow = currentWindows.find(w => w.appId === appId && !w.props?.initialResult); // Don't reuse windows with specific results
            const maxZ = currentWindows.reduce((max, w) => Math.max(max, w.zIndex), 9);
            const newZ = maxZ + 1;
    
            if (existingWindow) {
                return currentWindows.map(w =>
                    w.id === existingWindow.id
                        ? { ...w, isMinimized: false, zIndex: newZ, props: { ...w.props, ...props} } // Merge props
                        : w
                );
            }
    
            const newWindowId = Date.now() + Math.random();
            const newWindow: WindowInstance = {
                id: newWindowId,
                appId: appConfig.id,
                title: appConfig.name,
                icon: appConfig.icon,
                zIndex: newZ,
                isMinimized: false,
                props,
                x: appConfig.defaultPos?.x ?? window.innerWidth / 2 - (Number(appConfig.defaultSize?.width ?? 700) / 2),
                y: appConfig.defaultPos?.y ?? window.innerHeight / 2 - (Number(appConfig.defaultSize?.height ?? 500) / 2),
                width: appConfig.defaultSize?.width ?? 700,
                height: appConfig.defaultSize?.height ?? 500,
                component: null, // Placeholder
            };

            newWindow.component = appConfig.component({ openApp: openWindow, onClose: () => closeWindow(newWindow.id), ...props });

            return [...currentWindows, newWindow];
        });
    }, [closeWindow]);

    const openFluxProject = useCallback(async (fluxResult: GenerateFluxOutput, prompt?: string) => {
        const fluxTaskId = Date.now();
        const fluxTask: WindowInstance = {
            id: fluxTaskId,
            appId: 'flux-loader',
            title: 'Chargement du projet...',
            icon: Wand2,
            zIndex: 1000,
            isMinimized: false,
            isLoading: true,
            loadingProgress: 0,
            component: null, x: 0, y: 0, width: 0, height: 0,
            props: {}
        };
        setWindows(prev => [...prev, fluxTask]);

        const appMapping: { [key in keyof GenerateFluxOutput]?: string } = {
            projectPlan: 'maestro', personas: 'persona', ideas: 'promptor', deck: 'deck',
            frame: 'editor', text: 'text', motion: 'motion', nexus: 'nexus',
            code: 'editor', agenda: 'agenda',
        };

        const appsToOpen: {appId: string, props: any}[] = [];

        if (fluxResult.palette || fluxResult.tone) {
            appsToOpen.push({ appId: 'brand-identity', props: { initialPalette: fluxResult.palette, initialTone: fluxResult.tone, prompt } });
        }
        
        for (const key in fluxResult) {
            const typedKey = key as keyof GenerateFluxOutput;
            if (typedKey !== 'palette' && typedKey !== 'tone' && fluxResult[typedKey] && appMapping[typedKey]) {
                const appId = appMapping[typedKey]!;
                let props: Record<string, any> = { prompt };

                if (typedKey === 'frame') props = { ...props, initialProjectCodes: { html: fluxResult.frame!.htmlCode, css: fluxResult.frame!.cssCode, js: fluxResult.frame!.jsCode }};
                else if (typedKey === 'text') props = { ...props, initialFile: { code: fluxResult.text!.text, language: 'markdown' } };
                else if (typedKey === 'code') props = { ...props, initialFile: { code: fluxResult.code!.code, language: 'typescript' } };
                else props = { ...props, initialResult: fluxResult[typedKey] };

                appsToOpen.push({ appId, props });
            }
        }
        
        for (let i = 0; i < appsToOpen.length; i++) {
            const { appId, props } = appsToOpen[i];
            await new Promise(resolve => setTimeout(resolve, 300));
            openWindow(appId, props);
            setWindows(prev => prev.map(w => w.id === fluxTaskId ? { ...w, loadingProgress: ((i + 1) / appsToOpen.length) * 100 } : w));
        }

        setTimeout(() => {
            setWindows(prev => prev.filter(w => w.id !== fluxTaskId));
        }, 500);

    }, [openWindow]);

    // Handle opening apps from URL
    const handleUrlLaunch = useCallback(async () => {
         if (isInitialLoad.current) {
            isInitialLoad.current = false;
            const appToOpen = searchParams.get('open');
            const resultId = searchParams.get('resultId');

            if (!appToOpen) {
                // No deep link, check for saved session
                 try {
                    const savedStateJSON = localStorage.getItem('xosSession');
                    if (savedStateJSON) {
                        const savedWindows = JSON.parse(savedStateJSON);
                         if (Array.isArray(savedWindows) && savedWindows.length > 0) {
                            const reconstructedWindows: WindowInstance[] = savedWindows.map((savedWin: SavedWindowInstance) => {
                                const appConfig = ALL_APPS_CONFIG.find(app => app.id === savedWin.appId);
                                if (!appConfig) return null;
                                
                                const newWindow: WindowInstance = {
                                    ...savedWin,
                                    title: appConfig.name,
                                    icon: appConfig.icon,
                                    component: null // placeholder
                                };
                                newWindow.component = appConfig.component({ openApp: openWindow, onClose: () => closeWindow(newWindow.id), ...savedWin.props });
                                return newWindow;

                            }).filter((w): w is WindowInstance => w !== null);

                            setWindows(reconstructedWindows);
                        }
                    } else {
                        // No saved session, open default apps
                         openWindow('welcome');
                         openWindow('oria');
                    }
                } catch (error) {
                    console.error("Failed to load XOS session:", error);
                    localStorage.removeItem('xosSession');
                }
                return;
            }

            // We have a deep link, fetch result and launch
            if (resultId) {
                const data = await getActionResult(resultId);

                if (!data) {
                    toast({ variant: "destructive", title: "Projet non trouvé", description: "Les données du projet n'ont pas été trouvées." });
                    openWindow(appToOpen);
                    return;
                }
    
                if (appToOpen === 'flux') {
                    const fluxResult = data.result as GenerateFluxOutput;
                    const prompt = data.prompt as string;
                    if (fluxResult) {
                        openFluxProject(fluxResult, prompt);
                    } else {
                        toast({ variant: "destructive", title: "Erreur de chargement", description: "Les données du projet (X)flux sont invalides." });
                    }
                } else {
                    const props: Record<string, any> = { initialResult: data.result };
                     if (data.prompt) props.prompt = data.prompt;
                    openWindow(appToOpen, props);
                }
            } else {
                openWindow(appToOpen);
            }
        }
    }, [searchParams, openWindow, closeWindow, openFluxProject, toast]);


    // Boot sequence
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBooting(false);
            if (!hasBooted.current) {
                hasBooted.current = true;
                handleUrlLaunch();
            }
        }, 100);
        
        return () => clearTimeout(timer);
    }, [handleUrlLaunch]);


    // Save state to localStorage whenever windows change
    useEffect(() => {
        if (hasBooted.current) {
             try {
                const windowsToSave: SavedWindowInstance[] = windows.map(win => ({
                    id: win.id,
                    appId: win.appId,
                    zIndex: win.zIndex,
                    isMinimized: win.isMinimized,
                    props: win.props,
                    x: win.x,
                    y: win.y,
                    width: win.width,
                    height: win.height,
                }));
                localStorage.setItem('xosSession', JSON.stringify(windowsToSave));
            } catch (error) {
                console.error("Failed to save XOS session:", error);
            }
        }
    }, [windows]);

    const handleWindowUpdate = (id: number, updates: Partial<WindowInstance>) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
    };

    const bringToFront = (id: number) => {
        setWindows(currentWindows => {
            const maxZ = currentWindows.reduce((max, w) => Math.max(max, w.zIndex), 9);
            const newZ = maxZ + 1;
            return currentWindows.map(w => w.id === id ? { ...w, zIndex: newZ } : w);
        });
    };

    const toggleMinimize = (id: number) => {
        setWindows(currentWindows => {
            const win = currentWindows.find(w => w.id === id);
            if (!win) return currentWindows;

            if (win.isMinimized) {
                 // UN-MINIMIZING: bring to front
                const maxZ = currentWindows.reduce((max, w) => w.isMinimized ? max : Math.max(max, w.zIndex), 0);
                const newZ = maxZ + 1;
                return currentWindows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w);
            } else {
                // MINIMIZING: just set the flag
                return currentWindows.map(w => w.id === id ? { ...w, isMinimized: true } : w);
            }
        });
    };
    
    return (
        <div className="absolute inset-0" >
            {/* Desktop Icons */}
            <DesktopIcons isBooting={isBooting} onOpenApp={openWindow} />

            {/* Windows */}
            <AnimatePresence>
                {windows.map(win => (
                    <XosWindow
                        key={win.id}
                        instance={win}
                        onClose={() => closeWindow(win.id)}
                        onFocus={() => bringToFront(win.id)}
                        onMinimize={() => toggleMinimize(win.id)}
                        onDragStop={(e, d) => handleWindowUpdate(win.id, { x: d.x, y: d.y })}
                        onResizeStop={(e, dir, ref, delta, pos) => handleWindowUpdate(win.id, {
                            width: ref.style.width,
                            height: ref.style.height,
                            x: pos.x,
                            y: pos.y,
                        })}
                    >
                        {win.component}
                    </XosWindow>
                ))}
            </AnimatePresence>
            
            {/* Dock */}
            <XosDock
                windows={windows}
                onDockItemClick={(id) => {
                    const win = windows.find(w => w.id === id);
                    if (!win) return;
                    
                    if (win.isMinimized) {
                        toggleMinimize(id);
                        return;
                    }
                    
                    const maxZ = windows.reduce((max, w) => w.isMinimized ? max : Math.max(max, w.zIndex), 0);
                    if (win.zIndex === maxZ) {
                        toggleMinimize(id);
                    } else {
                        bringToFront(id);
                    }
                }}
                openApp={openWindow}
            />
        </div>
    );
}
