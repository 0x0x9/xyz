
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, CheckCircle, Shield, Truck, Check } from 'lucide-react';
import { useCart } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/products';
import { PCConfigurator, type Configuration } from '@/components/ui/pc-configurator';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/product-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [configuration, setConfiguration] = useState<Configuration | null>(null);
    const [totalPrice, setTotalPrice] = useState(product.price);
    const [activeImage, setActiveImage] = useState(product.images[0]);

    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            price: totalPrice,
            name: configuration ? `${product.name} (Configuré)` : product.name,
            configuration: configuration ?? undefined,
            image: activeImage,
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
        // Change image based on config
        const configKeys = Object.keys(newConfig);
        const changedKey = configKeys.find(key => newConfig[key as keyof Configuration] !== (configuration?.[key as keyof Configuration] ?? ''));
        
        if (changedKey) {
            const optionsMap: Record<string, number> = {
                'gpu': 1, 'ram': 2, 'storage': 3, 'cpu': 0,
            };
            const component = changedKey as keyof typeof optionsMap;
            const imageIndex = optionsMap[component] || 0;
            if (product.images[imageIndex]) {
                setActiveImage(product.images[imageIndex]);
            }
        }
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-28 md:py-36">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-4">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden glass-card p-4">
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={activeImage}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                    data-ai-hint={product.hint}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    {product.images.length > 1 && (
                        <div className="grid grid-cols-5 gap-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={cn(
                                        "relative aspect-square w-full rounded-lg overflow-hidden border-2 transition-all",
                                        activeImage === img ? "border-primary" : "border-transparent hover:border-primary/50"
                                    )}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} - vue ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
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

                    {product.configurable && (
                        <PCConfigurator basePrice={product.price} onConfigChange={handleConfigChange} />
                    )}

                    <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Ajouter au panier
                    </Button>
                </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto space-y-12">
                {product.features && (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-center">Caractéristiques principales</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {product.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-foreground">
                                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                <Separator />
                
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Livraison & Retours</AccordionTrigger>
                        <AccordionContent>
                            Livraison gratuite en 24/48h dans toute l'Europe. Retours gratuits sous 30 jours. Tous nos emballages sont 100% recyclés et recyclables.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Garantie & Support</AccordionTrigger>
                        <AccordionContent>
                            Ce produit est couvert par une garantie constructeur de 2 ans. Notre support technique est disponible 24/7 pour vous assister en cas de besoin.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Spécifications Techniques</AccordionTrigger>
                        <AccordionContent>
                            Les spécifications détaillées sont disponibles dans le manuel utilisateur. Pour toute question technique, n'hésitez pas à contacter notre support expert.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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
