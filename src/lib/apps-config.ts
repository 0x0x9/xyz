
'use client';

import dynamic from 'next/dynamic';
import { Layers, BrainCircuit, Lightbulb, Users, Mic, Film, AudioLines, Palette, CodeXml, SquareTerminal, Zap, FileText, Image as ImageIconLucide, Sparkles, FilePenLine, Folder, Presentation, LayoutTemplate, Music, Terminal, Calendar, Network, Wand2, Cloud, Guitar, Star } from "lucide-react";
import OriaAnimation from '@/components/ui/oria-animation';
import { cn } from '@/lib/utils';


const OriaIconAnimation = ({ className }: { className?: string }) => (
    <div className={cn("relative rounded-full overflow-hidden", className)}>
        <OriaAnimation />
    </div>
);


// App Components (Dynamically Imported)
const LazyWelcomeApp = dynamic(() => import('@/components/welcome-app'));
const LazyOria = dynamic(() => import('@/components/oria-xos'));
const LazyCloud = dynamic(() => import('@/components/cloud-app'));
const LazyExplorer = dynamic(() => import('@/components/explorer'));
const LazyFusion = dynamic(() => import('@/app/fusion/client'));
const LazyFlux = dynamic(() => import('@/components/flux-generator'));
const LazyMaestro = dynamic(() => import('@/components/maestro-generator'));
const LazyImage = dynamic(() => import('@/components/image-generator'));
const LazyBrandIdentity = dynamic(() => import('@/app/brand-identity/client'));
const LazyPromptor = dynamic(() => import('@/components/promptor-generator'));
const LazyMotion = dynamic(() => import('@/components/motion-generator'));
const LazyVoice = dynamic(() => import('@/components/voice-generator'));
const LazyText = dynamic(() => import('@/components/text-generator'));
const LazyEditor = dynamic(() => import('@/components/code-editor'));
const LazyFrame = dynamic(() => import('@/components/frame-generator'));
const LazyTerminal = dynamic(() => import('@/app/terminal/client'));
const LazyAgenda = dynamic(() => import('@/app/agenda/client'));
const LazyNexus = dynamic(() => import('@/components/nexus-generator'));
const LazyMuse = dynamic(() => import('@/components/muse-generator'));
const LazySound = dynamic(() => import('@/components/sound-generator'));
const LazyPalette = dynamic(() => import('@/components/palette-generator'));
const LazyTone = dynamic(() => import('@/components/tone-generator'));
const LazyPersona = dynamic(() => import('@/components/persona-generator'));
const LazyDeck = dynamic(() => import('@/components/deck-generator'));
const LazyCode = dynamic(() => import('@/components/code-generator'));


export const ALL_APPS_CONFIG = [
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
