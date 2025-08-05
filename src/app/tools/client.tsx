
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, BrainCircuit, Layers, Lightbulb, Calendar, Network,
  Film, Image as ImageIconLucide, AudioLines, FileText,
  Guitar, Music, SquareTerminal, LayoutTemplate, Terminal, CodeXml, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const toolCategories = [
  {
    id: 'strategy',
    name: 'Stratégie & Idéation',
    description: 'Posez les fondations solides de votre projet.',
    tools: [
      {
        title: '(X)flux',
        description: "Transformez une idée brute en projet complet.",
        href: '/flux',
        icon: Wand2,
      },
      {
        title: 'Maestro',
        description: "Orchestrez vos projets de A à Z.",
        href: '/xos?open=maestro',
        icon: BrainCircuit,
      },
       {
        title: '(X)brand',
        description: 'Définissez la voix et les couleurs de votre marque.',
        href: '/xos?open=brand-identity',
        icon: Layers,
      },
      {
        title: '(X)promptor',
        description: 'Transformez une idée vague en prompts créatifs.',
        href: '/xos?open=promptor',
        icon: Lightbulb,
      },
       {
        title: '(X)agenda',
        description: "Organisez vos tâches et vos idées avec l'IA.",
        href: '/xos?open=agenda',
        icon: Calendar,
      },
       {
        title: '(X)nexus',
        description: 'Déployez vos idées en cartes mentales visuelles.',
        href: '/xos?open=nexus',
        icon: Network,
      },
    ],
  },
  {
    id: 'content',
    name: 'Création de Contenu',
    description: 'Passez de l\'idée à la réalité.',
    tools: [
       {
        title: '(X)motion',
        description: 'Générez des vidéos complètes avec IA.',
        href: '/xos?open=motion',
        icon: Film,
      },
      {
        title: 'Image',
        description: 'Créez des visuels uniques à partir de mots.',
        href: '/xos?open=image',
        icon: ImageIconLucide,
      },
      {
        title: '(X)voice',
        description: 'Donnez une voix à vos textes et sons.',
        href: '/xos?open=voice',
        icon: AudioLines,
      },
       {
        title: 'Texte',
        description: 'Rédigez des articles, scripts, et plus.',
        href: '/xos?open=text',
        icon: FileText,
      },
    ],
  },
  {
    id: 'music',
    name: 'Musique & Son',
    description: 'Composez, créez et trouvez votre style.',
    tools: [
       {
        title: '(X)muse',
        description: "Trouvez l'inspiration et écrivez vos prochains textes.",
        href: '/xos?open=muse',
        icon: Guitar,
      },
       {
        title: '(X)sound',
        description: 'Générez des effets sonores et des ambiances.',
        href: '/xos?open=sound',
        icon: Music,
      },
    ],
  },
  {
    id: 'design',
    name: 'Design & Dev',
    description: 'Peaufinez et construisez des solutions.',
    tools: [
      {
        title: '(X).alpha',
        description: 'Éditez, générez, débuggez et prévisualisez votre code.',
        href: '/xos?open=editor',
        icon: SquareTerminal,
      },
      {
        title: '(X)frame',
        description: 'Esquissez des interfaces et des wireframes.',
        href: '/xos?open=frame',
        icon: LayoutTemplate,
      },
    ]
  },
  {
    id: 'lab',
    name: 'Le Laboratoire',
    description: 'Testez nos outils expérimentaux.',
    tools: [
      {
        title: '(X)code',
        description: 'Générez et exécutez du code dans un environnement sécurisé.',
        href: '/xos?open=code',
        icon: CodeXml,
      },
    ]
  },
];

export default function ToolsClient() {
    const [activeCategory, setActiveCategory] = useState(toolCategories[0].id);
    const activeTools = toolCategories.find(c => c.id === activeCategory)?.tools || [];

    return (
        <div className="py-28 md:py-36">
            <section className="container mx-auto px-4 md:px-6 text-center">
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    La Suite Créative (X)yzz.
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                    Un arsenal d'outils IA interconnectés, conçus pour chaque étape de votre processus créatif. De l'étincelle de l'idée à la production finale.
                </p>
            </section>

            <section className="container mx-auto px-4 md:px-6 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <aside className="lg:col-span-1 lg:sticky top-28 self-start">
                        <nav className="flex flex-col gap-2">
                             {toolCategories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        "p-4 text-left rounded-xl border-2 transition-all duration-300 w-full",
                                        "bg-card/95 hover:bg-card/25 dark:bg-card/80 dark:hover:bg-card/50",
                                        "hover:shadow-2xl hover:shadow-primary/10 hover:backdrop-blur-xl",
                                        activeCategory === category.id
                                            ? "shadow-accent/20 border-accent/50"
                                            : "border-border hover:border-primary/30"
                                    )}
                                >
                                    <h3 className="text-md font-semibold mb-1 text-foreground">{category.name}</h3>
                                    <p className="text-xs text-muted-foreground">{category.description}</p>
                                </button>
                            ))}
                        </nav>
                    </aside>
                    <main className="lg:col-span-3">
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                {activeTools.map((tool, index) => (
                                    <Link href={tool.href} className="block group h-full" key={tool.href}>
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="p-8 h-full flex flex-col transition-all duration-300 group rounded-2xl hover:-translate-y-2 glass-card hover:border-primary/30"
                                        >
                                            <div className="bg-primary/10 p-3 rounded-lg mb-4 w-fit border border-primary/20">
                                                <tool.icon className="h-7 w-7 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2 text-foreground">{tool.title}</h3>
                                            <p className="text-muted-foreground flex-grow mb-4">{tool.description}</p>
                                            <div className="flex items-center text-sm font-medium text-primary mt-auto">
                                                Lancer l'outil <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </section>
            
            <section className="container mx-auto px-4 md:px-6 text-center mt-32">
                 <h2 className="text-3xl md:text-4xl font-bold">Prêt à créer sans limites ?</h2>
                 <p className="max-w-2xl mx-auto text-md text-muted-foreground mt-2">Plongez dans (X)OS, l'environnement où tous ces outils convergent.</p>
                 <Button asChild size="lg" className="mt-8 rounded-full">
                     <Link href="/xos">Découvrir (X)OS en ligne</Link>
                 </Button>
            </section>
        </div>
    );
}
