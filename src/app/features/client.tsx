
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Cpu, Zap, Layers, Folder, Code, Terminal, BrainCircuit, Lightbulb, Film, Check, Download, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
    { title: "Un seul OS, trois mondes", description: "Basculez instantanément entre les environnements Windows, macOS et Linux. Profitez du meilleur de chaque système, sans redémarrage, sans compromis.", icon: Layers, videoId: 'wLiwRGYaVnw' },
    { title: "IA au coeur du système", description: "Oria, notre assistant IA, est intégré nativement pour optimiser vos workflows, automatiser les tâches et vous suggérer des idées créatives.", icon: BrainCircuit, videoId: 'crtsXQdtqbw' },
    { title: "Performances sans précédent", description: "Grâce à une gestion matérielle de bas niveau, (X)OS exploite pleinement la puissance de votre Station X-1 pour des rendus et des compilations ultra-rapides.", icon: Zap, videoId: 'YUEb23FQVhA' },
    { title: "Gestion de fichiers unifiée", description: "Accédez à tous vos fichiers, quel que soit l'OS, depuis un explorateur unique et intelligent qui synchronise tout avec (X)Cloud.", icon: Folder, videoId: 'ozGQ2q4l4ys' },
];

function StickyScrollSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    const activeCardIndex = useTransform(scrollYProgress, [0, 1], [0, features.length]);
    const cardOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 1, 1, 0]);
    const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    return (
        <div ref={targetRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    {features.map((feature, i) => {
                        const targetOpacity = activeCardIndex.get() - i;
                        const opacity = (targetOpacity >= 0 && targetOpacity < 1) 
                            ? 1 
                            : (targetOpacity > 1 && targetOpacity < 2) 
                                ? 2 - targetOpacity 
                                : (targetOpacity < 0 && targetOpacity > -1)
                                    ? 1 + targetOpacity
                                    : 0;
                        
                        if (opacity <= 0) return null;

                        return (
                             <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <div className="absolute inset-0">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${feature.videoId}?autoplay=1&mute=1&loop=1&playlist=${feature.videoId.split('?')[0]}&controls=0&showinfo=0&autohide=1&wmode=transparent`}
                                        title={feature.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full scale-[1.5]"
                                    ></iframe>
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                                </div>
                                <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-8">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 mb-6">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{feature.title}</h2>
                                    <p className="text-lg md:text-xl text-white/80 max-w-2xl">{feature.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}


export default function FeaturesClient() {
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
              <h1 className="text-7xl md:text-9xl font-bold tracking-tighter"> (X)OS </h1>
              <p className="mt-4 text-xl md:text-2xl max-w-3xl">De l'Ωméga à l'αlpha. L'harmonie entre les univers.</p>
          </div>
      </div>
      
       <StickyScrollSection />

      <Section>
        <AnimatedText>
            <div className="text-center container mx-auto px-6 lg:px-8">
                <h2 className="section-title">Créativité sans limites.</h2>
                <p className="section-subtitle">Un écosystème conçu pour amplifier vos idées, pas pour les contraindre.</p>
            </div>
        </AnimatedText>
        <AnimatedText>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center container mx-auto px-6 lg:px-8">
                <div>
                    <Code className="h-12 w-12 text-primary mx-auto"/>
                    <h3 className="mt-4 text-2xl font-bold">Pour les développeurs</h3>
                    <p className="mt-2 text-muted-foreground">Un terminal unifié, des conteneurs natifs et un SDK puissant pour étendre l'écosystème. Créez des outils qui s'intègrent parfaitement à (X)OS.</p>
                </div>
                <div>
                    <Cpu className="h-12 w-12 text-primary mx-auto"/>
                    <h3 className="mt-4 text-2xl font-bold">Pour les designers</h3>
                    <p className="mt-2 text-muted-foreground">Une gestion des couleurs au niveau du système, une calibration d'écran parfaite et une suite d'outils de design qui communiquent entre eux sans effort.</p>
                </div>
                <div>
                    <Film className="h-12 w-12 text-primary mx-auto"/>
                    <h3 className="mt-4 text-2xl font-bold">Pour les vidéastes</h3>
                    <p className="mt-2 text-muted-foreground">Des codecs accélérés par le matériel, des rendus en tâche de fond qui ne ralentissent jamais votre travail et un pipeline de production assisté par IA.</p>
                </div>
            </div>
        </AnimatedText>
      </Section>
      
       <Section>
            <AnimatedText>
                <div className="text-center container mx-auto px-6 lg:px-8">
                    <h2 className="section-title">Explorez la gamme.</h2>
                    <p className="section-subtitle">Des workstations pensées par et pour les créatifs.</p>
                </div>
            </AnimatedText>
             <AnimatedText>
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-6 lg:px-8">
                    {productRange.map((product, i) => (
                        <div
                            key={product.name}
                            className="h-full"
                        >
                            <div className="flex flex-col h-full text-center p-8 bg-card/50 dark:bg-card/20 border border-border/50 hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                <header className="p-0 mb-6">
                                    <div className="mx-auto text-5xl font-light text-muted-foreground mb-4">{product.greek}</div>
                                    <h3 className="text-3xl font-bold">{product.name}</h3>
                                    <p className="text-primary font-semibold mt-1">{product.price}</p>
                                </header>
                                <div className="p-0 flex-grow">
                                    <ul className="space-y-3 text-muted-foreground">
                                        {product.features.map(feat => (
                                            <li key={feat} className="flex items-center gap-3 text-sm">
                                                <Check className="h-4 w-4 text-green-500 shrink-0" />
                                                <span className="text-left">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <footer className="p-0 mt-8">
                                    <Button asChild className="w-full">
                                        <Link href="/store">Choisir</Link>
                                    </Button>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedText>
      </Section>

      <Section>
        <AnimatedText className="text-center">
          <h2 className="section-title">Prêt à transformer votre machine ?</h2>
          <p className="section-subtitle">Téléchargez (X)OS ou découvrez la Station X-1, le matériel conçu pour l'exécuter à la perfection.</p>
          <div 
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
              <Button size="lg" asChild className="rounded-full text-lg">
                <Link href="/download">Télécharger (X)OS</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full text-lg">
                <Link href="/hardware">Explorer la Station X-1</Link>
              </Button>
          </div>
        </AnimatedText>
      </Section>
    </>
  );
}

// Helper components
const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <section className={cn("py-24 sm:py-32 md:py-40", className)}>
      {children}
    </section>
  );

const AnimatedText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef(null);
     const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.5"]
    });
    
    return (
        <motion.div ref={ref} style={{ opacity: scrollYProgress, y: useTransform(scrollYProgress, [0, 1], [30, 0])}} className={className}>
            {children}
        </motion.div>
    )
};
