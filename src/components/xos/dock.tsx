
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WindowInstance } from '@/components/xos/client';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import DockAnimation from '@/components/ui/dock-animation';
import HeaderLogo from '@/components/layout/header-logo';
import { Progress } from '../ui/progress';

interface XosDockProps {
    windows: WindowInstance[];
    onDockItemClick: (id: number) => void;
    openApp: (appId: string) => void;
}

export default function XosDock({ windows, onDockItemClick, openApp }: XosDockProps) {
    
    return (
        <TooltipProvider>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                className="xos-dock"
            >
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/" className="relative" aria-label="Retour à l'accueil">
                            <motion.div
                                whileHover={{ y: -16, scale: 1.2 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                className="glass-orb-button"
                            >
                                <HeaderLogo className="w-10 h-10 p-1"/>
                            </motion.div>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className="glass-card mb-2">
                        <p>Accueil</p>
                    </TooltipContent>
                </Tooltip>

                {windows.length > 0 && (
                    <div className="h-12 self-center w-px bg-white/20 mx-1"></div>
                )}
                
                {windows.map(win => (
                    <Tooltip key={win.id}>
                        <TooltipTrigger asChild>
                            <motion.button
                                onClick={() => onDockItemClick(win.id)}
                                className="glass-orb-button relative"
                                whileHover={{ y: -16, scale: 1.2 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                                <DockAnimation variant={win.appId} className="w-full h-full" />
                                {win.appId !== 'oria' && <win.icon className="w-8 h-8 text-foreground drop-shadow-lg absolute z-10" />}

                                {win.isLoading && (
                                     <div className="absolute bottom-[-8px] left-0 right-0 px-1">
                                         <Progress value={win.loadingProgress} className="h-1 bg-white/20" />
                                     </div>
                                )}
                                {!win.isMinimized && !win.isLoading && (
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-foreground/80 rounded-full" />
                                )}
                            </motion.button>
                        </TooltipTrigger>
                        <TooltipContent className="glass-card mb-2">
                            <p>{win.title}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </motion.div>
        </TooltipProvider>
    );
}
