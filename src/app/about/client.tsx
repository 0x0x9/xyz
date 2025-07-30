
'use client';

import { motion } from 'framer-motion';
import { Users, Target, Zap, Heart, Calendar, Send, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const teamMembers = [
  { name: 'Démon François', role: 'Fondateur & CEO', avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80', hint: 'man portrait, professional, apple style' },
  { name: 'Alfred Sisley', role: 'Directrice de la Technologie (CTO)', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80', hint: 'woman portrait, professional, apple style' },
  { name: 'Ziari Kamal', role: 'Chef du Design (CDO)', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80', hint: 'man portrait, creative, apple style' },
  { name: 'Chloé Martin', role: 'Responsable Communauté', avatar: 'https://images.unsplash.com/photo-1519340333755-c6e2a6a1b49a?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80', hint: 'woman portrait, friendly, apple style' },
];

const values = [
  { icon: Lightbulb, title: 'Innovation Disruptive', description: "Nous repoussons constamment les frontières de la technologie pour bâtir des outils d'une puissance inégalée." },
  { icon: Users, title: 'Esprit Communautaire', description: 'Notre écosystème est façonné par et pour les créateurs. Le partage et la collaboration sont au cœur de notre identité.' },
  { icon: Heart, title: 'Excellence Inébranlable', description: 'De la conception matérielle au développement logiciel, chaque détail est méticuleusement pensé pour une expérience créative sans compromis.' },
];

export default function AboutClient() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-28 md:py-36 space-y-24 md:space-y-32">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Façonner l'Avenir de la Création Numérique.
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          (X)yzz.ai est né d'une conviction profonde : les créateurs méritent un écosystème où leurs outils ne sont plus une contrainte, mais une véritable extension de leur génie inventif.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-card p-4">
              <Image src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Notre mission" fill className="object-contain" data-ai-hint="creative team collaboration, apple style, modern office" />
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                <Target className="h-4 w-4" />
                Notre Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Unir et Amplifier la Créativité.</h2>
              <p className="text-muted-foreground text-lg">
                Notre mission est d'éradiquer les silos entre les logiciels, le matériel et la collaboration. Nous forgeons un écosystème intelligent et sans couture, permettant à chaque créateur, quel que soit son domaine, de transformer sans effort l'idée en réalité, optimisé par une intelligence artificielle qui comprend et anticipe ses besoins.
              </p>
            </div>
          </div>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Nos Valeurs Fondamentales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="glass-card text-center p-6">
              <div className="mx-auto w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 mb-4">
                <value.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-muted-foreground mt-2">{value.description}</p>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">L'Équipe Pionnière de (X)yzz.ai</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-card p-6 flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </Card>
          ))}
        </div>
      </motion.section>

       <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="glass-card bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold">Prêt à Révolutionner Votre Création ?</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">Découvrez comment (X)yzz.ai peut propulser votre entreprise ou votre processus créatif vers de nouveaux sommets.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                    <Button asChild size="lg" className="rounded-full">
                        <Link href="/demo"><Calendar className="mr-2 h-5 w-5"/>Réserver une démo</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full">
                        <Link href="/contact"><Send className="mr-2 h-5 w-5"/>Contacter l'équipe</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
