
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Building, HelpCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const plans = [
    {
        name: "Découverte",
        price: "0€",
        priceDetails: "/toujours",
        description: "Idéal pour explorer l'écosystème.",
        features: [
            "Accès limité aux outils IA",
            "5 Go de stockage (X)cloud",
            "Support communautaire",
            "Synchronisation sur 2 appareils"
        ],
        buttonText: "Commencer gratuitement",
        buttonVariant: "outline",
        href: "/signup",
        isFeatured: false,
    },
    {
        name: "XOS Pro",
        price: "29.99€",
        priceDetails: "/mois",
        description: "La suite complète pour les créatifs exigeants.",
        features: [
            "Accès illimité à tous les outils IA",
            "1 To de stockage (X)cloud",
            "Support technique prioritaire 24/7",
            "Synchronisation multi-appareils illimitée",
            "Accès aux bêtas et fonctionnalités en avant-première",
            "Collaboration en temps réel sur les projets"
        ],
        buttonText: "Choisir le plan Pro",
        buttonVariant: "default",
        href: "/signup?plan=pro",
        isFeatured: true,
    },
    {
        name: "Entreprise",
        price: "Sur devis",
        priceDetails: "",
        description: "Pour les équipes qui veulent déployer (X)yzz à grande échelle.",
        features: [
            "Toutes les fonctionnalités du plan Pro",
            "Gestion des utilisateurs et des permissions",
            "Analytiques avancées et tableaux de bord",
            "Sécurité renforcée (SSO, logs d'audit)",
            "Support dédié et SLA personnalisé",
        ],
        buttonText: "Contacter les ventes",
        buttonVariant: "outline",
        href: "/contact",
        isFeatured: false,
    }
];

const faqItems = [
    {
        question: "Puis-je changer de plan plus tard ?",
        answer: "Absolument. Vous pouvez passer du plan Découverte au plan Pro, ou ajuster votre plan Entreprise à tout moment depuis les paramètres de votre compte."
    },
    {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons toutes les principales cartes de crédit (Visa, MasterCard, American Express) ainsi que les paiements via PayPal."
    },
    {
        question: "Comment fonctionne le stockage (X)cloud ?",
        answer: "Votre stockage (X)cloud est un espace sécurisé pour tous vos projets, fichiers et créations IA. Il se synchronise automatiquement entre tous vos appareils connectés à (X)OS."
    },
    {
        question: "Puis-je annuler mon abonnement à tout moment ?",
        answer: "Oui, vous pouvez annuler votre abonnement Pro à tout moment. Vous conserverez l'accès à toutes les fonctionnalités Pro jusqu'à la fin de votre période de facturation en cours."
    }
]

const SubscribePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 md:py-36">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Choisissez votre plan
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              Débloquez l'intégralité de l'écosystème créatif (X)yzz ou commencez gratuitement.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
             {plans.map((plan) => (
                <Card key={plan.name} className={cn(
                    "glass-card flex flex-col transition-all duration-300",
                    plan.isFeatured ? "border-primary/50 ring-2 ring-primary/30" : "hover:border-primary/30 hover:-translate-y-2"
                )}>
                    <CardHeader className="text-center p-8">
                         <div className="inline-block bg-primary/10 p-3 rounded-2xl border border-primary/20 w-fit mx-auto mb-4">
                            {plan.name === 'Découverte' && <Sparkles className="h-8 w-8 text-primary" />}
                            {plan.name === 'XOS Pro' && <Sparkles className="h-8 w-8 text-primary animate-pulse" />}
                            {plan.name === 'Entreprise' && <Building className="h-8 w-8 text-primary" />}
                        </div>
                        <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                        <CardDescription className="text-muted-foreground pt-1 min-h-[40px]">
                            {plan.description}
                        </CardDescription>
                        <div className="pt-4">
                            <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                            {plan.priceDetails && <span className="text-base font-normal text-muted-foreground">{plan.priceDetails}</span>}
                        </div>
                    </CardHeader>
                    <CardContent className="px-8 flex-grow">
                         <ul className="space-y-4 text-foreground/90">
                            {plan.features.map((feature, i) => (
                               <li key={i} className="flex items-start gap-3 text-left">
                                <Check className={cn("h-5 w-5 shrink-0 mt-0.5", plan.isFeatured ? "text-primary" : "text-muted-foreground")} />
                                <span>{feature}</span>
                               </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="p-8 mt-auto">
                        <Button variant={plan.buttonVariant as any} className="w-full text-lg h-12 rounded-full" asChild>
                           <Link href={plan.href}>{plan.buttonText}</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-24">
             <div className="text-center mb-12">
                <div className="inline-block bg-primary/10 p-3 rounded-2xl border border-primary/20 w-fit mx-auto mb-4">
                    <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Questions Fréquentes</h2>
             </div>
             <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="glass-card px-6 rounded-2xl mb-3">
                        <AccordionTrigger className="text-lg text-left hover:no-underline">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
export default SubscribePage;
