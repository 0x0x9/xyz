
'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { generateLightMoodAction, generateMoodboardAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Sun, Droplets, Wind, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { GenerateLightMoodOutput } from '@/ai/types';
import { LoadingState } from './loading-state';
import AiLoadingAnimation from './ui/ai-loading-animation';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import { motion } from 'framer-motion';

const moodThemes = [
    { id: 'serenity', name: 'Sérénité', icon: Leaf, prompt: "Une forêt brumeuse au lever du soleil, avec des tons pastel doux et une lumière diffuse." },
    { id: 'energy', name: 'Énergie', icon: Sun, prompt: "Une explosion de couleurs vives et de formes dynamiques, rappelant un festival de musique électronique." },
    { id: 'melancholy', name: 'Mélancolie', icon: Droplets, prompt: "Une rue de ville sous une pluie battante la nuit, avec des reflets de néons sur le sol mouillé." },
    { id: 'focus', name: 'Concentration', icon: Wind, prompt: "Un bureau minimaliste avec une seule plante, baigné d'une lumière naturelle et douce." },
];

function SubmitButton({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="lg" className="w-full">
        {pending ? (
            <LoadingState text="Recherche d'inspiration..." isCompact={true} />
        ) : (
            <>
                {children}
            </>
        )}
        </Button>
    );
}

function ResultsDisplay({ result }: { result: GenerateLightMoodOutput & { images: string[], isLoadingImages: boolean } }) {
    return (
        <motion.div 
            className="mt-12 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">{result.title}</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{result.description}</p>
            </div>
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Palette & Mots-clés</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        <h4 className="font-semibold">Palette de Couleurs</h4>
                        <div className="flex gap-2">
                            {result.colors.map((color, i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-white/20" style={{ backgroundColor: color }} />
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                         <h4 className="font-semibold">Mots-clés</h4>
                         <div className="flex flex-wrap gap-2">
                             {result.keywords.map((keyword, i) => (
                                <div key={i} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">{keyword}</div>
                            ))}
                         </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="glass-card">
                 <CardHeader>
                    <CardTitle>Inspiration Visuelle</CardTitle>
                </CardHeader>
                <CardContent>
                    {result.isLoadingImages ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Skeleton className="aspect-square w-full" />
                            <Skeleton className="aspect-square w-full" />
                            <Skeleton className="aspect-square w-full" />
                            <Skeleton className="aspect-square w-full" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {result.images.map((img, i) => (
                               <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                                   <Image src={img} alt={`Mood image ${i+1}`} fill className="object-cover" />
                               </div>
                           ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function LightGenerator() {
    const initialState = { message: null, result: null, error: null, id: 0 };
    const [state, formAction] = useFormState(generateLightMoodAction, initialState);
    const { toast } = useToast();
    const [resultWithImages, setResultWithImages] = useState<(GenerateLightMoodOutput & { images: string[], isLoadingImages: boolean }) | null>(null);

    useEffect(() => {
        if (state.error) {
            toast({ variant: 'destructive', title: 'Erreur', description: state.error });
            setResultWithImages(null);
        }
        if (state.result) {
            const newResult = { ...state.result, images: [], isLoadingImages: true };
            setResultWithImages(newResult);
            generateMoodboardAction(state.result.imagePrompts)
                .then(imageResult => {
                    if (imageResult.message === 'success' && imageResult.imageDataUris) {
                        setResultWithImages(prev => prev ? ({ ...prev, images: imageResult.imageDataUris, isLoadingImages: false }) : null);
                    } else {
                        setResultWithImages(prev => prev ? ({ ...prev, isLoadingImages: false }) : null);
                    }
                });
        }
    }, [state, toast]);

    return (
        <div className="max-w-4xl mx-auto w-full">
            <Card className="glass-card">
                <CardHeader className="text-center">
                    <CardTitle>Quelle est votre humeur créative ?</CardTitle>
                    <CardDescription>Choisissez un thème ou décrivez votre propre ambiance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {moodThemes.map(theme => (
                                <button
                                    key={theme.id}
                                    type="submit"
                                    name="prompt"
                                    value={theme.prompt}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent bg-background/50 hover:border-primary transition-colors"
                                >
                                    <theme.icon className="h-6 w-6 text-primary"/>
                                    <span className="text-sm font-medium">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <Input name="prompt" placeholder="Ou décrivez votre propre ambiance..." className="flex-1 h-12 text-base" />
                            <Button type="submit" size="lg" className="h-12"><Sparkles className="mr-2 h-4 w-4" />Générer</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

             {useFormStatus().pending && (
                <div className="mt-12">
                    <Card className="glass-card min-h-[400px] relative overflow-hidden">
                        <div className="absolute inset-0 z-0"><AiLoadingAnimation isLoading={true} /></div>
                        <div className="relative z-10 h-full flex items-center justify-center">
                            <LoadingState text="(X)light prépare votre inspiration..." />
                        </div>
                    </Card>
                </div>
            )}
            
            {resultWithImages && <ResultsDisplay result={resultWithImages} />}
        </div>
    );
}
