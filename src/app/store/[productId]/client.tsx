
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Shield, Truck, ArrowLeft, Info, Calendar, Video } from 'lucide-react';
import { useCart } from "@/hooks/use-cart-store";
import { useToast } from "@/hooks/use-toast";
import { type Product } from '@/lib/products';
import { PCConfigurator, type Configuration } from '@/components/ui/pc-configurator';
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product-card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
            <section className="container mx-auto px-4 md:px-6 pt-16 md:pt-24">
                <div className="mb-8 md:mb-12 text-left">
                    <Button asChild variant="ghost" className="text-muted-foreground">
                        <Link href="/store">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à la boutique
                        </Link>
                    </Button>
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Image Carousel */}
                    <div className="lg:sticky top-28">
                         <Carousel setApi={setApi} className="w-full group">
                            <CarouselContent>
                                {product.images.map((img, index) => (
                                    <CarouselItem key={index}>
                                        <div className="aspect-square relative glass-card rounded-2xl overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={`${product.name} - vue ${index + 1}`}
                                                fill
                                                className="object-contain p-4 md:p-8"
                                                data-ai-hint={product.hint}
                                                priority={index === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                             <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                             <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Carousel>
                        <div className="py-2 text-center text-sm text-muted-foreground">
                            {product.images.length > 1 ? `${current} / ${count}` : ''}
                        </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            {product.tagline && <p className="text-primary font-semibold mb-2">{product.tagline}</p>}
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-2">{product.name}</h1>
                            <p className="text-md md:text-lg text-muted-foreground mt-4">{product.description}</p>
                        </div>

                         <div className="space-y-4">
                            {product.features && (
                                <ul className="space-y-3">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-foreground/90">
                                            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="space-y-4">
                            <p className="text-3xl md:text-4xl font-bold">{totalPrice.toFixed(2)}€</p>
                            <Button size="lg" className="w-full text-lg h-12 md:h-14" onClick={handleAddToCart}>
                                <ShoppingCart className="mr-3 h-5 md:h-6 w-5 md:w-6" />
                                Ajouter au panier
                            </Button>
                        </div>
                         <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 text-sm text-muted-foreground pt-4 border-t border-border">
                            {reassuranceItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            </section>

             <section className="container mx-auto px-4 md:px-6">
                <div className="aspect-video w-full glass-card rounded-2xl p-2 overflow-hidden">
                     <iframe
                        src="https://www.youtube.com/embed/ozGQ2q4l4ys?autoplay=1&mute=1&loop=1&playlist=ozGQ2q4l4ys&controls=0&showinfo=0&autohide=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    ></iframe>
                </div>
            </section>
            
            {product.configurable && (
                <section className="container mx-auto px-4 md:px-6">
                    <PCConfigurator 
                        product={product}
                        basePrice={product.price} 
                        onConfigChange={handleConfigChange} 
                    />
                     <div className="mt-16 flex flex-col items-center gap-6 text-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Total pour votre configuration</p>
                            <p className="text-3xl md:text-4xl font-bold">{totalPrice.toFixed(2)}€</p>
                        </div>
                        <Button size="lg" className="rounded-full text-lg" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Ajouter au panier
                        </Button>
                    </div>
                </section>
            )}

            {product.specs && (
                 <section className="container mx-auto px-4 md:px-6">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold">Caractéristiques techniques</h2>
                    </div>
                    <div className="mt-12 max-w-2xl mx-auto glass-card p-6 md:p-8">
                        <ul className="space-y-4">
                            {Object.entries(product.specs).map(([key, value]) => (
                                <li key={key} className="flex flex-col sm:flex-row justify-between sm:items-start text-sm specs-list pb-4">
                                    <span className="font-semibold text-muted-foreground">{key}</span>
                                    <span className="sm:text-right text-foreground max-w-xs">{value}</span>
                                </li>
                            ))}
                        </ul>
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
