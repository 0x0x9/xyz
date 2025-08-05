
'use client';

import { cn } from "@/lib/utils";
import { ALL_APPS_CONFIG } from "@/lib/apps-config.tsx";

const DESKTOP_APP_IDS = [
    'chat', 'cloud', 'explorer', 'fusion', 
    'flux', 'maestro', 'promptor', 'brand-identity', 'agenda', 'nexus',
    'text', 'image', 'motion', 'voice',
    'muse', 'sound',
    'editor', 'frame', 'terminal',
    'store', 'gallery', 'collaborations', 'careers', 'contact',
    'format', 'convert'
];

interface DesktopIconsProps {
    isBooting: boolean;
    onOpenApp: (appId: string) => void;
}

export default function DesktopIcons({ isBooting, onOpenApp }: DesktopIconsProps) {
    const desktopApps = DESKTOP_APP_IDS
        .map(id => ALL_APPS_CONFIG.find(app => app.id === id))
        .filter(Boolean) as (typeof ALL_APPS_CONFIG[0])[];

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
