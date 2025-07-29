import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Check } from "lucide-react";

const SubscribePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                 <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    Abonnez-vous à <span className="text-accent">XOS Pro</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                    Débloquez tout le potentiel de votre créativité. Accès illimité à nos outils IA, stockage cloud étendu et support prioritaire.
                </p>
                <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5"/>Accès à tous les outils IA</li>
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5"/>500 Go de stockage cloud XOS</li>
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5"/>Support technique prioritaire 24/7</li>
                    <li className="flex items-center gap-3"><Check className="text-accent h-5 w-5"/>Accès aux bêtas et fonctionnalités en avant-première</li>
                </ul>
                 <p className="text-3xl font-bold text-foreground">29.99€<span className="text-base font-normal text-muted-foreground">/mois</span></p>
            </div>
            <Card className="w-full max-w-md glass-card border-white/20 shadow-2xl shadow-accent/10">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-foreground">Créer votre compte</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Rejoignez-nous en quelques secondes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Jean Dupont" required className="bg-white/5 border-white/20 focus:bg-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemple.com" required className="bg-white/5 border-white/20 focus:bg-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" required className="bg-white/5 border-white/20 focus:bg-white/10" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
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
