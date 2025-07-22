
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
import { cn } from "@/lib/utils";

export default function CheckoutClient() {
    const { items, total, itemCount, removeItem, addItem, decreaseItem } = useCart();
    const { toast } = useToast();

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Paiement réussi !",
            description: "Votre commande a été validée. Merci pour votre confiance.",
        });
        useCart.getState().clearCart();
    };

    const handlePayPal = () => {
        toast({
            title: "Bientôt disponible",
            description: "Le paiement par PayPal sera bientôt intégré.",
        });
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* Order Summary */}
            <div>
                 <h2 className="text-2xl font-semibold mb-6">Récapitulatif de la commande</h2>
                 <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>
                            {itemCount} article{itemCount > 1 ? 's' : ''} dans votre panier
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {items.length > 0 ? (
                            <div className="space-y-6">
                                {items.map(item => (
                                    <div key={item.cartItemId} className="flex items-start gap-6">
                                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            {item.configuration && (
                                                <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                                                    <p>CPU: {item.configuration.cpu}</p>
                                                    <p>GPU: {item.configuration.gpu}</p>
                                                    <p>RAM: {item.configuration.ram}</p>
                                                    <p>Stockage: {item.configuration.storage}</p>
                                                </div>
                                            )}
                                             <div className="flex items-center gap-2 mt-2">
                                                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => decreaseItem(item.cartItemId)}><Minus className="h-4 w-4" /></Button>
                                                <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => addItem(item)}><Plus className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                         <div className="text-right">
                                            <p className="font-bold">{(item.price * item.quantity).toFixed(2)}€</p>
                                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.cartItemId)} className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 mt-2">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Separator className="bg-white/10" />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}€</span>
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

            {/* Payment Details */}
            <div>
                 <h2 className="text-2xl font-semibold mb-6">Informations de paiement</h2>
                 <form onSubmit={handlePayment}>
                    <Card className="glass-card overflow-hidden">
                        <CardHeader>
                            <CardTitle>Carte de crédit</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
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
                        <CardFooter className="flex flex-col gap-4 bg-black/10 p-6">
                             <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={items.length === 0}>
                                <Lock className="mr-2 h-4 w-4" />
                                Payer {total.toFixed(2)}€ en toute sécurité
                            </Button>

                            <div className="relative w-full flex items-center justify-center my-2">
                                <Separator className="bg-white/10 shrink" />
                                <span className="px-2 text-xs text-muted-foreground bg-card/0">OU</span>
                                <Separator className="bg-white/10 shrink" />
                            </div>

                             <Button type="button" onClick={handlePayPal} variant="outline" size="lg" className="w-full bg-[#003087] hover:bg-[#00266b] text-white border-0">
                                Payer avec <span className="font-bold ml-1">PayPal</span>
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
}
