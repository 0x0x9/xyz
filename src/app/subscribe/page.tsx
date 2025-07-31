
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SubscribePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 md:py-36">
        <div className="container mx-auto px-4 md:px-6 flex justify-center">
            
            <Card className="w-full max-w-2xl glass-card border-white/20 shadow-2xl shadow-accent/10">
              <CardHeader className="text-center p-8 md:p-12 pb-6">
                <div className="inline-block bg-primary/10 p-3 rounded-2xl border border-primary/20 w-fit mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Abonnement XOS Pro
                </CardTitle>
                <CardDescription className="text-lg md:text-xl text-muted-foreground pt-2">
                    Débloquez l'intégralité de l'écosystème créatif (X)yzz.
                </CardDescription>
                 <p className="text-4xl font-bold text-foreground pt-4">29.99€<span className="text-base font-normal text-muted-foreground">/mois</span></p>
              </CardHeader>
              <CardContent className="px-8 md:px-12">
                <ul className="space-y-4 text-foreground/90 text-center md:text-left mb-8">
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5 shrink-0"/>Accès illimité à tous les outils IA</li>
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5 shrink-0"/>500 Go de stockage cloud (X)cloud</li>
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5 shrink-0"/>Support technique prioritaire 24/7</li>
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5 shrink-0"/>Synchronisation multi-appareils</li>
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5 shrink-0"/>Accès aux bêtas et fonctionnalités en avant-première</li>
                </ul>
                <Separator className="my-8 bg-border/50" />
                <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" placeholder="Jean Dupont" required className="bg-white/5 border-white/20 focus:bg-white/10 h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@exemple.com" required className="bg-white/5 border-white/20 focus:bg-white/10 h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" required className="bg-white/5 border-white/20 focus:bg-white/10 h-12" />
                    </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 p-8 md:p-12 pt-8">
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg">
                  S'abonner et Payer
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                    Déjà membre?{' '}
                    <Link href="/login" className="font-semibold text-accent hover:underline">
                        Se connecter
                    </Link>
                </p>
              </CardFooter>
            </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
export default SubscribePage;
