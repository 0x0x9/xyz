
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Cpu, Wand2, Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const advantages = [
    {
        icon: Layers,
        title: "Unification Multi-OS Révolutionnaire",
        description: "Exécutez Windows, macOS et Linux simultanément, sans redémarrage. Passez d'un logiciel à l'autre en toute transparence et combinez leurs forces uniques dans un seul workflow fluide.",
        videoId: "wLiwRGYaVnw"
    },
    {
        icon: Wand2,
        title: "De l'Idée au Projet en Quelques Secondes",
        description: "(X)flux, notre IA d'orchestration, transforme une simple pensée en un plan d'action complet avec tous les livrables nécessaires. Un gain de productivité et de créativité inégalé.",
        videoId: "crtsXQdtqbw"
    },
    {
        icon: Cpu,
        title: "Synergie Matériel-Logiciel Totale",
        description: "Notre matériel, comme la Station X-1, est conçu en parfaite symbiose avec (X)OS. Cette intégration verticale garantit des performances brutes et une stabilité à toute épreuve.",
        videoId: "YUEb23FQVhA"
    },
];

const comparisonData = [
    {
        feature: "Gestion des OS",
        xyzz: "Fusion de Windows, macOS & Linux sans redémarrage.",
        competitors: "Un seul OS par machine ou dual-boot complexe."
    },
    {
        feature: "Rôle de l'IA",
        xyzz: "Chef d'orchestre intégré au cœur du système.",
        competitors: "Ensemble d'outils IA séparés et non connectés."
    },
    {
        feature: "Workflow de Projet",
        xyzz: "Génération de projet complet à partir d'une seule idée.",
        competitors: "Assemblage manuel de multiples services et logiciels."
    },
    {
        feature: "Optimisation",
        xyzz: "Synergie matérielle et logicielle pour des performances maximales.",
        competitors: "Logiciels génériques sur du matériel non optimisé."
    }
];

export default function AvantegesClient() {

    return (
        <div className="space-y-24 md:space-y-36 pt-24">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 md:px-6 text-center"
            >
                <div className="inline-block bg-primary/10 p-4 rounded-2xl border border-primary/20 mb-4">
                    <Zap className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    La Différence (X)yzz.
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                    Nous ne créons pas seulement des outils. Nous bâtissons un écosystème unifié qui redéfinit ce qu'il est possible de créer. Voici pourquoi (X)yzz.ai est le choix des créatifs qui visent l'exception.
                </p>
            </motion.section>

            <section className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {advantages.map((advantage, index) => (
                        <motion.div
                            key={advantage.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                        >
                            <Card className="glass-card h-full flex flex-col text-center items-center p-8">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6">
                                    <advantage.icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">{advantage.title}</CardTitle>
                                <CardDescription className="mt-2 flex-grow">{advantage.description}</CardDescription>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
            
            <section className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Face à Face : (X)yzz vs. Le Reste
                    </h2>
                     <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                        Voici un aperçu de la manière dont notre approche intégrée surpasse les workflows traditionnels et fragmentés.
                    </p>
                </div>
                
                 <div className="max-w-4xl mx-auto space-y-4">
                    {comparisonData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="glass-card overflow-hidden">
                                <CardHeader className="bg-muted/20 p-4">
                                    <CardTitle className="text-lg">{item.feature}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="p-6 border-b md:border-b-0 md:border-r border-border">
                                            <h4 className="font-semibold text-primary mb-2">(X)yzz.ai</h4>
                                            <p className="text-muted-foreground">{item.xyzz}</p>
                                        </div>
                                         <div className="p-6 bg-black/10">
                                            <h4 className="font-semibold text-muted-foreground/80 mb-2">Les Autres Solutions</h4>
                                            <p className="text-muted-foreground/70">{item.competitors}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
            
            <section className="container mx-auto px-4 md:px-6 text-center">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Prêt à faire le saut ?
                    </h2>
                     <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                        Arrêtez de jongler entre les outils. Unifiez votre créativité.
                    </p>
                     <Button asChild size="lg" className="mt-8 rounded-full">
                        <Link href="/features">
                            Explorez l'écosystème en détail
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                 </motion.div>
            </section>

        </div>
    );
}
