import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const featuresFree = [
    "Accès limité aux outils IA",
    "5 Go de stockage (X)cloud",
    "Support communautaire",
    "Synchronisation sur 2 appareils"
]

const featuresPro = [
    "Accès illimité à tous les outils IA",
    "500 Go de stockage (X)cloud",
    "Support technique prioritaire 24/7",
    "Synchronisation multi-appareils illimitée",
    "Accès aux bêtas et fonctionnalités en avant-première",
    "Collaboration en temps réel sur les projets"
]

const SubscribePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 md:py-36">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Choisissez votre plan
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Débloquez l'intégralité de l'écosystème créatif (X)yzz ou commencez gratuitement.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
             {/* Free Plan */}
            <Card className="glass-card flex flex-col h-full">
                <CardHeader className="text-center p-8">
                    <CardTitle className="text-3xl font-bold">Découverte</CardTitle>
                    <CardDescription className="text-muted-foreground pt-1">
                        Idéal pour explorer l'écosystème.
                    </CardDescription>
                    <p className="text-4xl font-bold text-foreground pt-4">0€<span className="text-base font-normal text-muted-foreground">/toujours</span></p>
                </CardHeader>
                <CardContent className="px-8 flex-grow">
                     <ul className="space-y-4 text-foreground/90">
                        {featuresFree.map((feature, i) => (
                           <li key={i} className="flex items-center gap-3"><Check className="text-muted-foreground h-5 w-5 shrink-0"/>{feature}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="p-8">
                    <Button variant="outline" className="w-full text-lg h-12 rounded-full" asChild>
                        <Link href="/login">Commencer gratuitement</Link>
                    </Button>
                </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="glass-card border-primary/50 ring-2 ring-primary/30 flex flex-col h-full">
                <CardHeader className="text-center p-8">
                    <div className="inline-block bg-primary/10 p-3 rounded-2xl border border-primary/20 w-fit mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold">XOS Pro</CardTitle>
                     <CardDescription className="text-muted-foreground pt-1">
                        La suite complète pour les créatifs exigeants.
                    </CardDescription>
                    <p className="text-4xl font-bold text-foreground pt-4">29.99€<span className="text-base font-normal text-muted-foreground">/mois</span></p>
                </CardHeader>
                <CardContent className="px-8 flex-grow">
                     <ul className="space-y-4 text-foreground/90">
                        {featuresPro.map((feature, i) => (
                           <li key={i} className="flex items-center gap-3"><Check className="text-primary h-5 w-5 shrink-0"/>{feature}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="p-8">
                    <Button className="w-full text-lg h-12 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                       <Link href="/login?plan=pro">S'abonner</Link>
                    </Button>
                </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default SubscribePage;
