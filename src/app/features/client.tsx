
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Cpu, Zap, Layers, Folder, Check, ArrowRight, Sparkles, Users, CheckCircle, MonitorPlay, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';

const features = [
    { title: "Un OS, Trois Mondes", description: "Basculez instantanément entre Windows, macOS et Linux. Profitez du meilleur de chaque système, sans redémarrage, sans compromis.", icon: Layers, videoId: 'wLiwRGYaVnw' },
    { title: "IA au Coeur du Système", description: "Oria, notre IA, est intégrée nativement pour optimiser vos workflows, automatiser les tâches et vous suggérer des idées créatives.", icon: Sparkles, videoId: 'crtsXQdtqbw' },
    { title: "Performances Brutes", description: "Grâce à une gestion matérielle de bas niveau, (X)OS exploite la pleine puissance de votre machine pour des rendus et compilations ultra-rapides.", icon: Zap, videoId: 'YUEb23FQVhA' },
    { title: "Gestion de Fichiers Unifiée", description: "Accédez à tous vos fichiers, quel que soit l'OS, depuis un explorateur unique et intelligent synchronisé avec (X)Cloud.", icon: Folder, videoId: 'ozGQ2q4l4ys' },
];

const hardwareProducts = products.filter(p => p.category === 'Matériel' && p.name.startsWith('(X)-'));

function StickyScrollSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isRefReady, setIsRefReady] = useState(false);

    useEffect(() => {
        if (targetRef.current) {
            setIsRefReady(true);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: isRefReady ? targetRef : undefined,
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


export default function FeaturesClient() {
  
  const whoIsItFor = [
    {
        title: "Pour les Créatifs",
        description: "Une suite d'outils IA intégrés qui comprennent votre vision et vous aident à la réaliser plus rapidement que jamais.",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1611791485440-24e82b781373?auto=format&fit=crop&w=800&q=80",
        imageHint: "artist painting digital"
    },
    {
        title: "Pour les Technophiles",
        description: "Une architecture matérielle et logicielle ouverte, conçue pour la performance et la personnalisation, sans aucune limite.",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?auto=format&fit=crop&w=800&q=80",
        imageHint: "retro computer setup"
    },
    {
        title: "Pour les Équipes",
        description: "Des outils collaboratifs natifs et une gestion de projet unifiée pour travailler en parfaite synchronisation, où que vous soyez.",
        icon: Users,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        imageHint: "team collaborating office"
    },
]

  return (
    <>
      <div className="relative h-screen">
          <div className="absolute inset-0 bg-background/80">
             <iframe
                src="https://www.youtube.com/embed/SqJGQ25sc8Q?si=9w2j9L3z5K3y0-fS&autoplay=1&mute=1&loop=1&playlist=SqJGQ25sc8Q&controls=0&showinfo=0&autohide=1"
                title="Hero Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover scale-[1.5]"
            ></iframe>
             <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-7xl md:text-9xl font-bold tracking-tighter"> (X)OS </h1>
              <p className="mt-4 text-xl md:text-2xl max-w-3xl">L'interface directe entre votre imagination et la technologie.</p>
          </div>
      </div>
      
       <StickyScrollSection />

      <Section>
        <AnimatedSection>
            <div className="text-center container mx-auto px-6 lg:px-8">
                <h2 className="section-title">Créativité sans limites.</h2>
                <p className="section-subtitle">Un écosystème conçu pour amplifier vos idées, pas pour les contraindre.</p>
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
      
       <Section>
            <AnimatedSection className="text-center">
                <h2 className="section-title">La création, réinventée.</h2>
                <p className="section-subtitle">
                    Voyez comment notre suite d'outils et notre système d'exploitation unifié transforment votre processus créatif.
                </p>
            </AnimatedSection>
            <AnimatedSection className="mt-16">
                <div className="glass-card p-2 md:p-3 max-w-5xl mx-auto rounded-2xl">
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
            </AnimatedSection>
        </Section>
      
       <Section>
            <AnimatedSection>
                <div className="text-center container mx-auto px-6 lg:px-8">
                    <h2 className="section-title">Explorez la gamme.</h2>
                    <p className="section-subtitle">Des workstations pensées par et pour les créatifs.</p>
                </div>
            </AnimatedSection>
            <div className="mt-20 container mx-auto px-6 lg:px-8 space-y-8">
                {hardwareProducts.map((product, i) => (
                    <AnimatedSection key={product.id}>
                        <div className="glass-card grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-2xl overflow-hidden">
                            <div className="relative aspect-square">
                                <Image 
                                    src={product.images[0]} 
                                    alt={product.name} 
                                    fill 
                                    className="object-contain" 
                                    data-ai-hint={product.hint}
                                />
                            </div>
                            <div className={cn("text-center md:text-left")}>
                                <h3 className="text-4xl md:text-5xl font-bold">{product.name}</h3>
                                <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
                                <div className="mt-8 space-y-3">
                                  {(product.features ?? []).map((feature: string) => (
                                    <div key={feature} className="flex items-center gap-3">
                                      <CheckCircle className="h-5 w-5 text-primary"/>
                                      <span>{feature}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-8 flex gap-4 justify-center md:justify-start">
                                    <Button asChild size="lg" className="rounded-full">
                                        <Link href={`/store/${product.id}`}>Acheter</Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="rounded-full">
                                        <Link href={`/store/${product.id}`}>En savoir plus <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
      </Section>

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
                        Télécharger l'OS <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </AnimatedSection>
        </div>
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
