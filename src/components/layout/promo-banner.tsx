'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIState } from '@/hooks/use-ui-state';

export default function PromoBanner() {
    const { isBannerVisible, setBannerVisible } = useUIState();

    if (!isBannerVisible) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center p-3 text-sm font-medium">
                        <div className="inline-flex items-center">
                            <Sparkles className="h-5 w-5 mr-3 animate-pulse" />
                            <span className="hidden md:inline">Découvrez (X)OS, notre nouveau système d'exploitation créatif !</span>
                            <span className="md:hidden">Découvrez (X)OS !</span>
                            <Button variant="link" asChild className="text-white hover:text-white/80 ml-2">
                               <Link href="/welcome">En savoir plus &rarr;</Link>
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setBannerVisible(false)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 text-white hover:bg-white/10"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
