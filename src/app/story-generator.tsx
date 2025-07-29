'use client';

import { useEffect, useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateStoryAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

import type { GenerateStoryOutput } from '@/ai/types';
import { Wand2, Sparkles, Loader, BookMarked, Clapperboard, Users, BookOpen, Quote, Bot, RefreshCcw, FileText } from 'lucide-react';
import { LoadingState } from './loading-state';
import AiLoadingAnimation from './ui/ai-loading-animation';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="h-12 text-base">
      {pending ? (
        <>
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Écriture en cours...
        </>
      ) : (
        <>
          Générer l'histoire
          <Wand2 className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}

function ResultsDisplay({ result, onReset }: { result: GenerateStoryOutput, onReset: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-8 space-y-8"
        >
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">{result.title}</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto italic">"{result.logline}"</p>
                 <div className="pt-2">
                    <Button onClick={onReset} variant="outline" size="sm">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Créer une autre histoire
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Personnages
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {result.characterProfiles.map((char, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger>{char.name}</AccordionTrigger>
                                        <AccordionContent className="space-y-3">
                                            <p className="text-sm text-muted-foreground">{char.description}</p>
                                            <p className="text-xs"><strong className="text-primary">Motivations :</strong> {char.motivations}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Synopsis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-48">
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.synopsis}</p>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                     <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clapperboard className="h-5 w-5 text-primary" />
                                Plan par Chapitres
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {result.chapterOutlines.map((chapter) => (
                                    <div key={chapter.chapter} className="p-4 rounded-lg bg-background/50 border">
                                        <h4 className="font-semibold text-primary">Chapitre {chapter.chapter}: {chapter.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{chapter.summary}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}

export default function StoryGenerator() {
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [key, setKey] = useState(0);

    const initialState = { 
        message: '', 
        result: null,
        error: '', 
        id: 0, 
    };
    const [state, formAction] = useActionState(generateStoryAction, initialState);
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state?.message === 'error' && state.error) {
          toast({
            variant: 'destructive',
            title: 'Erreur (X)story',
            description: state.error,
          });
        }
    }, [state, toast]);
    
    const handleReset = () => {
        setKey(prevKey => prevKey + 1);
        formRef.current?.reset();
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            {pending ? (
                <div className="mt-8">
                     <Card className="glass-card min-h-[400px] relative overflow-hidden">
                        <div className="absolute inset-0 z-0"><AiLoadingAnimation isLoading={true} /></div>
                        <div className="relative z-10 h-full flex items-center justify-center">
                            <LoadingState text="(X)story écrit votre prochaine aventure..." />
                        </div>
                    </Card>
                </div>
            ) : state.result ? (
                <ResultsDisplay result={state.result} onReset={handleReset} />
            ) : (
                <form ref={formRef} action={formAction} key={key}>
                    <Card className="glass-card max-w-3xl mx-auto">
                        <CardHeader className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 border-4 border-primary/20">
                                <BookMarked className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle>Concevez votre histoire</CardTitle>
                            <CardDescription>
                                Fournissez les éléments clés et laissez l'IA construire la structure narrative pour vous.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-8">
                             <div>
                                <Label htmlFor="prompt">Concept de base</Label>
                                <Textarea
                                    id="prompt"
                                    name="prompt"
                                    placeholder="Ex: Une détective privée cynique dans un Paris cyberpunk qui doit retrouver un androïde volé contenant des souvenirs oubliés."
                                    rows={4}
                                    required
                                    minLength={15}
                                    className="bg-transparent text-base mt-2"
                                />
                            </div>
                             <div>
                                <Label htmlFor="characters">Personnages (Optionnel)</Label>
                                <Textarea
                                    id="characters"
                                    name="characters"
                                    placeholder="Ex: Kaito, le détective fatigué. Lyra, l'androïde à la mémoire fragmentée."
                                    rows={2}
                                    className="bg-transparent text-base mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="style">Style d'écriture (Optionnel)</Label>
                                <Input 
                                    id="style"
                                    name="style"
                                    placeholder="Ex: Inspiré de Philip K. Dick, avec un ton mélancolique."
                                    className="bg-transparent text-base mt-2"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <SubmitButton />
                        </CardFooter>
                    </Card>
                </form>
            )}
            <iframe
                src="https://www.youtube.com/embed/-JAjrFVGCgw?autoplay=1&mute=1&loop=1&playlist=-JAjrFVGCgw"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-cover"
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
        </div>
    );
}
