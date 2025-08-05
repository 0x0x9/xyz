
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ShoppingCart, ArrowRight, ArrowLeft, Cpu, Sparkles } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { products, type Product } from '@/lib/products';
import { useCart } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';


function ProductCard({ product }: { product: Product }) {
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
        <Card className="group/card flex h-full flex-col overflow-hidden transition-all duration-300 rounded-2xl bg-card/95 hover:bg-card/25 dark:bg-card/80 dark:hover:bg-card/50 border border-border hover:border-primary/30 shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
          <div className="relative flex-1 p-0 flex flex-col">
            <div className="relative aspect-square">
                <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
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
      </Link>
    )
}

function FeaturedCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
    });
    const featuredProducts = products.filter(p => p.isFeatured);

    return (
        <div className="relative -mx-4">
             <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex" style={{ backfaceVisibility: 'hidden' }}>
                     {featuredProducts.map((product) => (
                      <div className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-4" key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                </div>
            </div>
             <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-10 pointer-events-none">
                <Button onClick={() => emblaApi?.scrollPrev()} size="icon" variant="glass" className="rounded-full pointer-events-auto">
                    <ArrowLeft />
                </Button>
                 <Button onClick={() => emblaApi?.scrollNext()} size="icon" variant="glass" className="rounded-full pointer-events-auto">
                    <ArrowRight />
                </Button>
            </div>
        </div>
    );
}


const StorePageClient = () => {
    const categories = [...new Set(products.map(p => p.category))];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : products;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36 text-center">
            <div className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                La Boutique des Créatifs
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Le meilleur matériel et les logiciels les plus innovants, sélectionnés pour les créateurs exigeants qui repoussent les limites de l'imagination.
                </p>
            </div>
        </section>

        <section className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold">Au-delà des produits, un écosystème.</h2>
                 <p className="max-w-3xl mx-auto text-md text-muted-foreground mt-2">
                     Nos produits sont les briques d'un univers créatif unifié, conçu pour fonctionner en parfaite harmonie.
                 </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Link href="/welcome">
                        <Card className="glass-card h-full p-8 flex flex-col justify-between text-center relative overflow-hidden group">
                            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/30 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" />
                            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-3xl font-bold">L'Écosystème Créatif</CardTitle>
                            <CardContent className="p-0 mt-4">
                                <p className="text-muted-foreground text-lg">Découvrez (X)OS, l'environnement qui connecte tous vos outils et idées.</p>
                            </CardContent>
                             <Button variant="outline" className="mt-6 mx-auto rounded-full">
                                Découvrir (X)OS <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Card>
                    </Link>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                     <Link href="/hardware">
                        <Card className="glass-card h-full p-8 flex flex-col justify-between text-center relative overflow-hidden group">
                            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/30 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" />
                            <Cpu className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                            <CardTitle className="text-3xl font-bold">La Puissance Réinventée</CardTitle>
                            <CardContent className="p-0 mt-4">
                                <p className="text-muted-foreground text-lg">Explorez la Station X-1, le matériel conçu pour exceller avec (X)OS.</p>
                            </CardContent>
                             <Button variant="outline" className="mt-6 mx-auto rounded-full">
                                Explorer le matériel <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Card>
                    </Link>
                </motion.div>
            </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 space-y-20 pb-20">
            <div>
                <h2 className="text-3xl font-bold mb-8 text-center">Produits Phares</h2>
                <FeaturedCarousel />
            </div>

             <div>
                <h2 className="text-3xl font-bold mb-8 text-center">Tous nos produits</h2>
                 <div className="flex flex-wrap justify-center gap-2 mb-12">
                     <Button variant={!selectedCategory ? 'secondary' : 'glass'} onClick={() => setSelectedCategory(null)} className="rounded-full">Tous</Button>
                    {categories.map(category => (
                        <Button key={category} variant={selectedCategory === category ? 'secondary' : 'glass'} onClick={() => setSelectedCategory(category)} className="rounded-full">
                            {category}
                        </Button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default StorePageClient;
