'use client';

import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import Link from 'next/link';

export default function FusionLauncher() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            className={cn(
              'absolute bottom-0 right-0 m-4 h-16 w-16 rounded-full',
              'bg-gradient-to-br from-orange-400 to-red-500 text-white',
              'shadow-2xl shadow-red-500/50',
              'transition-transform duration-300 group-hover:scale-110'
            )}
          >
            <Link href="/xos?open=fusion">
              <Zap className="h-8 w-8" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="glass-card mb-2">
          <p>Lancer (X)fusion</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
