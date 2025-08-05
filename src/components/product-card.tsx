
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
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Card className="group/card flex h-full flex-col overflow-hidden transition-all duration-300 rounded-2xl bg-card/95 dark:bg-card/80 border border-border shadow-lg hover:shadow-2xl hover:shadow-primary/10">
            <div className="relative flex-1 p-0 flex flex-col">
                <div className="relative aspect-square">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                            data-ai-hint={product.hint}
                        />
                    </motion.div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-grow">{product.description}</p>
                </div>
            </div>
            <div className="mt-auto flex items-center justify-between p-6 pt-0">
                <p className="text-2xl font-semibold text-foreground">{product.price.toFixed(2)}€</p>
                <Button size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full aspect-square transition-transform group-hover/card:scale-110" onClick={handleAddToCart}>
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Ajouter au panier</span>
                </Button>
            </div>
            </Card>
        </motion.div>
      </Link>
    )
}
