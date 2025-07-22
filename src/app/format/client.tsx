
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Sparkles, Copy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { reformatTextWithPrompt, type ReformatTextWithPromptOutput } from '@/ai/flows/reformat-text-with-prompt';
import { motion } from 'framer-motion';

export default function FormatClient() {
    const [text, setText] = useState('');
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState<ReformatTextWithPromptOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || !prompt.trim()) {
            toast({
                variant: 'destructive',
                title: 'Champs requis',
                description: 'Veuillez fournir un texte et un prompt.',
            });
            return;
        }
        setIsLoading(true);
        setResult(null);
        try {
            const response = await reformatTextWithPrompt({ text, prompt });
            setResult(response);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Erreur de l\'IA',
                description: error.message || "Une erreur est survenue lors du reformatage.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (!result?.reformattedText) return;
        navigator.clipboard.writeText(result.reformattedText);
        toast({
            title: 'Copié !',
            description: 'Le texte reformaté a été copié dans le presse-papiers.',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>1. Votre Texte Original</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="Collez ou écrivez votre texte ici..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={15}
                            className="bg-background/50 text-base"
                            required
                        />
                    </CardContent>
                </Card>
                 <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>2. Votre Instruction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="Ex: Transforme ce texte en une liste à puces. / Résume en 3 points clés. / Adopte un ton plus professionnel."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={5}
                            className="bg-background/50 text-base"
                            required
                        />
                        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Transformation...
                                </>
                            ) : (
                                <>
                                    Lancer la magie <Sparkles className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {(isLoading || result) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="glass-card">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>3. Résultat Transformé</CardTitle>
                            {result && (
                                <Button variant="outline" size="icon" onClick={handleCopy}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="min-h-[300px]">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <Loader2 className="mr-4 h-8 w-8 animate-spin text-primary" />
                                    L'IA est en train de réécrire...
                                </div>
                            ) : (
                                <Textarea
                                    readOnly
                                    value={result?.reformattedText || ''}
                                    rows={15}
                                    className="bg-background/50 text-base"
                                />
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </form>
    );
}
