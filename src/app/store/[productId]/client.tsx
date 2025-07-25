
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, CheckCircle, Shield, Truck } from 'lucide-react';
import { useCart } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/products';
import { Card, CardContent } from '@/components/ui/card';
import { PCConfigurator, type Configuration } from '@/components/ui/pc-configurator';
import { useState } from 'react';

export default function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [configuration, setConfiguration] = useState<Configuration | null>(null);
    const [totalPrice, setTotalPrice] = useState(product.price);

    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            price: totalPrice, // Use the configured price
            name: configuration ? `${product.name} (Configuré)` : product.name,
            configuration: configuration ?? undefined,
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
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden glass-card p-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        data-ai-hint={product.hint}
                    />
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <span className="text-accent font-semibold">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{product.name}</h1>
                        <p className="text-3xl font-bold">{totalPrice.toFixed(2)}€</p>
                        <p className="text-lg text-muted-foreground">{product.description}</p>
                    </div>

                    {product.id === 1 && (
                        <PCConfigurator basePrice={product.price} onConfigChange={handleConfigChange} />
                    )}

                    <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Ajouter au panier
                    </Button>
                    
                    <Separator className="bg-border" />

                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <span>En stock et prêt à être expédié.</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-blue-400" />
                            <span>Livraison gratuite et rapide en 24/48h.</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-amber-400" />
                            <span>Garantie constructeur de 2 ans incluse.</span>
                        </div>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">Vous pourriez aussi aimer</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map(related => (
                             <Link href={`/store/${related.id}`} key={related.id}>
                               <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 rounded-2xl bg-card/95 hover:bg-card/25 dark:bg-card/80 dark:hover:bg-card/50 border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:backdrop-blur-xl">
                                  <CardContent className="relative flex-1 p-0">
                                    <div className="relative aspect-square">
                                        <Image
                                            src={related.image}
                                            alt={related.name}
                                            fill
                                            className="object-cover transition-transform duration-500"
                                            data-ai-hint={related.hint}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-foreground">{related.name}</h3>
                                        <p className="mt-2 text-xl font-semibold text-foreground">{related.price.toFixed(2)}€</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
