'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BrainCircuit, Wand2, Zap, Film, Image as ImageIcon, Layers, Cpu, Sparkles, Download, Apple, AppWindow, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUIState } from '@/hooks/use-ui-state';

function FeatureCard({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
    const Icon = icon;
    return (
        <div className="glass-card p-6 md:p-8 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6">
                <Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground text-base flex-grow">{description}</p>
        </div>
    );
}

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

export default function WelcomeClient() {
    const { isBannerVisible } = useUIState();
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

    const features = [
        { icon: Zap, title: "(X)fusion", description: "Votre toile créative unifiée. Combinez les outils pour un workflow sans limites." },
        { icon: BrainCircuit, title: "Maestro", description: "Orchestrez vos projets de A à Z avec l'aide de l'IA." },
        { icon: Wand2, title: "(X)flux", description: "Transformez une simple idée en un projet complet et structuré." },
        { icon: Layers, title: "(X)brand", description: "Définissez une identité de marque cohérente, des couleurs à la voix." },
        { icon: Film, title: "(X)motion", description: "Générez des scripts et des storyboards vidéo en quelques secondes." },
        { icon: ImageIcon, title: "Image IA", description: "Créez des visuels époustouflants à partir d'une simple description textuelle." },
    ];

    return (
        <div ref={targetRef}>
            
            {/* Hero Section */}
            <div className="h-[200vh] relative">
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center overflow-hidden">
                    <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0">
                        <iframe
                            src="https://www.youtube.com/embed/-JAjrFVGCgw?autoplay=1&mute=1&loop=1&playlist=-JAjrFVGCgw&controls=0&showinfo=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="object-cover w-full h-full"
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0,
                                color: 'transparent'
                            }}
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                    </motion.div>
                   
                    <motion.div 
                         style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
                         className="relative z-10 px-4 space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.5)]">
                           L’élégance d’un outil, <br/>la puissance d’un studio.
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                           Plongez dans l'ère de la polyvalence et de la performance sans compromis. (X)OS est une révolution pour décupler votre créativité.
                        </p>
                         <div className="pt-4 flex flex-wrap justify-center gap-4">
                            <Button size="lg" asChild className="rounded-full text-lg">
                                <Link href="/xos">
                                    Découvrir (X)OS en ligne <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="rounded-full text-lg">
                                <Link href="/download">
                                    Télécharger pour Desktop <Download className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Hardware Section */}
             <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <AnimatedText>
                         <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                           Le matériel réinventé pour la création.
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                            La Station de Création X-1 n'est pas un simple ordinateur. C'est une machine conçue pour une seule chose : libérer votre potentiel. Chaque composant est optimisé pour (X)OS, créant une synergie parfaite entre le matériel et le logiciel.
                        </p>
                         <div className="mt-8">
                            <Button size="lg" asChild className="rounded-full text-lg">
                                <Link href="/hardware">
                                    Découvrir le matériel <Cpu className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </AnimatedText>
                    <div className="relative aspect-square">
                         <AnimatedText>
                             <Image
                                src="https://placehold.co/800x800.png"
                                alt="Station de Création X-1"
                                fill
                                className="object-contain"
                                data-ai-hint="powerful desktop computer"
                            />
                         </AnimatedText>
                    </div>
                </div>
            </Section>

            {/* Multi-OS Section */}
            <Section className="text-center">
                <AnimatedText>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        L'harmonie entre Windows et macOS.
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        (X)OS est le premier système d'exploitation qui vous permet d'exécuter macOS, Windows et Linux simultanément, sans compromis. Travaillez sans contrainte : vos projets et outils s’ouvrent sur votre machine, avec synchronisation de vos espaces via le cloud.
                    </p>
                </AnimatedText>
                <AnimatedText className="mt-16">
                    <Image 
                        src="https://placehold.co/1200x600.png"
                        alt="Illustration de plusieurs systèmes d'exploitation fonctionnant ensemble"
                        width={1200}
                        height={600}
                        className="rounded-2xl mx-auto"
                        data-ai-hint="multiple operating systems interface"
                    />
                </AnimatedText>
            </Section>

            {/* AI Core Section */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square">
                         <AnimatedText>
                             <Image
                                src="https://placehold.co/800x800.png"
                                alt="Illustration de l'IA Oria"
                                fill
                                className="object-contain"
                                data-ai-hint="abstract AI core"
                            />
                         </AnimatedText>
                    </div>
                    <AnimatedText>
                         <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                           Oria. L'IA au cœur de votre écosystème.
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                            (X)cloud n'est pas qu'un simple espace de stockage. C'est un espace de travail intelligent où Oria, notre IA d'orchestration, comprend vos objectifs, anticipe vos besoins et synchronise vos projets entre (X)OS natif et (X)OS en ligne.
                        </p>
                         <div className="mt-8">
                            <Button size="lg" asChild className="rounded-full text-lg" variant="outline">
                                <Link href="/xos?open=oria">
                                    Discuter avec Oria <Sparkles className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </AnimatedText>
                </div>
            </Section>
            
            {/* Video Section */}
            <Section>
                <AnimatedText className="text-center">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        La création, réinventée.
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Voyez comment notre suite d'outils et notre système d'exploitation unifié transforment votre processus créatif.
                    </p>
                </AnimatedText>
                <AnimatedText className="mt-16">
                    <div className="glass-card p-2 md:p-3 max-w-6xl mx-auto rounded-2xl">
                        <div className="aspect-video w-full">
                            <iframe
                            src="https://www.youtube.com/embed/SqJGQ25sc8Q?si=279cRsOPl_dffifa&autoplay=1&mute=1&loop=1&playlist=SqJGQ25sc8Q&controls=0&showinfo=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                            ></iframe>
                        </div>
                    </div>
                </AnimatedText>
            </Section>

            {/* Features Section */}
            <Section className="text-center">
                 <AnimatedText>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        (X)OS en ligne. <br/>La puissance créative, partout.
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Accédez à notre suite complète d'outils créatifs IA depuis n'importe quel navigateur. Votre projet vous suit partout, synchronisé en temps réel avec votre station de travail grâce à (X)cloud.
                    </p>
                </AnimatedText>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <AnimatedText key={i}>
                            <FeatureCard {...feature} />
                        </AnimatedText>
                    ))}
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
                            <Link href="/xos">
                                Essayer (X)OS en ligne <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                         <Button size="lg" variant="outline" asChild className="rounded-full text-lg">
                            <Link href="/hardware">
                                Découvrir le matériel <Cpu className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </AnimatedText>
            </Section>
        </div>
    );
}
