
'use client';

import { motion } from 'framer-motion';
import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { X, Minus } from 'lucide-react';
import type { WindowInstance } from '@/components/xos/client';
import { cn } from '@/lib/utils';

interface XosWindowProps {
    instance: WindowInstance;
    children: React.ReactNode;
    onClose: () => void;
    onFocus: () => void;
    onMinimize: () => void;
    onDragStop: RndDragCallback;
    onResizeStop: RndResizeCallback;
}

export default function XosWindow({ instance, children, onClose, onFocus, onMinimize, onDragStop, onResizeStop }: XosWindowProps) {
    const { title, zIndex, isMinimized, x, y, width, height } = instance;

    const variants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
        minimized: { scale: 0, opacity: 0, y: 200 },
    };

    return (
        <Rnd
            size={{ width, height }}
            position={{ x, y }}
            minWidth={300}
            minHeight={200}
            bounds="parent"
            style={{ zIndex }}
            onDragStart={onFocus}
            onResizeStart={onFocus}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            dragHandleClassName="window-drag-handle"
            className={cn(
                "flex flex-col",
                isMinimized && "pointer-events-none"
            )}
        >
            <motion.div
                initial="hidden"
                animate={isMinimized ? "minimized" : "visible"}
                exit="hidden"
                variants={variants}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="w-full h-full bg-background/50 dark:bg-black/30 backdrop-blur-2xl border border-foreground/10 rounded-2xl shadow-2xl flex flex-col"
                onClick={onFocus}
            >
                {/* Window Header */}
                <header className="window-drag-handle flex items-center justify-between px-3 py-1.5 border-b border-foreground/10 flex-shrink-0 cursor-grab active:cursor-grabbing">
                    <div className="flex items-center gap-1.5">
                        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3.5 h-3.5 rounded-full bg-foreground/10 hover:bg-red-500 transition-colors"></button>
                        <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3.5 h-3.5 rounded-full bg-foreground/10 hover:bg-yellow-500 transition-colors"></button>
                        <button className="w-3.5 h-3.5 rounded-full bg-foreground/10 cursor-not-allowed opacity-50"></button>
                    </div>
                    <span className="text-sm font-medium text-foreground/80 select-none">{title}</span>
                    <div className="w-20"></div> {/* Spacer */}
                </header>
                
                {/* Window Content */}
                <div className="flex-1 overflow-y-auto bg-transparent no-scrollbar">
                     <div className="p-1 h-full">
                        {children}
                    </div>
                </div>
            </motion.div>
        </Rnd>
    );
}
