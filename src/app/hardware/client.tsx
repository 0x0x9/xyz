
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Thermometer, MemoryStick, HardDrive, Layers, Wrench } from 'lucide-react';
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

const performanceData = [
    { name: 'X-1 Station', 'Rendu 3D': 95, 'Compilation de code': 98, 'Simulation IA': 92 },
    { name: 'Mac Pro (équivalent)', 'Rendu 3D': 75, 'Compilation de code': 80, 'Simulation IA': 70 },
    { name: 'PC Haut de Gamme', 'Rendu 3D': 85, 'Compilation de code': 88, 'Simulation IA': 78 },
];

const features = [
    { icon: Cpu, title: "Processeur Neural X-Core", description: "Une architecture révolutionnaire qui fusionne CPU, GPU et NPU pour une puissance de calcul inégalée, optimisée pour (X)OS." },
    { icon: Layers, title: "Alliance Multi-GPU", description: "Combinez la puissance brute des cartes graphiques NVIDIA et AMD. Accélérez vos rendus 3D et vos calculs IA, et profitez d'une expérience de jeu ultime." },
    { icon: MemoryStick, title: "Mémoire Unifiée Adaptative", description: "Jusqu'à 256 Go de RAM ultra-rapide, allouée dynamiquement là où vous en avez besoin, pour une fluidité sans précédent." },
    { icon: Zap, title: "Connectivité Quantique (simulée)", description: "Ports Thunderbolt 5 et Wi-Fi 7 pour des transferts de données à la vitesse de la lumière. Le futur, c'est maintenant." },
];

export default function HardwareClient() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.5]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);


    return (
        <div ref={targetRef}>
             {/* Hero Section */}
            <div className="h-[150vh] relative">
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center overflow-hidden">
                    <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0">
                         <Image
                            src="https://placehold.co/1920x1080.png"
                            alt="Station de Création X-1"
                            fill
                            className="object-cover"
                            quality={100}
                            priority
                            data-ai-hint="powerful desktop computer sleek"
                        />
                         <div className="absolute inset-0 bg-black/30"></div>
                    </motion.div>
                   
                    <motion.div 
                         style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
                         className="relative z-10 px-4 space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.5)]">
                            Station X-1
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                            La puissance n'est que le début.
                        </p>
                         <div className="pt-4 flex flex-wrap justify-center gap-4">
                            <Button size="lg" asChild className="rounded-full text-lg">
                                <Link href="/store/1">
                                    Acheter maintenant <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                             <Button size="lg" asChild className="rounded-full text-lg" variant="outline">
                                <Link href="/store/1">
                                    Configurer votre X-1
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Performance Section */}
            <Section className="text-center">
                <AnimatedText>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Des performances qui défient la réalité.
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                       La Station X-1 a été conçue pour les workflows les plus exigeants. Voyez par vous-même comment elle se mesure à la concurrence.
                    </p>
                </AnimatedText>
                <AnimatedText className="mt-16">
                   <PerformanceChart data={performanceData} />
                </AnimatedText>
            </Section>

             {/* Features Section */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square">
                         <AnimatedText>
                             <Image
                                src="https://placehold.co/800x800.png"
                                alt="Vue éclatée des composants de la Station X-1"
                                fill
                                className="object-contain"
                                data-ai-hint="computer components exploded view"
                            />
                         </AnimatedText>
                    </div>
                    <AnimatedText>
                         <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                           Le Cœur de la Puissance.
                        </h2>
                        <div className="mt-8 space-y-6">
                            {features.map(feature => (
                                <div key={feature.title} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{feature.title}</h3>
                                        <p className="text-muted-foreground mt-1">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedText>
                </div>
            </Section>

            {/* Water Cooling Section */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <AnimatedText className="lg:order-2">
                         <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                           Refroidissement Cryo-Silencieux.
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                            Notre système de refroidissement liquide sub-ambiant maintient des performances maximales dans un silence quasi-absolu. Poussez votre machine à ses limites, elle restera de glace.
                        </p>
                    </AnimatedText>
                    <div className="relative aspect-square lg:order-1">
                         <AnimatedText>
                             <Image
                                src="https://placehold.co/800x800.png"
                                alt="Système de refroidissement liquide de la Station X-1"
                                fill
                                className="object-contain"
                                data-ai-hint="liquid cooling computer"
                            />
                         </AnimatedText>
                    </div>
                </div>
            </Section>

            {/* Upgradability Section */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square">
                         <AnimatedText>
                             <Image
                                src="https://placehold.co/800x800.png"
                                alt="Châssis ouvert de la Station X-1 montrant l'accès aux composants"
                                fill
                                className="object-contain"
                                data-ai-hint="open computer case modular"
                            />
                         </AnimatedText>
                    </div>
                    <AnimatedText>
                         <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                           Conçue pour évoluer avec vous.
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                            Accès sans outils. Composants standards. Pas de soudures propriétaires. La Station X-1 est conçue pour être mise à niveau facilement, garantissant que votre investissement dure dans le temps.
                        </p>
                    </AnimatedText>
                </div>
            </Section>


             {/* Final CTA Section */}
             <Section className="text-center">
                <AnimatedText>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Passez à la vitesse supérieure.
                    </h2>
                     <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button size="lg" asChild className="rounded-full text-lg">
                            <Link href="/store/1">
                                Acheter la Station X-1 <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </AnimatedText>
            </Section>
        </div>
    );
}
