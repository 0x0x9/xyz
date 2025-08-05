
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Shield, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/products';
import { PCConfigurator, type Configuration } from '@/components/ui/pc-configurator';
import { useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import React from 'react';
import Link from 'next/link';

const reassuranceItems = [
    { icon: Truck, text: "Livraison gratuite et rapide" },
    { icon: Shield, text: "Garantie constructeur 2 ans" },
    { icon: CheckCircle, text: "Retours faciles sous 30 jours" },
]

export default function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [configuration, setConfiguration] = useState<Configuration | null>(null);
    const [totalPrice, setTotalPrice] = useState(product.price);
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) return;
    
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
    
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

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
        <div className="space-y-24 md:space-y-36">
            <section className="container mx-auto px-4 md:px-6 text-center pt-16 md:pt-24">
                <div className="mb-12 text-left">
                    <Button asChild variant="ghost" className="text-muted-foreground">
                        <Link href="/store">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à la boutique
                        </Link>
                    </Button>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="text-primary font-semibold">{product.category}</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">{product.name}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">{product.description}</p>
                    <p className="text-3xl font-bold mt-6">{totalPrice.toFixed(2)}€</p>
                     <div className="mt-8 flex gap-4 justify-center">
                        <Button size="lg" className="rounded-full text-lg" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Ajouter au panier
                        </Button>
                    </div>
                     <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                        {reassuranceItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full max-w-6xl mx-auto mt-12"
                >
                    <Carousel setApi={setApi} className="w-full">
                        <CarouselContent>
                            {product.images.map((img, index) => (
                                <CarouselItem key={index}>
                                    <div className="aspect-[16/10] relative">
                                        <Image
                                            src={img}
                                            alt={`${product.name} - vue ${index + 1}`}
                                            fill
                                            className="object-contain"
                                            data-ai-hint={product.hint}
                                            priority={index === 0}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                     <div className="py-2 text-center text-sm text-muted-foreground">
                        {current} / {count}
                    </div>
                </motion.div>
            </section>
            
            {product.configurable && (
                <section className="container mx-auto px-4 md:px-6">
                    <PCConfigurator 
                        basePrice={product.price} 
                        onConfigChange={handleConfigChange} 
                    />
                     <div className="mt-16 flex flex-col items-center gap-6 text-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Total pour votre configuration</p>
                            <p className="text-4xl font-bold">{totalPrice.toFixed(2)}€</p>
                        </div>
                        <Button size="lg" className="rounded-full text-lg" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Ajouter au panier
                        </Button>
                    </div>
                </section>
            )}

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
    );
}
