'use client';

import { Sparkles } from 'lucide-react';

export function LoadingState({ text = "L'IA travaille pour vous...", isCompact = false }: { text?: string, isCompact?: boolean }) {
    if (isCompact) {
        return (
            <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 animate-pulse text-primary" />
                <span>{text}</span>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col items-center justify-center gap-6 text-center p-8 h-full">
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                 <Sparkles className="h-12 w-12 animate-pulse text-primary" />
            </div>
            <p className="text-muted-foreground">{text}</p>
        </div>
    );
}
