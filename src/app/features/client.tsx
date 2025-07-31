
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Cpu, Zap, Layers, Folder, Code, Terminal, BrainCircuit, Lightbulb, Film, Check, Download, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <section className={cn("py-24 sm:py-32 md:py-40", className)}>
    <div className="container mx-auto px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const AnimatedText = ({ text, el: Wrapper = 'p', className, stagger = 0.02, once = true }: { text: string; el?: React.ElementType; className?: string; stagger?: number, once?: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.5 });
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: stagger },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
    };

    return (
        <Wrapper ref={ref} className={className}>
            <motion.span variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} aria-label={text}>
                {words.map((word, index) => (
                    <motion.span key={index} variants={wordVariants} className="inline-block mr-[0.25em]">
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </Wrapper>
    );
};

const StickyScrollSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const features = [
    { title: "Un seul OS, trois mondes", description: "Basculez instantanément entre les environnements Windows, macOS et Linux. Profitez du meilleur de chaque système, sans redémarrage, sans compromis.", icon: Layers, videoId: 'wLiwRGYaVnw?playlist=wLiwRGYaVnw' },
    { title: "IA au coeur du système", description: "Oria, notre assistant IA, est intégré nativement pour optimiser vos workflows, automatiser les tâches et vous suggérer des idées créatives.", icon: BrainCircuit, videoId: 'crtsXQdtqbw?playlist=crtsXQdtqbw' },
    { title: "Performances sans précédent", description: "Grâce à une gestion matérielle de bas niveau, (X)OS exploite pleinement la puissance de votre Station X-1 pour des rendus et des compilations ultra-rapides.", icon: Zap, videoId: 'YUEb23FQVhA?playlist=YUEb23FQVhA' },
    { title: "Gestion de fichiers unifiée", description: "Accédez à tous vos fichiers, quel que soit l'OS, depuis un explorateur unique et intelligent qui synchronise tout avec (X)Cloud.", icon: Folder, videoId: 'ozGQ2q4l4ys?playlist=ozGQ2q4l4ys' },
  ];
  
  const cardOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.8, 1, 1, 0.9]);
  const activeFeatureIndex = useTransform(scrollYProgress, [0, 0.99], [0, features.length - 1]);


  return (
    <div ref={targetRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: cardOpacity, scale: cardScale }} className="w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {features.map((feature, i) => {
                return (
                  <motion.div
                    key={i}
                    className="absolute w-full h-full"
                    initial={{ opacity: 0, zIndex: 0 }}
                    animate={{ 
                      opacity: Math.round(activeFeatureIndex.get()) === i ? 1 : 0, 
                      zIndex: Math.round(activeFeatureIndex.get()) === i ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                     <div className="relative w-[80%] h-[80%] max-w-6xl aspect-video mx-auto my-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden glass-card p-2">
                        <iframe
                            src={`https://www.youtube.com/embed/${feature.videoId}&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&wmode=transparent`}
                            title={feature.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        ></iframe>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
        </motion.div>
        
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 pointer-events-none">
            {features.map((feature, i) => {
                const start = i * 0.25;
                const end = start + 0.25;
                const featureOpacity = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0, 1, 1, 0]);
                const featureY = useTransform(scrollYProgress, [start - 0.1, start], [50, 0]);

                return (
                    <motion.div 
                        key={i} 
                        style={{ opacity: featureOpacity, y: featureY }}
                        className="flex flex-col items-center justify-center text-center p-6 bg-background/50 backdrop-blur-md rounded-2xl border border-white/10"
                    >
                        <feature.icon className="h-10 w-10 text-primary mb-4"/>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground mt-2">{feature.description}</p>
                    </motion.div>
                );
            })}
        </div>
      </div>
    </div>
  );
};


const productRange = [
    {
        greek: "Ω",
        name: "(X)-oméga",
        price: "1 999 €",
        features: ["(X)OS complet", "Dual-OS Windows/macOS", "32 Go RAM", "1 To SSD", "(X)Cloud inclus"]
    },
     {
        greek: "α",
        name: "(X)-alpha",
        price: "2 999 €",
        features: ["(X)OS Pro", "Triple-OS + Linux", "64 Go RAM", "2 To SSD", "(X)AI intégré"]
    },
    {
        greek: "φ",
        name: "(X)-fi",
        price: "4 499 €",
        features: ["(X)OS Studio", "Multi-GPU dédié", "128 Go RAM", "4 To SSD", "Support prioritaire"]
    },
]

export default function FeaturesClient() {
  return (
    <>
      <div className="relative h-screen">
          <div className="absolute inset-0 bg-background/80">
             <video autoPlay loop muted playsInline className="w-full h-full object-cover" poster="https://images.unsplash.com/photo-1618423484838-b7a4aa4d8523?auto=format&fit=crop&w=1600&q=80">
                 <source src="https://cdn.xyzz.ai/videos/xos_intro.mp4" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
              <AnimatedText text="(X)OS" el="h1" className="text-7xl md:text-9xl font-bold tracking-tighter" stagger={0.1} />
              <AnimatedText text="De l'Ωméga à l'αlpha. L'harmonie entre les univers." el="p" className="mt-4 text-xl md:text-2xl max-w-3xl" stagger={0.01} />
          </div>
      </div>
      
      <StickyScrollSection />

      <Section>
        <div className="text-center">
          <AnimatedText text="Créativité sans limites." el="h2" className="section-title" />
          <AnimatedText text="Un écosystème conçu pour amplifier vos idées, pas pour les contraindre." el="p" className="section-subtitle" />
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                <Code className="h-12 w-12 text-primary mx-auto"/>
                <h3 className="mt-4 text-2xl font-bold">Pour les développeurs</h3>
                <p className="mt-2 text-muted-foreground">Un terminal unifié, des conteneurs natifs et un SDK puissant pour étendre l'écosystème. Créez des outils qui s'intègrent parfaitement à (X)OS.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                <Cpu className="h-12 w-12 text-primary mx-auto"/>
                <h3 className="mt-4 text-2xl font-bold">Pour les designers</h3>
                <p className="mt-2 text-muted-foreground">Une gestion des couleurs au niveau du système, une calibration d'écran parfaite et une suite d'outils de design qui communiquent entre eux sans effort.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
                <Film className="h-12 w-12 text-primary mx-auto"/>
                <h3 className="mt-4 text-2xl font-bold">Pour les vidéastes</h3>
                <p className="mt-2 text-muted-foreground">Des codecs accélérés par le matériel, des rendus en tâche de fond qui ne ralentissent jamais votre travail et un pipeline de production assisté par IA.</p>
            </motion.div>
        </div>
      </Section>
      
       <Section>
            <div className="text-center">
                <AnimatedText text="Explorez la gamme." el="h2" className="section-title" />
                <AnimatedText text="Des workstations pensées par et pour les créatifs." el="p" className="section-subtitle" />
            </div>
             <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productRange.map((product, i) => (
                    <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="h-full"
                    >
                         <Card className="flex flex-col h-full text-center p-8 bg-card/50 dark:bg-card/20 border-border/50 hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                            <CardHeader className="p-0 mb-6">
                                <div className="mx-auto text-5xl font-light text-muted-foreground mb-4">{product.greek}</div>
                                <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
                                <CardDescription className="text-primary font-semibold mt-1">{product.price}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 flex-grow">
                                <ul className="space-y-3 text-muted-foreground">
                                    {product.features.map(feat => (
                                        <li key={feat} className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                                            <span className="text-left">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-0 mt-8">
                                <Button asChild className="w-full">
                                    <Link href="/store">Choisir</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
      </Section>

       {/* Final CTA */}
      <Section className="text-center">
          <AnimatedText text="Prêt à transformer votre machine ?" el="h2" className="section-title"/>
          <AnimatedText text="Téléchargez (X)OS ou découvrez la Station X-1, le matériel conçu pour l'exécuter à la perfection." el="p" className="section-subtitle"/>
          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
              <Button size="lg" asChild className="rounded-full text-lg">
                <Link href="/download">Télécharger (X)OS</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full text-lg">
                <Link href="/hardware">Explorer la Station X-1</Link>
              </Button>
          </motion.div>
      </Section>
    </>
  );
}
