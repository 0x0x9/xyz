
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { type Product } from '@/lib/products';
import { useCart } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart();
    const { toast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        addItem({ ...product, image: product.images[0] });
        toast({
            title: "Ajouté au panier",
            description: `"${product.name}" a été ajouté à votre panier.`,
        });
    };
  
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
                <div className="relative aspect-square w-full">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-8 transition-transform duration-500 group-hover/link:scale-105"
                        data-ai-hint={product.hint}
                    />
                </div>
                <div className="p-6 pt-0 flex flex-col flex-grow text-center">
                    <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                    <p className="mt-4 text-2xl font-semibold text-foreground">{product.price.toFixed(2)}€</p>
                </div>
            </Card>
        </motion.div>
      </Link>
    )
}
