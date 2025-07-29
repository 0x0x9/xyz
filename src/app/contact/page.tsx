import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Building, Mail, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Contactez-nous
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Une question, un projet ? Notre équipe est à votre écoute pour vous accompagner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-1 space-y-8">
                <div className="flex items-start gap-4">
                    <Building className="h-8 w-8 text-primary mt-1"/>
                    <div>
                        <h3 className="text-xl font-semibold">Nos Bureaux</h3>
                        <p className="text-muted-foreground">123 Avenue des Champs-Élysées, 75008 Paris, France</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Mail className="h-8 w-8 text-primary mt-1"/>
                    <div>
                        <h3 className="text-xl font-semibold">Email</h3>
                        <p className="text-muted-foreground">contact@xyzz.ai</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Phone className="h-8 w-8 text-primary mt-1"/>
                    <div>
                        <h3 className="text-xl font-semibold">Téléphone</h3>
                        <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Envoyez-nous un message</CardTitle>
                        <CardDescription>Nous vous répondrons dans les plus brefs délais.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom complet</Label>
                                <Input id="name" placeholder="Jean Dupont"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="email@exemple.com"/>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="subject">Sujet</Label>
                            <Input id="subject" placeholder="Demande de partenariat"/>
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Votre message..." rows={6}/>
                         </div>
                         <Button size="lg" className="w-full">
                            <Send className="mr-2 h-5 w-5"/>
                            Envoyer
                         </Button>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default ContactPage;
