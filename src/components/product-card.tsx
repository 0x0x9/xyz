
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from "next/image";
import { type Product } from '@/lib/products';
import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Check } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop event bubbling
    const productToAdd = { ...product, image: product.images[0] };
    addItem(productToAdd);
    toast({
      title: "Ajouté au panier !",
      description: `"${product.name}" est maintenant dans votre panier.`,
    });
  };

  if (product.category === 'Logiciel') {
    return (
      <Link href={`/store/${product.id}`} className="block h-full group/link">
         <motion.div
          className="h-full"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
           <Card className={cn(
            "group/card flex h-full flex-col overflow-hidden transition-all duration-300 p-6 text-left",
            "glass-card hover:bg-white/5 dark:hover:bg-black/10 hover:border-primary/30"
          )}>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
              <ul className="space-y-3 mt-6 text-sm">
                {(product.features ?? []).map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 text-center">
              <p className="text-2xl font-bold text-foreground mb-4">{product.price.toFixed(2)}€</p>
               <Button variant="secondary" className="w-full rounded-full" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Acheter
                </Button>
            </div>
           </Card>
        </motion.div>
      </Link>
    )
  }

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
              {product.configurable ? (
                <Button variant="secondary" className="rounded-full">
                  Configurer
                </Button>
              ) : (
                <Button variant="secondary" className="rounded-full" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Acheter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
