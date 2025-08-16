
'use client';

import { useCart } from "@/hooks/use-cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart, ArrowLeft, Lock, CreditCard, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { useIsClient } from "@/hooks/use-is-client";

export default function CheckoutClient() {
    const { items, total, itemCount, removeItem, addItem, decreaseItem } = useCart();
    const { toast } = useToast();
    const isClient = useIsClient();

    const shippingCost = 0; // Livraison gratuite
    const finalTotal = total + shippingCost;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Paiement réussi !",
            description: "Votre commande a été validée. Merci pour votre confiance.",
        });
        useCart.getState().clearCart();
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            
            {/* Left Column: Forms */}
            <div className="lg:col-span-7">
                <form onSubmit={handlePayment} className="space-y-8">
                     {/* Contact & Shipping */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-2xl">Informations de livraison</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Adresse e-mail</Label>
                                <Input id="email" type="email" placeholder="email@exemple.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Adresse de livraison</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="Prénom" required />
                                    <Input placeholder="Nom" required />
                                </div>
                                <Input placeholder="Adresse" required />
                                <Input placeholder="Appartement, suite, etc. (optionnel)" />
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                     <Input placeholder="Ville" required />
                                     <Input placeholder="Code Postal" required />
                                     <Input placeholder="Pays" value="France" readOnly />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Details */}
                    <Card className="glass-card">
                         <CardHeader>
                            <CardTitle className="text-2xl">Paiement</CardTitle>
                            <CardDescription>Toutes les transactions sont sécurisées et chiffrées.</CardDescription>
                        </CardHeader>
                         <CardContent>
                             <div className="p-6 rounded-2xl bg-black/20 border border-white/10 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="number">Numéro de carte</Label>
                                    <div className="relative">
                                        <Input id="number" name="number" placeholder="0000 0000 0000 0000" required className="pl-12" />
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom sur la carte</Label>
                                    <Input id="name" name="name" placeholder="Jean Dupont" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiration (MM/AA)</Label>
                                        <Input id="expiry" name="expiry" placeholder="MM/AA" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" name="cvc" placeholder="123" required />
                                    </div>
                                </div>
                            </div>
                         </CardContent>
                    </Card>

                    <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl" disabled={itemCount === 0 || !isClient}>
                        <Lock className="mr-2 h-5 w-5" />
                        Payer {isClient ? finalTotal.toFixed(2) : '...'}€
                    </Button>
                </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
                 <Card className="glass-card sticky top-28">
                    <CardHeader>
                        <CardTitle className="text-2xl">Récapitulatif</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!isClient ? (
                            <div className="space-y-4">
                                <div className="flex gap-4"><Skeleton className="h-16 w-16" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /></div></div>
                                <Separator className="bg-white/10" />
                                <div className="space-y-2">
                                    <div className="flex justify-between"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-16" /></div>
                                    <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-16" /></div>
                                </div>
                                <Separator className="bg-white/10" />
                                <div className="flex justify-between"><Skeleton className="h-6 w-20" /><Skeleton className="h-6 w-24" /></div>
                            </div>
                        ) : items.length > 0 ? (
                            <div className="space-y-4">
                                <ScrollArea className="h-64 pr-4 -mr-4">
                                    <div className="space-y-4">
                                    {items.map(item => (
                                        <div key={item.cartItemId} className="flex items-start gap-4">
                                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-white/10">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm">{item.name}</h3>
                                                <p className="text-xs text-muted-foreground">{item.configuration ? 'Configuré' : 'Standard'}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                     <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => decreaseItem(item.cartItemId)}><Minus className="h-3 w-3" /></Button>
                                                     <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                     <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => addItem(item)}><Plus className="h-3 w-3" /></Button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-sm">{(item.price * item.quantity).toFixed(2)}€</p>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive mt-1" onClick={() => removeItem(item.cartItemId)}>
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </ScrollArea>
                                <Separator className="bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <Input placeholder="Code promo" className="flex-1" />
                                    <Button variant="outline">Appliquer</Button>
                                </div>
                                <Separator className="bg-white/10" />
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sous-total</span>
                                        <span>{total.toFixed(2)}€</span>
                                    </div>
                                     <div className="flex justify-between">
                                        <span className="text-muted-foreground">Livraison</span>
                                        <span>{shippingCost > 0 ? `${shippingCost.toFixed(2)}€` : 'Gratuite'}</span>
                                    </div>
                                </div>
                                <Separator className="bg-white/10" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{finalTotal.toFixed(2)}€</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-16">
                                <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
                                <p className="text-lg font-medium">Votre panier est vide.</p>
                                <Button asChild variant="glass" className="mt-4">
                                    <Link href="/store">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Retour à la boutique
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
