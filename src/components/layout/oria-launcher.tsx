'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import OriaAnimation from '../ui/oria-animation';

export default function OriaLauncher() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            <Button
                asChild
                className={cn(
                'absolute bottom-0 left-0 m-4 h-16 w-16 rounded-full',
                'bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-white',
                'shadow-2xl shadow-cyan-500/50',
                'transition-transform duration-300 group-hover:scale-110'
                )}
            >
                <Link href="/xos?open=oria">
                    <OriaAnimation className="w-8 h-8" />
                </Link>
            </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="glass-card mb-2">
            <p>Discuter avec Oria</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
