
"use client";

import React, { useState, useRef, Suspense } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  ArrowRight, 
  Terminal, 
  Wand2, 
  BrainCircuit, 
  Layers, 
  Lightbulb, 
  Calendar, 
  Network, 
  Film, 
  Image as ImageIcon, 
  AudioLines, 
  FileText, 
  Guitar, 
  Music, 
  SquareTerminal, 
  LayoutTemplate,
  Cpu,
  Sparkles,
  BookOpen,
  Paintbrush,
  Users
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import HomepageOriaChat from '@/components/homepage-oria';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


function AnimatedSection({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef(null);
     const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.5"]
    });
    
    return (
        <motion.div ref={ref} style={{ opacity: scrollYProgress, y: useTransform(scrollYProgress, [0, 1], [50, 0])}} className={className}>
            {children}
        </motion.div>
    )
}

function FeatureShowcase({ title, description, buttonText, buttonHref, imageUrl, imageHint, imagePosition = 'left' }: {
    title: string,
    description: string,
    buttonText: string,
    buttonHref: string,
    imageUrl: string,
    imageHint: string,
    imagePosition?: 'left' | 'right'
}) {
    const Icon = buttonHref === '/welcome' ? Sparkles : Cpu;

    return (
        <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={cn("relative aspect-video lg:aspect-square", imagePosition === 'right' && 'lg:order-2')}>
                     <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-contain rounded-2xl"
                        data-ai-hint={imageHint}
                    />
                </div>
                 <div className="space-y-6">
                     <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                       {title}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        {description}
                    </p>
                     <div className="pt-2">
                        <Button size="lg" asChild className="rounded-full text-lg">
                            <Link href={buttonHref}>
                                {buttonText} <Icon className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    )
}

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
        icon: ImageIcon,
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
        icon: Terminal,
      },
    ]
  },
];

const ecosystemLinks = [
    { 
        title: "Communauté", 
        description: "Échangez avec d'autres créatifs sur le forum et découvrez les dernières actualités sur le blog.", 
        href: "/community",
        icon: Users,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        imageHint: "creative team meeting"
    },
    { 
        title: "Galerie (X)hibit", 
        description: "Explorez les créations de la communauté propulsées par l'IA.", 
        href: "/gallery",
        icon: Paintbrush,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
        imageHint: "art gallery"
    },
    { 
        title: "Rejoignez l'équipe", 
        description: "Nous recherchons des talents passionnés pour façonner le futur avec nous.", 
        href: "/careers",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
        imageHint: "person working on laptop"
    },
];


const HomePageClient = () => {
  const [activeCategory, setActiveCategory] = useState(toolCategories[0].id);
  const activeTools = toolCategories.find(c => c.id === activeCategory)?.tools || [];

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-24 md:py-32">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-6">
            Votre écosystème créatif. <br />
            <span className="text-accent">Unifié par l'IA.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            (X)yzz.ai est une suite d'outils interconnectés, conçue pour transformer vos idées en projets complets. 
            Commencez par discuter avec Oria, notre IA d'orchestration.
          </p>
          <HomepageOriaChat />
        </section>

        <section className="space-y-24 md:space-y-36 my-24 md:my-32">
            <FeatureShowcase 
                title="(X)OS : Le cœur de votre créativité."
                description="Ce n'est pas un système d'exploitation. C'est une extension de votre imagination, un environnement unifié où tous vos outils et idées convergent. Disponible sur notre matériel dédié et en ligne, partout."
                buttonText="Découvrir (X)OS"
                buttonHref="/welcome"
                imageUrl="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                imageHint="futuristic operating system"
                imagePosition="left"
            />
             <FeatureShowcase 
                title="Station X-1 : La puissance incarnée."
                description="La performance n'est que le début. La Station X-1 est conçue pour une synergie parfaite avec (X)OS, libérant une puissance de calcul et une fluidité sans précédent pour les workflows les plus exigeants."
                buttonText="Explorer le matériel"
                buttonHref="/hardware"
                imageUrl="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
                imageHint="powerful desktop computer"
                imagePosition="right"
            />
        </section>

        <section id="tools" className="my-24 md:my-32">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Découvrez nos outils</h2>
              <p className="max-w-2xl mx-auto text-md text-muted-foreground mt-2">
                  Chaque outil est un expert dans son domaine, prêt à collaborer au sein de l'écosystème (X)OS.
              </p>
          </div>

          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
                  {toolCategories.map((category) => (
                      <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={cn(
                              "p-4 text-left rounded-xl border-2 transition-all duration-300",
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
              </div>

              <AnimatePresence mode="wait">
                  <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                      {activeTools.map((tool) => (
                           <Link key={tool.href} href={tool.href}>
                              <div className="p-6 h-full flex flex-col transition-all duration-300 group rounded-xl hover:-translate-y-1 bg-card/95 hover:bg-card/25 dark:bg-card/80 dark:hover:bg-card/50 border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:backdrop-blur-xl">
                                  <div className="bg-accent/10 p-2 rounded-lg mb-4 w-fit border border-accent/20">
                                      <tool.icon className="h-6 w-6 text-accent" />
                                  </div>
                                  <h4 className="text-xl font-semibold mb-2 text-foreground">{tool.title}</h4>
                                  <p className="text-muted-foreground flex-grow mb-4 text-sm">{tool.description}</p>
                                  <div className="flex items-center text-sm font-medium text-accent mt-auto">
                                      Lancer l'outil <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                  </div>
                              </div>
                          </Link>
                      ))}
                  </motion.div>
              </AnimatePresence>
          </div>
        </section>

        <section id="community-hub" className="my-24 md:my-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Plus qu'une plateforme, une communauté.</h2>
                <p className="max-w-2xl mx-auto text-md text-muted-foreground mt-2">
                    Partagez, apprenez et grandissez avec des créatifs du monde entier.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {ecosystemLinks.map((item) => (
                    <AnimatedSection key={item.href}>
                        <Link href={item.href} className="block group">
                           <div className="relative overflow-hidden rounded-2xl aspect-[4/3] glass-card">
                               <Image 
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    data-ai-hint={item.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 text-white">
                                    <div className="p-2 bg-white/10 rounded-lg border border-white/20 mb-3 w-fit backdrop-blur-sm">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="text-white/80 text-sm mt-1">{item.description}</p>
                                </div>
                           </div>
                        </Link>
                    </AnimatedSection>
                ))}
            </div>
        </section>

        <section id="demo" className="mt-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">La création, réinventée.</h2>
            <p className="max-w-2xl mx-auto text-md text-muted-foreground mt-2">
                Voyez comment notre suite d'outils peut transformer votre processus créatif.
            </p>
          </div>
          <div className="glass-card p-2 md:p-3 max-w-5xl mx-auto rounded-2xl">
            <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/SqJGQ25sc8Q?si=279cRsOPl_dffifa&autoplay=1&mute=1&loop=1&playlist=SqJGQ25sc8Q"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePageClient;
