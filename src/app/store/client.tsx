
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cpu, Sparkles, ChevronRight } from "lucide-react";
import { products } from '@/lib/products';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product-card';

const StorePageClient = () => {
    const categories = ['Tout', ...new Set(products.map(p => p.category))];
    const [selectedCategory, setSelectedCategory] = useState<string>('Tout');
    const filteredProducts = selectedCategory === 'Tout' ? products : products.filter(p => p.category === selectedCategory);

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

        <section className="container mx-auto px-4 md:px-6 space-y-16 pb-20">
             <div>
                <div className="mb-12 space-y-8">
                     <div className="flex items-center text-sm text-muted-foreground">
                        <Link href="/store" className="hover:text-foreground">Boutique</Link>
                        {selectedCategory !== 'Tout' && (
                            <>
                                <ChevronRight className="h-4 w-4 mx-1" />
                                <span className="text-foreground">{selectedCategory}</span>
                            </>
                        )}
                    </div>
                    <h2 className="text-3xl font-bold text-center">Tous nos produits</h2>
                     <div className="flex flex-wrap justify-center gap-2">
                         {categories.map(category => (
                            <Button key={category} variant={selectedCategory === category ? 'secondary' : 'ghost'} onClick={() => setSelectedCategory(category)} className="rounded-full">
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
