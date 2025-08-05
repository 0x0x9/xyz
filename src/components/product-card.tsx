
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from "next/image";
import { type Product } from '@/lib/products';
import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  
    return (
      <Link href={`/store/${product.id}`} className="block h-full group/link">
        <motion.div
            className="h-full"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Card className={cn(
                "group/card flex h-full flex-col overflow-hidden transition-all duration-300", 
                "glass-card hover:bg-white/5 dark:hover:bg-black/10 hover:border-primary/30"
            )}>
                <div className="relative aspect-square w-full p-4">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover/link:scale-105"
                        data-ai-hint={product.hint}
                    />
                </div>
                <CardContent className="p-6 pt-2 flex flex-col flex-grow text-center">
                    <h3 className="text-lg font-semibold text-foreground flex-grow">{product.name}</h3>
                    <p className="mt-4 text-xl font-medium text-foreground">{product.price.toFixed(2)}€</p>
                    <div className="mt-4">
                        <Button variant="secondary" className="rounded-full">
                            Configurer
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
      </Link>
    )
}
