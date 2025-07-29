import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Video, Clock } from "lucide-react";

const DemoPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
          <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Réservez votre démonstration personnalisée
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Découvrez en direct comment l'écosystème (X)yzz.ai peut révolutionner votre flux de travail créatif. Choisissez un créneau qui vous convient.
            </p>
          </div>

          <Card className="glass-card max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 space-y-6 border-b md:border-b-0 md:border-r border-border">
                     <h2 className="text-2xl font-semibold">Démonstration (X)OS Pro</h2>
                     <p className="text-muted-foreground">
                        Un expert de notre équipe vous guidera à travers les fonctionnalités clés de la plateforme, répondra à vos questions et explorera avec vous comment (X)yzz.ai peut s'adapter à vos besoins spécifiques.
                     </p>
                     <div className="space-y-4 pt-4 text-sm">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary"/>
                            <span>Durée de 30 minutes</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Video className="h-5 w-5 text-primary"/>
                            <span>Visioconférence en direct</span>
                        </div>
                     </div>
                </div>
                 <div className="p-8">
                    <form className="space-y-6">
                        <h3 className="text-lg font-semibold">Choisissez une date et une heure</h3>
                        <div>
                            {/* Placeholder for a real calendar component like Calendly */}
                            <div className="aspect-video w-full bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground">
                                Widget de calendrier (ex: Calendly)
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Votre email professionnel</Label>
                            <Input id="email" type="email" placeholder="email@votre-entreprise.com" />
                        </div>
                        <Button size="lg" className="w-full">
                            <Calendar className="mr-2 h-5 w-5"/>
                            Confirmer la réservation
                        </Button>
                    </form>
                 </div>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default DemoPage;
