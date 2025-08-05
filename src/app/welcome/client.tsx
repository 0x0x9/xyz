
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu, Sparkles, Layers, Folder, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const features = [
    {
        title: "Un OS. Tous les univers.",
        description: "Basculez instantanément entre les environnements Windows, macOS et Linux. Profitez du meilleur de chaque système, sans redémarrage, sans compromis.",
        icon: Layers,
        videoId: "YUEb23FQVhA"
    },
    {
        title: "Oria, l'IA au coeur du système.",
        description: "Notre assistant IA est intégré nativement pour optimiser vos workflows, automatiser les tâches et vous suggérer des idées créatives.",
        icon: Sparkles,
        videoId: "crtsXQdtqbw"
    },
    {
        title: "Performances sans précédent.",
        description: "Grâce à une gestion matérielle de bas niveau, (X)OS exploite pleinement la puissance de votre machine pour des rendus et des compilations ultra-rapides.",
        icon: Cpu,
        videoId: "wLiwRGYaVnw"
    },
    {
        title: "Gestion de fichiers unifiée.",
        description: "Accédez à tous vos fichiers, quel que soit l'OS, depuis un explorateur unique et intelligent qui synchronise tout avec (X)Cloud.",
        icon: Folder,
        videoId: "ozGQ2q4l4ys"
    },
];

export default function WelcomeClient() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

    // This effect maps scroll progress to the active feature
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            const index = Math.min(Math.floor(latest * features.length), features.length - 1);
            setActiveFeatureIndex(index);
        });
    }, [scrollYProgress]);

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
                        Ce n’est pas un système d’exploitation. <br/> C’est une extension de votre créativité.
                    </motion.p>
                </div>
            </div>

            {/* Sticky Features Section */}
            <div ref={targetRef} className="h-[400vh] relative">
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        {features.map((feature, index) => {
                             if (index === activeFeatureIndex) {
                                return (
                                    <motion.div
                                        key={feature.videoId}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <div className="absolute inset-0 w-full h-full">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${feature.videoId}?autoplay=1&mute=1&loop=1&playlist=${feature.videoId}&controls=0&showinfo=0&autohide=1`}
                                                title={feature.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full object-cover scale-[1.5]"
                                            ></iframe>
                                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                                        </div>
                                         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-8">
                                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 mb-6">
                                                <feature.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{feature.title}</h2>
                                            <p className="text-lg md:text-xl text-white/80 max-w-2xl">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            }
                            return null;
                        })}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Final CTA Section */}
            <div className="h-screen flex flex-col items-center justify-center text-center relative px-4">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    Prêt à réinventer votre workflow ?
                </h2>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Découvrez l'écosystème complet en essayant (X)OS en ligne, ou téléchargez-le pour transformer votre machine.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <Button size="lg" asChild className="rounded-full text-lg">
                        <Link href="/xos">
                            Essayer (X)OS en ligne <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                     <Button size="lg" variant="outline" asChild className="rounded-full text-lg">
                        <Link href="/download">
                            Télécharger (X)OS <Download className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
