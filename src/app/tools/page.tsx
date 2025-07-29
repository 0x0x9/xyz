import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { BrainCircuit, Image as ImageIcon, Palette, Type } from "lucide-react";

const tools = [
  {
    icon: <ImageIcon className="h-8 w-8 text-accent" />,
    title: "Générateur d'Images IA",
    description: "Créez des visuels époustouflants à partir de simples descriptions textuelles. Idéal pour l'inspiration et le prototypage rapide.",
    link: "#",
  },
  {
    icon: <Type className="h-8 w-8 text-accent" />,
    title: "Assistant de Rédaction",
    description: "Générez des scripts, des articles ou des slogans. L'IA peaufine votre style et corrige vos textes pour un impact maximal.",
    link: "#",
  },
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: "Créateur de Palettes",
    description: "Trouvez l'harmonie parfaite. Générez des palettes de couleurs uniques et accessibles pour vos projets de design.",
    link: "#",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-accent" />,
    title: "Analyseur de Concepts",
    description: "Soumettez vos idées à notre IA pour obtenir des retours constructifs, des suggestions d'amélioration et des analyses de marché.",
    link: "#",
  },
];

const ToolsPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Outils IA
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Accélérez votre processus créatif avec des outils intelligents conçus pour vous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <Card key={tool.title} className="glass-card shadow-xl hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-2 rounded-2xl flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                        {tool.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
                 <CardFooter>
                  <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-foreground transition-transform hover:scale-105">Lancer l'outil</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ToolsPage;
