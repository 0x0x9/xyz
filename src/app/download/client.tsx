
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Cpu, Sparkles, Layers, Cloud, Apple, AppWindow, Terminal, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type OS = 'macOS' | 'Windows' | 'Linux' | 'Inconnu' | 'Serveur';

function getOS(): OS {
    if (typeof window === 'undefined') return 'Inconnu';
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Win")) return "Windows";
    if (userAgent.includes("Linux")) return "Linux";
    return 'Inconnu';
}

function AnimatedText({ text, el: Wrapper = 'p', className, stagger = 0.02 }: { text: string, el?: React.ElementType, className?: string, stagger?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
    };

    return (
        <Wrapper ref={ref} className={className}>
            <motion.span
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                aria-label={text}
            >
                {words.map((word, index) => (
                    <motion.span key={index} variants={wordVariants} className="inline-block mr-[0.25em]">
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </Wrapper>
    );
}

const features = [
    { icon: Layers, title: "Design Ultra Fluide", description: "Une interface en verre liquide inspirée de visionOS, où chaque élément glisse et interagit de manière naturelle." },
    { icon: Sparkles, title: "Oria Intégrée", description: "L'assistant IA qui vous accompagne dans tous vos flux créatifs, du bureau à vos serveurs." },
    { icon: Cpu, title: "Performance Multi-Tâche", description: "Optimisé pour les GPU IA et le multitâche créatif, (X)OS exploite toute la puissance de votre machine." },
    { icon: Cloud, title: "Connexion Native à (X)cloud", description: "Synchronisation automatique, prévisualisation locale et collaboration en temps réel sur tous vos projets." },
];

const testimonials = [
  { author: "Alexandre D.", role: "Motion Designer", quote: "Oria a suggéré une palette de couleurs que je n'aurais jamais imaginée. C'est comme avoir un directeur artistique personnel." },
  { author: "Juliette L.", role: "Développeuse Full-Stack", quote: "Passer d'un rendu 3D sous Windows à mon IDE sous Linux sans rebooter... (X)OS a changé ma façon de travailler." },
  { author: "Studio Anima", role: "Studio d'Animation", quote: "La gestion des ressources via (X)cloud et l'intégration des outils IA ont réduit notre temps de production de 20%." },
];

function DownloadModal({ os, icon: Icon, type, children }: { os: OS | 'Serveur', icon: React.ElementType, type: string, children: React.ReactNode }) {
    const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="glass-card max-w-lg text-center p-8">
                <DialogHeader className="space-y-4">
                     <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <DialogTitle className="text-3xl font-bold">Téléchargement pour {os}</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-base">
                        Pour optimiser votre installation, veuillez nous indiquer sur quelle machine vous allez installer (X)OS.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-6 text-left">
                    <RadioGroup value={selectedMachine ?? ""} onValueChange={setSelectedMachine} className="space-y-3">
                        <Label htmlFor={`station-x1-${os}`} className="flex items-center gap-4 p-4 rounded-xl border-2 border-transparent has-[:checked]:border-primary bg-background/50 cursor-pointer transition-all duration-300 has-[:checked]:bg-primary/10 has-[:checked]:ring-2 has-[:checked]:ring-primary/50">
                            <div>
                                <p className="font-semibold">Station X-1</p>
                                <p className="text-xs text-muted-foreground">Recommandé pour des performances maximales.</p>
                            </div>
                            <RadioGroupItem value="station-x1" id={`station-x1-${os}`} className="ml-auto" />
                        </Label>
                         <Label htmlFor={`x-book-${os}`} className="flex items-center gap-4 p-4 rounded-xl border-2 border-transparent has-[:checked]:border-primary bg-background/50 cursor-pointer transition-all duration-300 has-[:checked]:bg-primary/10 has-[:checked]:ring-2 has-[:checked]:ring-primary/50">
                            <div>
                                <p className="font-semibold">X-Book (Laptop)</p>
                                <p className="text-xs text-muted-foreground">Pour une expérience optimisée en mobilité.</p>
                            </div>
                             <RadioGroupItem value="x-book" id={`x-book-${os}`} className="ml-auto" />
                        </Label>
                        <Label htmlFor={`other-${os}`} className="flex items-center gap-4 p-4 rounded-xl border-2 border-transparent has-[:checked]:border-primary bg-background/50 cursor-pointer transition-all duration-300 has-[:checked]:bg-primary/10 has-[:checked]:ring-2 has-[:checked]:ring-primary/50">
                            <div>
                                <p className="font-semibold">Autre matériel</p>
                                <p className="text-xs text-muted-foreground">Pour les PC, Mac ou serveurs non-(X)yzz.</p>
                            </div>
                            <RadioGroupItem value="other" id={`other-${os}`} className="ml-auto" />
                        </Label>
                    </RadioGroup>
                </div>
                 <Button size="lg" className="w-full" disabled={!selectedMachine} onClick={() => alert(`Lancement du téléchargement ${type} pour ${selectedMachine}... (Simulation)`)}>
                    <Download className="mr-2 h-5 w-5" />
                    Démarrer le téléchargement
                 </Button>
            </DialogContent>
        </Dialog>
    );
}

const scenes = [
    { 
      id: 'hero',
      videoId: 'YUEb23FQVhA',
      content: (
        <div className="relative z-10 px-4 space-y-6 text-center">
            <AnimatedText text="Design. Intelligence. Fluidité." el="h1" className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.5)]" />
            <AnimatedText text="L’expérience créative ultime sur votre machine. (X)OS vous connecte au cœur de l’écosystème IA : design, dev, production." el="p" className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]" stagger={0.01} />
        </div>
      )
    },
    {
      id: 'features',
      videoId: 'wLiwRGYaVnw',
      content: (
        <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <div className="glass-card p-6 md:p-8 flex flex-col items-center text-center h-full">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6">
                                <feature.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-base flex-grow">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      )
    },
    { 
      id: 'download',
      videoId: '9Ks_dCYhX4o',
      content: ({ detectedOS }: { detectedOS: OS }) => {
        const downloadOptions: { os: OS | 'Serveur'; icon: React.ElementType, type: string, compatible: string }[] = [
            { os: 'Windows', icon: AppWindow, type: '(EXE)', compatible: 'Compatible Win 11' },
            { os: 'macOS', icon: Apple, type: '(DMG)', compatible: 'Support ARM & Intel' },
            { os: 'Serveur', icon: Terminal, type: '(CLI)', compatible: 'Version headless & orchestrateur IA' },
        ];
        return (
            <div className="text-center container mx-auto px-4 md:px-6">
                <AnimatedText text="Prêt à transformer votre machine ?" el="h2" className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70" />
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {downloadOptions.map((opt) => (
                        <DownloadModal key={opt.os} os={opt.os} icon={opt.icon} type={opt.type}>
                            <motion.div 
                                className="glass-card p-8 text-center flex flex-col items-center cursor-pointer group"
                                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(var(--primary-rgb), 0.25)" }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <opt.icon className="h-16 w-16 mb-4 text-foreground transition-colors duration-300 group-hover:text-primary" />
                                <h3 className="text-2xl font-bold">{opt.os}</h3>
                                <p className="text-sm text-muted-foreground mb-6">{opt.compatible}</p>
                                <Button className="mt-auto w-full transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                                    Télécharger {opt.type}
                                    <span className="ml-2 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs group-hover:bg-primary-foreground group-hover:text-primary">Beta</span>
                                </Button>
                                {detectedOS === opt.os && <p className="text-xs text-primary mt-3">Version recommandée</p>}
                            </motion.div>
                        </DownloadModal>
                    ))}
                </div>
            </div>
        );
      }
    },
    { 
      id: 'testimonials',
      videoId: 'SqJGQ25sc8Q',
      content: (
        <div className="container mx-auto px-4 md:px-6">
            <AnimatedText text="Ce que les créateurs disent de (X)OS" el="h2" className="text-center text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                    >
                        <div className="glass-card p-8 h-full flex flex-col">
                            <p className="text-muted-foreground italic flex-grow">"{testimonial.quote}"</p>
                            <div className="mt-6">
                                <p className="font-semibold">{testimonial.author}</p>
                                <p className="text-sm text-primary">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      )
    },
];

export default function DownloadClient() {
    const [detectedOS, setDetectedOS] = useState<OS>('Inconnu');
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    const activeSceneIndex = useTransform(
        scrollYProgress,
        scenes.map((_, i) => i / (scenes.length -1)),
        scenes.map((_, i) => i)
    );
    
    useEffect(() => {
        setDetectedOS(getOS());
    }, []);

    return (
        <div ref={targetRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {scenes.map((scene, i) => {
                    const opacity = useTransform(
                        activeSceneIndex,
                        [i - 0.5, i, i + 0.5],
                        [0, 1, 0]
                    );

                    return (
                        <motion.div
                            key={scene.id}
                            style={{ opacity }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <div className="absolute inset-0">
                                <iframe
                                    src={`https://www.youtube.com/embed/${scene.videoId}?autoplay=1&mute=1&loop=1&playlist=${scene.videoId}&controls=0&showinfo=0&autohide=1&wmode=transparent`}
                                    title={scene.id}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full object-cover scale-[1.5]"
                                ></iframe>
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                            </div>
                            <div className="relative z-10 w-full">
                                {typeof scene.content === 'function' ? scene.content({ detectedOS }) : scene.content}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
