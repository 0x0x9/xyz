
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Shield, Truck, ArrowLeft, Cpu, Zap, Layers, MemoryStick, CircuitBoard } from 'lucide-react';
import { useCart } from "@/hooks/use-cart-store";
import { useToast } from "@/hooks/use-toast";
import { type Product } from '@/lib/products';
import { PCConfigurator, type Configuration } from '@/components/ui/pc-configurator';
import { ProductCard } from '@/components/product-card';
import { cn } from '@/lib/utils';
import PerformanceChart from '@/components/ui/performance-chart';

const reassuranceItems = [
    { icon: Truck, text: "Livraison gratuite et rapide" },
    { icon: Shield, text: "Garantie constructeur 2 ans" },
    { icon: CheckCircle, text: "Retours faciles sous 30 jours" },
];

const performanceData = [
    { name: '(X)-φ (fi)', 'Rendu 3D': 95, 'Compilation de code': 98, 'Simulation IA': 92 },
    { name: 'Mac Pro (équivalent)', 'Rendu 3D': 75, 'Compilation de code': 80, 'Simulation IA': 70 },
    { name: 'PC Haut de Gamme', 'Rendu 3D': 85, 'Compilation de code': 88, 'Simulation IA': 78 },
];

const features = [
    { icon: Cpu, title: "Processeur Neural X-Core", description: "Une architecture révolutionnaire qui fusionne CPU, GPU et NPU pour une puissance de calcul inégalée, optimisée pour (X)OS." },
    { icon: Layers, title: "Alliance Multi-GPU", description: "Combinez la puissance brute des cartes graphiques NVIDIA et AMD. Accélérez vos rendus 3D et vos calculs IA." },
    { icon: MemoryStick, title: "Mémoire Unifiée Adaptative", description: "Jusqu'à 256 Go de RAM ultra-rapide, allouée dynamiquement là où vous en avez besoin." },
    { icon: CircuitBoard, title: "Connectivité Quantique (simulée)", description: "Ports Thunderbolt 5 et Wi-Fi 7 pour des transferts de données à la vitesse de la lumière." },
];

function AnimatedFeature({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
     const ref = useRef(null);
     const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.8", "start 0.5"]
    });

    return (
        <motion.div
            ref={ref}
            style={{ opacity: scrollYProgress, y: useTransform(scrollYProgress, [0, 1], [30, 0])}}
            className="flex items-start gap-4"
        >
             <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-muted-foreground mt-1">{description}</p>
            </div>
        </motion.div>
    );
}


export default function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [configuration, setConfiguration] = useState<Configuration | null>(null);
    const [totalPrice, setTotalPrice] = useState(product.price);

    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.8]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [1, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.7, 1], ['0%', '0%', '-100%']);


    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            price: totalPrice,
            name: configuration ? `${product.name} (Configuré)` : product.name,
            configuration: configuration ?? undefined,
            image: product.images[0],
        };
        addItem(productToAdd);
        toast({
            title: "Ajouté au panier !",
            description: `"${productToAdd.name}" est maintenant dans votre panier.`,
        });
    };
    
    const handleConfigChange = (newConfig: Configuration, newPrice: number) => {
        setConfiguration(newConfig);
        setTotalPrice(newPrice);
    }

    return (
        <div className="pt-16">
            <div ref={targetRef} className="h-[200vh]">
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center overflow-hidden">
                    <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-contain" data-ai-hint={product.hint} priority />
                        <div className="absolute inset-0 bg-background/30"></div>
                    </motion.div>
                    <motion.div 
                         style={{ opacity: contentOpacity, y: contentY }}
                         className="relative z-10 px-4 space-y-6 container mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight [text-shadow:0_4px_20px_rgba(0,0,0,0.3)]">
                            {product.name}
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                           {product.description}
                        </p>
                    </motion.div>
                </div>
            </div>
            
            <div className="bg-background relative z-10 pt-24 md:pt-36 space-y-24 md:space-y-36">
                 <section className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Puissance et Élégance. Redéfinies.</h2>
                            <p className="text-lg text-muted-foreground">Chaque composant a été sélectionné pour sa performance brute et sa parfaite intégration avec (X)OS, créant une synergie qui décuple votre potentiel créatif.</p>
                            <div className="space-y-6 pt-4">
                                {features.map((feature, i) => <AnimatedFeature key={i} {...feature} />)}
                            </div>
                        </div>
                        <div className="relative aspect-square">
                            <Image src={product.images[1]} alt="Vue intérieure du produit" fill className="object-contain" data-ai-hint="computer internals components" />
                        </div>
                    </div>
                </section>
                
                {product.configurable && (
                    <section id="configurator" className="container mx-auto px-4 md:px-6">
                        <PCConfigurator 
                            product={product}
                            basePrice={product.price} 
                            onConfigChange={handleConfigChange} 
                        />
                    </section>
                )}

                 <section className="container mx-auto px-4 md:px-6">
                     <div className="glass-card p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <p className="text-muted-foreground">Total pour votre configuration</p>
                            <p className="text-4xl md:text-5xl font-bold">{totalPrice.toFixed(2)}€</p>
                        </div>
                         <Button size="lg" className="rounded-full text-lg w-full md:w-auto h-16 px-10" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-3 h-6 w-6" />
                            Ajouter au panier
                        </Button>
                    </div>
                </section>

                 <section className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Des performances qui parlent d'elles-mêmes.</h2>
                     <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                       La (X)-φ (fi) surpasse les configurations les plus puissantes du marché sur les tâches créatives les plus exigeantes.
                    </p>
                    <div className="mt-12">
                        <PerformanceChart data={performanceData} />
                    </div>
                </section>

                {relatedProducts.length > 0 && (
                    <section className="container mx-auto px-4 md:px-6">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold">Vous pourriez aussi aimer</h2>
                        </div>
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((related, i) => (
                                <motion.div
                                    key={related.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <ProductCard product={related} />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
