
'use client';

import { useState, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { fluxAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

import type { GenerateFluxOutput } from '@/ai/types';
import { Wand2, Sparkles, Loader, BrainCircuit, Palette, Mic, Users, Lightbulb, Presentation, LayoutTemplate, FileText, Film, Network, Code2, Calendar, ArrowRight, CheckCircle, RefreshCcw, BookOpen } from 'lucide-react';
import { LoadingState } from './loading-state';
import AiLoadingAnimation from './ui/ai-loading-animation';

interface FluxGeneratorProps {
    prompt?: string;
    job?: string;
    initialResult?: GenerateFluxOutput;
    openApp?: (appId: string, props?: Record<string, any>) => void;
}


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="h-12 text-base">
      {pending ? (
        <>
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Lancement du Flux...
        </>
      ) : (
        <>
          Lancer (X)flux
          <Wand2 className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}

const LoadingDisplay = () => (
    <div className="text-center mt-12">
        <h2 className="text-3xl font-bold">Votre projet prend forme...</h2>
        <p className="text-muted-foreground mt-2">(X)flux analyse votre demande et sélectionne les meilleurs outils.</p>
        <div className="relative w-64 h-64 mx-auto mt-8">
            <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full border-4 border-dashed border-primary/20 rounded-full"
                />
            </div>
             <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 flex items-center justify-center"
            >
                <div className="w-full h-full border-4 border-primary/30 rounded-full" />
            </motion.div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Wand2 className="h-16 w-16 text-primary animate-pulse" />
            </div>
        </div>
    </div>
);

const toolInfoMap = {
    projectPlan: { icon: BrainCircuit, name: 'Plan de projet (Maestro)' },
    palette: { icon: Palette, name: 'Palette de couleurs' },
    tone: { icon: Mic, name: 'Guide de style (Tone)' },
    personas: { icon: Users, name: 'Personas Utilisateurs' },
    ideas: { icon: Lightbulb, name: 'Idées & Concepts' },
    deck: { icon: Presentation, name: 'Présentation (Deck)' },
    frame: { icon: LayoutTemplate, name: 'Maquette de Page (Frame)' },
    text: { icon: FileText, name: 'Contenu Rédactionnel' },
    motion: { icon: Film, name: 'Script Vidéo (Motion)' },
    nexus: { icon: Network, name: 'Carte Mentale (Nexus)' },
    code: { icon: Code2, name: 'Snippet de Code' },
    agenda: { icon: Calendar, name: 'Événements (Agenda)' },
};

function ResultsDisplay({ result, prompt, onReset, openApp }: { result: GenerateFluxOutput, prompt: string, onReset: () => void, openApp?: FluxGeneratorProps['openApp'] }) {
    const router = useRouter();
    const { toast } = useToast();

    const handleOpenInXOS = async () => {
        if (openApp) {
             const appMapping: { [key in keyof GenerateFluxOutput]?: string } = {
                projectPlan: 'maestro', personas: 'persona', ideas: 'promptor', deck: 'deck',
                frame: 'editor', text: 'editor', motion: 'motion', nexus: 'nexus',
                code: 'code', agenda: 'agenda',
            };

            const appsToOpen: {appId: string, props: any}[] = [];

            if (result.palette || result.tone) {
                appsToOpen.push({ appId: 'brand-identity', props: { initialPalette: result.palette, initialTone: result.tone, prompt: result.projectPlan?.creativeBrief } });
            }
            
            for (const key in result) {
                const typedKey = key as keyof GenerateFluxOutput;
                if (typedKey !== 'palette' && typedKey !== 'tone' && result[typedKey] && appMapping[typedKey]) {
                    const appId = appMapping[typedKey]!;
                    let props: Record<string, any> = { prompt: result.projectPlan?.creativeBrief };

                    if (typedKey === 'frame') props = { initialProjectCodes: { html: result.frame!.htmlCode, css: result.frame!.cssCode, js: result.frame!.jsCode }};
                    else if (typedKey === 'text') props = { initialFile: { code: result.text!.text, language: 'markdown' } };
                    else props = { initialResult: result[typedKey] };

                    appsToOpen.push({ appId, props });
                }
            }
            
            for (const app of appsToOpen) {
                await new Promise(resolve => setTimeout(resolve, 200));
                openApp(app.appId, app.props);
            }

        } else {
            const resultId = `flux-result-${Date.now()}`;
            const dataToStore = {
                result: result,
                prompt: prompt
            };
            localStorage.setItem(resultId, JSON.stringify(dataToStore));

            const openParams = new URLSearchParams();
            openParams.set('open', 'flux');
            openParams.set('resultId', resultId);
            
            toast({
                title: 'Projet Généré !',
                description: 'Votre espace de travail (X)OS est en cours de préparation...',
                duration: 5000,
            });
            
            router.push(`/xos?${openParams.toString()}`);
        }
    };

    const generatedDeliverables = Object.keys(result)
        .filter(key => result[key as keyof GenerateFluxOutput] && toolInfoMap[key as keyof typeof toolInfoMap])
        .map(key => toolInfoMap[key as keyof typeof toolInfoMap]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-8 space-y-8"
        >
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">{result.projectPlan?.title || "Votre Projet"}</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">Le plan de bataille pour votre idée, généré par (X)flux. Explorez les livrables ci-dessous ou ouvrez tout dans votre espace de travail.</p>
            </div>

            {result.projectPlan?.creativeBrief && (
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Brief Créatif
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                            {result.projectPlan.creativeBrief}
                        </blockquote>
                    </CardContent>
                </Card>
            )}

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Feuille de Route</CardTitle>
                    <CardDescription>
                        Les différents livrables générés pour votre projet.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {generatedDeliverables.map((tool, index) => (
                            <div key={index} className="glass-card p-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                    <tool.icon className="h-5 w-5 text-primary shrink-0" />
                                </div>
                                <span className="text-sm font-medium">{tool.name}</span>
                                <CheckCircle className="h-5 w-5 text-green-500 ml-auto shrink-0" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <div className="pt-4 text-center space-y-4">
                <Button onClick={handleOpenInXOS} size="lg" className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 animate-gradient-x font-semibold text-white hover:opacity-95 animate-pulse">
                    Ouvrir le projet dans (X)OS
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                 <div>
                    <Button onClick={onReset} variant="outline" size="sm">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Générer un autre projet
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

export default function FluxGenerator({ prompt: promptProp, job: jobProp, initialResult: initialResultProp, openApp }: FluxGeneratorProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [key, setKey] = useState(0); // Used to reset the form
    
    const initialState = { 
        message: initialResultProp ? 'success' : '', 
        result: initialResultProp || null,
        error: '', 
        id: key, 
        prompt: promptProp || '',
        job: jobProp || ''
    };
    const [state, formAction] = useFormState(fluxAction, initialState);
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state?.message === 'error' && state.error) {
          toast({
            variant: 'destructive',
            title: 'Erreur (X)flux',
            description: state.error,
          });
        }
    }, [state, toast]);
    
    const handleReset = () => {
        setKey(prevKey => prevKey + 1);
        formRef.current?.reset();
    };

    return (
         <div className="max-w-7xl mx-auto">
            {pending ? (
                <LoadingDisplay />
            ) : state.result ? (
                <ResultsDisplay result={state.result} prompt={state.prompt} onReset={handleReset} openApp={openApp} />
            ) : (
                <form ref={formRef} action={formAction} key={key}>
                    <Card className="glass-card max-w-2xl mx-auto w-full">
                        <CardHeader className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 border-4 border-primary/20">
                                <Wand2 className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle>Que souhaitez-vous accomplir ?</CardTitle>
                            <CardDescription>
                                Décrivez votre projet. Plus vous êtes précis, meilleur sera le résultat.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Textarea
                                name="prompt"
                                placeholder="Exemple : Je suis une artiste et je veux lancer une collection de NFT sur le thème de l'espace."
                                rows={4}
                                required
                                minLength={15}
                                className="bg-transparent text-base text-center"
                                defaultValue={initialState.prompt}
                            />
                            <Input 
                                name="job"
                                placeholder="Votre métier ? (ex: Développeur, Artiste, etc.) - Optionnel"
                                className="bg-transparent text-base text-center"
                                defaultValue={initialState.job}
                            />
                        </CardContent>
                        <div className="flex justify-center p-6 pt-0">
                            <SubmitButton />
                        </div>
                    </Card>
                </form>
            )}
        </div>
    );
}
