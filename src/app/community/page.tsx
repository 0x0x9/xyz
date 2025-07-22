
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageSquare, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <MessageSquare className="h-8 w-8 text-accent" />,
    title: "Discussions Enrichissantes",
    description: "Participez à des conversations sur les dernières tendances, les techniques et les défis du monde créatif."
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: "Collaborations & Opportunités",
    description: "Trouvez des partenaires pour vos projets, partagez vos offres de services ou découvrez de nouvelles missions."
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-accent" />,
    title: "Partage & Inspiration",
    description: "Montrez vos dernières créations, recevez des retours constructifs et inspirez-vous du travail des autres membres."
  }
];

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Rejoignez la Communauté (X)yzz.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Un espace d'échange, de collaboration et d'inspiration pour les créatifs qui repoussent les limites.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg rounded-full">
              <Link href="/forum">
                Accéder au Forum <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map(feature => (
                    <Card key={feature.title} className="glass-card text-center">
                        <CardHeader>
                            <div className="mx-auto w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 mb-4">
                                {feature.icon}
                            </div>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
