
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/products';
import { PCConfigurator, type Configuration } from '@/components/ui/pc-configurator';
import { useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [configuration, setConfiguration] = useState<Configuration | null>(null);
    const [totalPrice, setTotalPrice] = useState(product.price);

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
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            {/* Hero Section */}
            <section className="text-center py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-semibold">{product.category}</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">{product.name}</h1>
                    <p className="text-3xl font-bold mt-4">{totalPrice.toFixed(2)}€</p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">{product.description}</p>
                     <div className="mt-8 flex gap-4 justify-center">
                        <Button size="lg" className="rounded-full text-lg" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Ajouter au panier
                        </Button>
                    </div>
                </motion.div>
                 <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative aspect-video w-full max-w-5xl mx-auto mt-12"
                >
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain"
                        data-ai-hint={product.hint}
                    />
                </motion.div>
            </section>
            
            {/* Features & Configurator Tabs */}
            <section className="py-16 md:py-24">
                <Tabs defaultValue="features" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto h-12">
                        <TabsTrigger value="features" className="text-base h-10">Caractéristiques</TabsTrigger>
                        <TabsTrigger value="configurator" className="text-base h-10">Configurer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="features" className="mt-12">
                         <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold">Caractéristiques Clés</h2>
                        </div>
                        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {product.features?.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="bg-primary/10 text-primary p-2 rounded-full border border-primary/20">
                                        <CheckCircle className="h-5 w-5" />
                                    </div>
                                    <span>{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="configurator" className="mt-12">
                         {product.configurable && (
                            <PCConfigurator basePrice={product.price} onConfigChange={handleConfigChange} />
                        )}
                    </TabsContent>
                </Tabs>
            </section>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className="py-16 md:py-24">
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
