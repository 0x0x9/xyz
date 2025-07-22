
'use client';

import { Layers, BrainCircuit, Lightbulb, Users, Mic, Film, AudioLines, Palette, CodeXml, SquareTerminal, Zap, FileText, Image as ImageIconLucide, Sparkles, FilePenLine, Folder, Presentation, LayoutTemplate, Music, Terminal, Calendar, Network, Wand2, Cloud, Guitar, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import OriaAnimation from '../ui/oria-animation';

const OriaIconAnimation = ({ className }: { className?: string }) => (
    <div className={cn("relative rounded-full overflow-hidden", className)}>
        <OriaAnimation />
    </div>
);

const ALL_APPS_CONFIG = [
    { id: 'oria', name: 'Oria', icon: OriaIconAnimation },
    { id: 'cloud', name: '(X)cloud', icon: Cloud },
    { id: 'explorer', name: '(X)plorer', icon: Folder },
    { id: 'fusion', name: '(X)fusion', icon: Zap },
    { id: 'flux', name: '(X)flux', icon: Wand2 },
    { id: 'maestro', name: 'Maestro', icon: BrainCircuit },
    { id: 'image', name: 'Image', icon: ImageIconLucide },
    { id: 'brand-identity', name: '(X)brand', icon: Layers },
    { id: 'promptor', name: '(X)promptor', icon: Lightbulb },
    { id: 'motion', name: '(X)motion', icon: Film },
    { id: 'voice', name: '(X)voice', icon: AudioLines },
    { id: 'text', name: 'Texte', icon: FileText },
    { id: 'editor', name: '(X).alpha', icon: SquareTerminal },
    { id: 'frame', name: '(X)frame', icon: LayoutTemplate },
    { id: 'terminal', name: '(X)term', icon: Terminal },
    { id: 'agenda', name: '(X)agenda', icon: Calendar },
    { id: 'nexus', name: '(X)nexus', icon: Network },
    { id: 'muse', name: '(X)muse', icon: Guitar },
    { id: 'sound', name: '(X)sound', icon: Music },
    { id: 'palette', name: '(X)palette', icon: Palette },
    { id: 'tone', name: '(X)tone', icon: Mic },
    { id: 'persona', name: '(X)persona', icon: Users },
    { id: 'deck', name: 'Présentation', icon: Presentation },
    { id: 'code', name: '(X)code', icon: CodeXml },
];

const DESKTOP_APP_IDS = [
    'oria', 'cloud', 'explorer', 'fusion', 
    'flux', 'maestro', 'promptor', 'brand-identity', 'agenda', 'nexus',
    'text', 'image', 'motion', 'voice',
    'muse', 'sound',
    'editor', 'frame', 'terminal'
];
const desktopApps = DESKTOP_APP_IDS.map(id => ALL_APPS_CONFIG.find(app => app.id === id)).filter(Boolean) as (typeof ALL_APPS_CONFIG[0])[];

interface DesktopIconsProps {
    isBooting: boolean;
    onOpenApp: (appId: string) => void;
}

export default function DesktopIcons({ isBooting, onOpenApp }: DesktopIconsProps) {
    return (
        <div className="p-8 z-1 relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                {desktopApps.map((app, index) => (
                    <button
                        key={app.id}
                        onDoubleClick={() => onOpenApp(app.id)}
                        className={cn(
                            "flex flex-col items-center gap-2 p-2 rounded-lg focus:outline-none focus:bg-foreground/5 transition-all duration-300",
                            isBooting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                        )}
                        style={{ transitionDelay: `${index * 50}ms`}}
                    >
                        <app.icon className="w-12 h-12 text-foreground drop-shadow-lg" />
                        <span className="text-foreground text-sm font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">{app.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
