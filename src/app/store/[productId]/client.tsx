
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Shield, Truck } from 'lucide-react';
import { useCart } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/products';
import { PCConfigurator, type Configuration } from '@/components/ui/pc-configurator';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Separator } from '@/components/ui/separator';

export default function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [configuration, setConfiguration] = useState<Configuration | null>(null);
    const [totalPrice, setTotalPrice] = useState(product.price);
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", () => setCurrent(api.selectedScrollSnap() + 1))
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
        <div className="container mx-auto px-4 md:px-6 py-28 md:py-36">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-4">
                     <Carousel setApi={setApi} className="w-full">
                        <CarouselContent>
                            {product.images.map((img, idx) => (
                                <CarouselItem key={idx}>
                                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden glass-card p-4">
                                        <Image
                                            src={img}
                                            alt={`${product.name} - vue ${idx + 1}`}
                                            fill
                                            className="object-contain"
                                            data-ai-hint={product.hint}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {product.images.length > 1 && (
                            <>
                                <CarouselPrevious />
                                <CarouselNext />
                            </>
                        )}
                    </Carousel>
                    {product.images.length > 1 && (
                        <div className="text-center text-sm text-muted-foreground">
                            {current} / {product.images.length}
                        </div>
                    )}
                </div>


                <div className="space-y-6">
                    <div className="space-y-3">
                        <span className="text-accent font-semibold">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{product.name}</h1>
                        <p className="text-3xl font-bold">{totalPrice.toFixed(2)}€</p>
                        <p className="text-lg text-muted-foreground">{product.description}</p>
                    </div>

                    <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Truck className="h-5 w-5 text-primary"/>
                            <span>Livraison gratuite en 24/48h et retours sous 30 jours.</span>
                        </div>
                         <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Shield className="h-5 w-5 text-primary"/>
                            <span>Garantie constructeur de 2 ans et support 24/7.</span>
                        </div>
                    </div>
                    <Separator className="bg-border" />
                    
                    <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Ajouter au panier
                    </Button>
                </div>
            </div>

            <div className="mt-20 max-w-5xl mx-auto space-y-12">
                 {product.configurable && (
                    <PCConfigurator basePrice={product.price} onConfigChange={handleConfigChange} />
                )}

                 {product.features && (
                    <Tabs defaultValue="features" className="w-full">
                        <TabsList className="grid w-full grid-cols-1">
                            <TabsTrigger value="features">Caractéristiques</TabsTrigger>
                        </TabsList>
                        <TabsContent value="features" className="mt-6">
                            <div className="space-y-4 glass-card p-8">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-foreground">
                                            <Check className="h-5 w-5 text-green-500 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </div>

            {relatedProducts.length > 0 && (
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">Vous pourriez aussi aimer</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map(related => (
                             <ProductCard key={related.id} product={related} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
