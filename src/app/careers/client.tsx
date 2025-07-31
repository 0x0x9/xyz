
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Check, Code, Palette, Cpu, Megaphone, Send, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const jobOpenings = [
  {
    id: 'software-engineer',
    title: 'Ingénieur logiciel / systèmes',
    icon: Code,
    description: "Le software, systèmes embarqués, sécurité… Vous aimez coder propre, penser architecture et optimiser les performances ? Ce poste est taillé pour vous.",
    requirements: [
      "Maîtrise des langages de programmation (C/C++, Rust, Python ou autres)",
      "Bonne compréhension des systèmes d’exploitation et architectures matérielles",
      "Connaissance en sécurité informatique, drivers, gestion mémoire, etc.",
      "Capacité à concevoir des architectures logicielles robustes",
      "Expérience avec Git, CI/CD",
    ],
  },
  {
    id: 'ux-ui-designer',
    title: 'UX/UI Designer',
    icon: Palette,
    description: "Vous savez allier esthétique et fonctionnalité, transformer l’abstrait en expérience fluide, et donner une âme à une interface.",
    requirements: [
      "Maîtrise des outils de design (Figma, Sketch, Adobe XD…)",
      "Sens fort de l’esthétique et de l’ergonomie",
      "Capacité à concevoir des interfaces intuitives et cohérentes",
      "Compréhension du design système et des contraintes techniques",
      "Création de prototypes interactifs",
    ],
  },
  {
    id: 'hardware-specialist',
    title: 'Spécialiste Hardware',
    icon: Cpu,
    description: "L’optimisation, l’assemblage, la conception matérielle n'ont aucun secret pour vous ? Venez donner corps à nos idées.",
    requirements: [
      "Connaissances solides en électronique, architecture CPU/GPU, etc.",
      "Expérience avec la conception, l’assemblage et la validation de prototypes",
      "Compétences en test, diagnostic, débogage matériel",
      "Maîtrise d’outils comme Altium Designer, Eagle ou équivalent",
      "Goût pour l’expérimentation et la recherche de performance",
    ],
  },
    {
    id: 'communicator',
    title: 'Communicant',
    icon: Megaphone,
    description: "Stratèges, créateurs de contenu, experts en branding, RP ou marketing digital… on veut que le monde entier entende parler de (X)yzz.",
    requirements: [
      "Excellentes capacités rédactionnelles et storytelling",
      "Maîtrise des canaux numériques (réseaux sociaux, newsletters, SEO/SEA)",
      "Création de contenus engageants (vidéo, visuel, blog…)",
      "Connaissance des outils de suivi (Analytics, CRM…)",
      "Capable de créer une voix singulière pour (X)yzz.",
    ],
  },
];

const whyUsPoints = [
  { title: "Impact", description: "Des projets qui ont du sens, tournés vers l’avenir de la création numérique." },
  { title: "Innovation", description: "L’opportunité de bousculer les standards établis." },
  { title: "Culture", description: "Une équipe à taille humaine, bienveillante et ambitieuse où vos idées comptent vraiment." },
];

export default function CareersClient() {
    const { toast } = useToast();
    const [cvFile, setCvFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Candidature Envoyée !",
            description: "Merci pour votre intérêt. Nous reviendrons vers vous très prochainement.",
        });
        e.currentTarget.reset();
        setCvFile(null);
    };

  return (
    <>
      {/* Intro Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Rejoindre (X)yzz.
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          La révolution créative dans la tech ! 🎨 Chez (X)yzz., on ne suit pas les tendances, on les crée. Nous recherchons des talents passionnés, un brin rebelles, et prêts à façonner le futur avec nous.
        </p>
      </motion.section>

      {/* Why Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="my-24 md:my-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyUsPoints.map((point, index) => (
            <div key={index} className="text-center p-6">
              <h3 className="text-2xl font-bold text-primary">{point.title}</h3>
              <p className="text-muted-foreground mt-2">{point.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Openings Section */}
      <div id="openings" className="space-y-8">
        {jobOpenings.map((job, index) => (
            <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <Card className="glass-card overflow-hidden">
                    <CardContent className="p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-1">
                            <job.icon className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-2xl font-bold">{job.title}</h3>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <p className="text-muted-foreground">{job.description}</p>
                            <ul className="space-y-2">
                                {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>{req}</span>
                                </li>
                                ))}
                            </ul>
                            <Button asChild variant="outline">
                                <a href="#apply-form">Postuler <ArrowDown className="ml-2 h-4 w-4"/></a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ))}
      </div>

       {/* Apply Form Section */}
      <motion.section
        id="apply-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-24 md:mt-32 max-w-4xl mx-auto"
      >
          <Card className="glass-card p-8 md:p-12">
            <CardHeader className="text-center p-0 mb-8">
                <CardTitle className="text-3xl md:text-4xl">Prêt·e à rejoindre l’aventure ?</CardTitle>
                <CardDescription>Écrivez-nous et montrez-nous ce que vous avez dans le ventre.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2"><Label htmlFor="firstname">Prénom</Label><Input id="firstname" name="firstname" required /></div>
                        <div className="space-y-2"><Label htmlFor="lastname">Nom de famille</Label><Input id="lastname" name="lastname" required /></div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" name="email" required /></div>
                        <div className="space-y-2"><Label htmlFor="phone">Téléphone</Label><Input id="phone" name="phone" type="tel" /></div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="position">Poste auquel vous postulez</Label>
                            <Select name="position" required>
                                <SelectTrigger id="position"><SelectValue placeholder="Choisir le poste" /></SelectTrigger>
                                <SelectContent>
                                    {jobOpenings.map(job => <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>)}
                                    <SelectItem value="spontaneous">Candidature spontanée</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="start-date">Date de début possible</Label>
                            <Input id="start-date" name="start-date" type="date" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cv">Votre CV</Label>
                        <Input id="cv" name="cv" type="file" required accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="hidden" />
                        <label htmlFor="cv" className="w-full flex items-center gap-2 p-3 rounded-lg border-2 border-dashed border-border cursor-pointer hover:border-primary hover:bg-primary/10">
                            <Paperclip className="h-5 w-5 text-muted-foreground" />
                            <span className="text-muted-foreground">{cvFile ? cvFile.name : "Cliquez pour choisir un fichier"}</span>
                        </label>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Un petit mot pour nous (optionnel)</Label>
                        <Textarea id="message" name="message" placeholder="Pourquoi nous ? Pourquoi vous ?" rows={4}/>
                    </div>
                    <div className="text-center pt-4">
                        <Button type="submit" size="lg">
                            <Send className="mr-2 h-5 w-5" />
                            Envoyer ma candidature
                        </Button>
                    </div>
                </form>
            </CardContent>
          </Card>
      </motion.section>
    </>
  );
}
