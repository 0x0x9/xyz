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

    return null;
}
