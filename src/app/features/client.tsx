
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Layers, Sparkles, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PerformanceChart from '@/components/ui/performance-chart';

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <section ref={ref} className={cn("relative container mx-auto px-4 md:px-6 py-24 md:py-36 min-h-screen flex flex-col justify-center", className)}>
             <motion.div style={{ y }}>
                {children}
            </motion.div>
        </section>
    );
}

function AnimatedText({ children, className }: { children: React.ReactNode, className?: string }) {
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
}

const features = [
    { icon: Cpu, title: "Processeur Neural X-Core", description: "Une architecture révolutionnaire qui fusionne CPU, GPU et NPU pour une puissance de calcul inégalée, optimisée pour (X)OS." },
    { icon: Layers, title: "Alliance Multi-OS", description: "Exécutez macOS, Windows et Linux simultanément, sans compromis et sans redémarrage." },
    { icon: Zap, title: "Oria, l'IA d'Orchestration", description: "Un assistant intelligent au cœur du système, qui anticipe vos besoins et automatise vos workflows." },
];

export default function FeaturesClient() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [1, 1, 0, 0]);
    const imageScale = useTransform(scrollYProgress, [0.4, 1], [1, 1.5]);
    const imageOpacity = useTransform(scrollYProgress, [0.4, 0.9, 1], [1, 1, 0]);

    return (
        <div ref={targetRef}>
             {/* Hero Section */}
            <div className="h-[200vh] relative">
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center overflow-hidden">
                    <motion.div 
                         style={{ opacity: textOpacity }}
                         className="relative z-10 px-4 space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground [text-shadow:0_4px_20px_rgba(0,0,0,0.1)]">
                            L'Écosystème (X)yzz.
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto">
                            Une synergie parfaite entre matériel, logiciel et intelligence artificielle pour décupler votre potentiel créatif.
                        </p>
                    </motion.div>
                    <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0">
                         <div className="absolute inset-0 w-full h-full">
                            <Image
                                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80"
                                alt="Station X-1 et X-Book"
                                fill
                                className="object-cover"
                                data-ai-hint="powerful desktop computer sleek laptop"
                            />
                        </div>
                         <div className="absolute inset-0 bg-background/20"></div>
                    </motion.div>
                </div>
            </div>

             {/* Features Section */}
            <Section className="text-center">
                 <AnimatedText>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                       Conçu pour la performance. Pensé pour les créateurs.
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Chaque élément de l'écosystème (X)yzz a été méticuleusement conçu pour fonctionner en harmonie, éliminant les frictions pour laisser place à la pure créativité.
                    </p>
                </AnimatedText>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <AnimatedText key={feature.title}>
                            <div className="glass-card p-6 md:p-8 flex flex-col items-center text-center h-full">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6">
                                    <feature.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-base flex-grow">{feature.description}</p>
                            </div>
                        </AnimatedText>
                    ))}
                </div>
            </Section>

            {/* (X)OS Section */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <AnimatedText className="lg:order-2">
                         <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                           (X)OS. Le chef d'orchestre.
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                            (X)OS est le premier système d'exploitation qui vous permet d'exécuter macOS, Windows et Linux simultanément, sans compromis. Passez d'un environnement à l'autre instantanément, et combinez la puissance de chaque univers au sein d'une interface unifiée et intelligente.
                        </p>
                         <div className="mt-8">
                            <Button size="lg" asChild className="rounded-full text-lg">
                                <Link href="/download">
                                    Télécharger (X)OS <Download className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </AnimatedText>
                    <div className="relative aspect-square lg:order-1">
                         <AnimatedText>
                             <Image
                                src="https://images.unsplash.com/photo-1618423484838-b7a4aa4d8523?auto=format&fit=crop&w=1200&q=80"
                                alt="Interface de (X)OS"
                                fill
                                className="object-contain rounded-2xl"
                                data-ai-hint="futuristic operating system interface"
                            />
                         </AnimatedText>
                    </div>
                </div>
            </Section>

            {/* Hardware Section */}
             <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <AnimatedText>
                         <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                           La Station X-1. La puissance brute.
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                            Conçue pour une synergie parfaite avec (X)OS, la Station X-1 n'est pas un simple ordinateur. C'est une machine optimisée pour les workflows créatifs les plus exigeants, du rendu 3D à la simulation IA.
                        </p>
                         <div className="mt-8">
                            <Button size="lg" variant="outline" asChild className="rounded-full text-lg">
                                <Link href="/hardware">
                                    Découvrir la Station X-1 <Cpu className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </AnimatedText>
                    <div className="relative aspect-square">
                         <AnimatedText>
                             <Image
                                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80"
                                alt="Station de Création X-1"
                                fill
                                className="object-contain"
                                data-ai-hint="powerful computer liquid cooling"
                            />
                         </AnimatedText>
                    </div>
                </div>
            </Section>

             {/* Final CTA Section */}
             <Section className="text-center">
                <AnimatedText>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Prêt à réinventer votre workflow ?
                    </h2>
                     <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button size="lg" asChild className="rounded-full text-lg">
                            <Link href="/store">
                                Explorer la boutique <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </AnimatedText>
            </Section>
        </div>
    );
}
