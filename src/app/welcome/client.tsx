
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Sparkles, Layers, Folder, Download, Users, MonitorPlay } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const features = [
    { title: "Un seul OS, trois mondes", description: "Basculez instantanément entre les environnements Windows, macOS et Linux. Profitez du meilleur de chaque système, sans redémarrage, sans compromis.", icon: Layers, videoId: 'wLiwRGYaVnw' },
    { title: "IA au coeur du système", description: "Oria, notre assistant IA, est intégré nativement pour optimiser vos workflows, automatiser les tâches et vous suggérer des idées créatives.", icon: Sparkles, videoId: 'crtsXQdtqbw' },
    { title: "Performances sans précédent", description: "Grâce à une gestion matérielle de bas niveau, (X)OS exploite pleinement la puissance de votre machine pour des rendus et des compilations ultra-rapides.", icon: Cpu, videoId: 'YUEb23FQVhA' },
    { title: "Gestion de fichiers unifiée", description: "Accédez à tous vos fichiers, quel que soit l'OS, depuis un explorateur unique et intelligent qui synchronise tout avec (X)Cloud.", icon: Folder, videoId: 'ozGQ2q4l4ys' },
];

const whoIsItFor = [
    {
        title: "Pour les créatifs",
        description: "Une suite d'outils IA intégrés qui comprennent votre vision et vous aident à la réaliser plus rapidement que jamais.",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1611791485440-24e82b781373?auto=format&fit=crop&w=800&q=80",
        imageHint: "artist painting digital"
    },
    {
        title: "Pour les technophiles",
        description: "Une architecture matérielle et logicielle ouverte, conçue pour la performance et la personnalisation, sans aucune limite.",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?auto=format&fit=crop&w=800&q=80",
        imageHint: "retro computer setup"
    },
    {
        title: "Pour les équipes",
        description: "Des outils collaboratifs natifs et une gestion de projet unifiée pour travailler en parfaite synchronisation, où que vous soyez.",
        icon: Users,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        imageHint: "team collaborating office"
    },
];

// Helper components
const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <section className={cn("py-24 sm:py-32 md:py-40", className)}>
      {children}
    </section>
);

const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
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

function StickyScrollSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);
    const cardScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.9, 0.8]);

    return (
        <div ref={targetRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                 <motion.div style={{ opacity: cardOpacity, scale: cardScale }} className="w-full h-full flex items-center justify-center">
                    {features.map((feature, i) => {
                        const start = i / features.length;
                        const end = (i + 1) / features.length;
                        
                        const opacity = useTransform(scrollYProgress, [start - 0.05, start, start + 0.1, end - 0.1, end], [0, 1, 1, 1, 0]);

                        return (
                            <motion.div
                                key={feature.title + i}
                                style={{ opacity }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <div className="absolute inset-0">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${feature.videoId}?autoplay=1&mute=1&loop=1&playlist=${feature.videoId.split('?')[0]}&controls=0&showinfo=0&autohide=1&wmode=transparent`}
                                        title={feature.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full object-cover scale-[1.5]"
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
                </motion.div>
            </div>
        </div>
    );
}


export default function WelcomeClient() {
    return (
        <>
            {/* Hero Section */}
            <div className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <iframe
                        src="https://www.youtube.com/embed/9Ks_dCYhX4o?si=tjzSrLtkM4EKlje-&t=9&autoplay=1&mute=1&loop=1&playlist=9Ks_dCYhX4o&controls=0&showinfo=0&autohide=1"
                        title="Hero Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full object-cover scale-[1.5]"
                    ></iframe>
                     <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 px-4 space-y-6">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.5)]">
                        (X)OS
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                        L'écosystème créatif. Réinventé.
                        <br/>
                        Découvrez-le en ligne ou téléchargez l'OS complet.
                    </motion.p>
                </div>
            </div>

            <StickyScrollSection />

            <Section>
                <AnimatedSection>
                    <div className="text-center container mx-auto px-6 lg:px-8">
                        <h2 className="text-4xl font-bold tracking-tight text-center md:text-6xl">Conçu pour la nouvelle vague de créateurs.</h2>
                        <p className="mt-4 text-lg text-center text-muted-foreground max-w-2xl mx-auto md:text-xl">Un écosystème qui amplifie vos idées, pas qui les contraint.</p>
                    </div>
                </AnimatedSection>
                <AnimatedSection>
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-6 lg:px-8">
                        {whoIsItFor.map((item, i) => (
                            <div key={i} className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card group">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    data-ai-hint={item.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <div className="p-2 bg-white/10 rounded-lg border border-white/20 mb-3 w-fit backdrop-blur-sm">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold">{item.title}</h3>
                                    <p className="mt-2 text-white/80">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </Section>
            
            {/* Final CTA Section */}
            <Section>
                <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
                    <AnimatedSection className="text-center md:text-left">
                        <div className="inline-block bg-primary/10 p-4 rounded-2xl border border-primary/20 mb-4">
                            <MonitorPlay className="h-10 w-10 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Essayez (X)OS en ligne.</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-xl md:mx-0 mx-auto">
                            Plongez dans notre environnement web interactif. C'est le meilleur moyen de tester la puissance de nos outils IA et de comprendre la philosophie de (X)yzz, sans rien installer.
                        </p>
                        <Button size="lg" asChild className="rounded-full text-lg mt-8">
                            <Link href="/xos">
                                Lancer l'expérience web <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </AnimatedSection>

                    <AnimatedSection className="text-center md:text-left">
                         <div className="inline-block bg-primary/10 p-4 rounded-2xl border border-primary/20 mb-4">
                            <Download className="h-10 w-10 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Passez à la vitesse supérieure.</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-xl md:mx-0 mx-auto">
                           Installez le système d'exploitation complet (X)OS pour libérer des performances inégalées, une intégration matérielle profonde et une créativité sans aucune limite.
                        </p>
                        <Button size="lg" variant="outline" asChild className="rounded-full text-lg mt-8">
                            <Link href="/download">
                                Télécharger l'OS de bureau <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </AnimatedSection>
                </div>
            </Section>
        </>
    );
}
