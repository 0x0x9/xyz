
'use client';

import { useEffect, useState, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { oriaChatAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, ArrowRight, Copy, ZoomIn, Download, BadgeCheck, BadgeX, TerminalSquare, RotateCcw, Presentation, LayoutTemplate, Music, Wand2, Users, Film, Network, Lightbulb, FileText, Palette, Mic, AudioLines, Code2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import AiLoadingAnimation from '@/components/ui/ai-loading-animation';
import { useFusionDock } from '@/hooks/use-fusion-dock';
import type { OriaChatOutput, GenerateImageOutput, GeneratePaletteOutput, GenerateToneOutput, GenerateCodeOutput, GenerateTextOutput, GenerateVoiceOutput, GenerateDeckOutput, GenerateFrameOutput, GenerateSoundOutput, GenerateFluxOutput, GenerateMotionOutput, GenerateNexusOutput, GenerateIdeasOutput, GeneratePersonaOutput, OriaHistoryMessage } from '@/ai/types';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription } from './ui/alert-dialog';

type Message = {
    id: number;
    type: 'user' | 'oria';
    text?: string;
    result?: OriaChatOutput;
};

interface OriaXosProps {
    openApp: (appId: string, props?: Record<string, any>) => void;
}

const toolInfoMap = {
    text: { icon: FileText, name: 'Générateur de Texte' },
    palette: { icon: Palette, name: '(X)palette' },
    tone: { icon: Mic, name: '(X)tone' },
    persona: { icon: Users, name: '(X)persona' },
    promptor: { icon: Lightbulb, name: '(X)promptor' },
    motion: { icon: Film, name: '(X)motion' },
    voice: { icon: AudioLines, name: '(X)voice' },
    code: { icon: Code2, name: '(X)code' },
    deck: { icon: Presentation, name: '(X)deck' },
    frame: { icon: LayoutTemplate, name: '(X)frame' },
    sound: { icon: Music, name: '(X)sound' },
    flux: { icon: Wand2, name: '(X)flux' },
    nexus: { icon: Network, name: '(X)nexus' },
};

// Component to render specific tool results
const OriaResultDisplay = ({ result, openApp }: { result: OriaChatOutput, openApp: OriaXosProps['openApp'] }) => {
    const { loadTools } = useFusionDock();
    const { toast } = useToast();
    const [showToolCard, setShowToolCard] = useState(result.type === 'tool_result');

    useEffect(() => {
        if (result.type === 'tool_result') {
            setShowToolCard(true);
            const timer = setTimeout(() => {
                setShowToolCard(false);
            }, 1800);
            return () => clearTimeout(timer);
        }
    }, [result]);

    if (showToolCard && result.type === 'tool_result') {
        const tool = toolInfoMap[result.tool as keyof typeof toolInfoMap];
        return (
            <div className="p-4 glass-card bg-background/50 border border-border/50 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                    {tool?.icon && <tool.icon className="h-6 w-6 text-primary" />}
                    <div>
                        <p className="text-sm text-muted-foreground">Oria utilise l'outil...</p>
                        <p className="font-semibold">{tool?.name || result.tool}</p>
                    </div>
                </div>
                <div className="relative h-1 w-full bg-primary/20 rounded-full mt-3 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-primary animate-tool-progress"></div>
                </div>
            </div>
        );
    }

    const handleRedirection = async (tool: string, promptForTool?: string, data?: any) => {
        if (tool === 'flux' && data) {
            const fluxData = data as GenerateFluxOutput;
            const appMapping: { [key in keyof GenerateFluxOutput]?: string } = {
                projectPlan: 'maestro', personas: 'persona', ideas: 'promptor', deck: 'deck',
                frame: 'editor', text: 'text', motion: 'motion', nexus: 'nexus',
                code: 'editor', agenda: 'agenda',
            };

            const appsToOpen: {appId: string, props: any}[] = [];

            if (fluxData.palette || fluxData.tone) {
                appsToOpen.push({ appId: 'brand-identity', props: { initialPalette: fluxData.palette, initialTone: fluxData.tone, prompt: fluxData.projectPlan?.creativeBrief } });
            }
            
            for (const key in fluxData) {
                const typedKey = key as keyof GenerateFluxOutput;
                if (typedKey !== 'palette' && typedKey !== 'tone' && fluxData[typedKey] && appMapping[typedKey]) {
                    const appId = appMapping[typedKey]!;
                    let props: Record<string, any> = { prompt: fluxData.projectPlan?.creativeBrief };

                    if (typedKey === 'frame') props = { ...props, initialProjectCodes: { html: fluxData.frame!.htmlCode, css: fluxData.frame!.cssCode, js: fluxData.frame!.jsCode }};
                    else if (typedKey === 'text') props = { ...props, initialFile: { code: fluxData.text!.text, language: 'markdown' } };
                    else if (typedKey === 'code') props = { ...props, initialFile: { code: fluxData.code!.code, language: 'typescript' } };
                    else props = { ...props, initialResult: fluxData[typedKey] };

                    appsToOpen.push({ appId, props });
                }
            }
            
            toast({ title: "Construction de l'espace de travail (X)flux..." });
            for (const app of appsToOpen) {
                await new Promise(resolve => setTimeout(resolve, 300));
                openApp(app.appId, app.props);
            }
            
        } else if (tool === 'fusion') {
            toast({ title: `Préparation de (X)fusion...`, description: "Les outils suggérés seront ajoutés à votre espace." });
            loadTools(promptForTool || '');
            openApp('fusion');
        } else {
            toast({ 
                title: `Ouverture de ${tool}...`
            });
            openApp(tool, { prompt: promptForTool });
        }
    };
    
    const handleCopy = (textToCopy: string, description: string) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            toast({ description: `${description} copié.` });
        }).catch(err => {
            console.error('Failed to copy:', err);
            toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de copier.' });
        });
    };
    
    const handleDownload = (dataUri: string, filename: string) => {
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    switch (result.type) {
        case 'response':
            return <p>{result.response}</p>;

        case 'redirect':
            return (
                <div className='space-y-3'>
                    <p>{result.response}</p>
                    <Button
                        onClick={() => handleRedirection(result.tool, result.promptForTool, result.data)}
                        variant="ghost"
                        className={cn("w-full h-auto justify-start p-3 rounded-lg text-left text-foreground", result.tool === 'fusion' ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x font-semibold text-primary-foreground hover:opacity-95" : "bg-background/80 hover:bg-accent border")}
                    >
                        <span className="flex-1">{result.tool === 'fusion' ? 'Préparer mon espace (X)fusion' : `Lancer l'outil : ${result.tool}`}</span>
                        <ArrowRight className="ml-auto h-4 w-4" />
                    </Button>
                </div>
            );

        case 'tool_result':
            const { tool, data } = result;
            return (
                <div className='space-y-3'>
                    <p>{result.response}</p>
                    <div className="p-4 rounded-xl bg-background/50 dark:bg-black/50 backdrop-blur-2xl border border-white/20 shadow-inner">
                    {(() => {
                        if (tool === 'flux') {
                            const fluxData = data as GenerateFluxOutput;
                            return (
                                <div className="space-y-2 text-sm">
                                    <h4 className="font-semibold flex items-center gap-2"><Wand2 className="h-4 w-4" /> Projet complexe généré</h4>
                                    <p className="text-muted-foreground">Plusieurs livrables ont été créés pour votre projet.</p>
                                    <Button onClick={() => handleRedirection('flux', result.promptForTool, fluxData)} size="sm" className="w-full !mt-3 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 animate-gradient-x font-semibold text-white hover:opacity-95">
                                        Ouvrir dans (X)OS
                                        <ArrowRight className="ml-auto h-4 w-4" />
                                    </Button>
                                </div>
                            );
                        }

                        switch (tool) {
                            case 'image':
                                const imageData = data as GenerateImageOutput;
                                return (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <div className="relative group aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                                <Image src={imageData.imageDataUri} alt="Image générée par Oria" fill sizes="100vw" className="object-cover" />
                                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><ZoomIn className="h-10 w-10 text-white" /></div>
                                            </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="max-w-3xl p-2 glass-card">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Image Agrandie</AlertDialogTitle>
                                                <AlertDialogDescription className="sr-only">
                                                    Version agrandie de l'image générée. Vous pouvez la télécharger ou fermer cette vue.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="relative">
                                                <Image src={imageData.imageDataUri} alt="Image générée par Oria" width={1024} height={1024} className="rounded-md w-full h-auto object-contain max-h-[80vh]" />
                                                <Button type="button" size="icon" variant="secondary" className="absolute top-4 right-4" onClick={() => handleDownload(imageData.imageDataUri, `oria-image-${Date.now()}.png`)}><Download/></Button>
                                            </div>
                                            <AlertDialogFooter className="p-2 border-t-0"><AlertDialogAction>Fermer</AlertDialogAction></AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                );
                            case 'text':
                                return <p className="whitespace-pre-wrap">{(data as GenerateTextOutput).text}</p>;
                            case 'palette':
                                const paletteData = data as GeneratePaletteOutput;
                                return (<div className="space-y-3">
                                    <h4 className="font-semibold">{paletteData.paletteName}</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {paletteData.palette.map((c, i) => (
                                            <div key={i} className="space-y-1.5">
                                                <div 
                                                    className="aspect-square rounded-md w-full border border-white/10" 
                                                    style={{backgroundColor: c.hex}} 
                                                />
                                                <div className="group relative text-center">
                                                    <p className="text-xs font-medium truncate">{c.name}</p>
                                                    <p className="text-xs text-muted-foreground uppercase">{c.hex}</p>
                                                    <Button 
                                                        type="button"
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="absolute top-1/2 -right-2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40" 
                                                        onClick={() => handleCopy(c.hex, 'Code couleur')}>
                                                        <Copy className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>);
                            case 'tone':
                                const toneData = data as GenerateToneOutput;
                                return (<div className="space-y-4 text-sm">
                                    <div className="flex flex-wrap gap-2">{toneData.adjectives.map((adj, i) => <div key={i} className="bg-primary/20 text-primary font-medium px-3 py-1 rounded-full text-xs">{adj}</div>)}</div>
                                    <div><h5 className="font-semibold flex items-center gap-2 mb-1"><BadgeCheck className="h-4 w-4 text-green-400" /> À faire</h5><ul className="list-disc list-inside space-y-1"> {toneData.dos.map((d,i) => <li key={i}>{d}</li>)}</ul></div>
                                    <div><h5 className="font-semibold flex items-center gap-2 mb-1"><BadgeX className="h-4 w-4 text-red-400" /> À ne pas faire</h5><ul className="list-disc list-inside space-y-1"> {toneData.donts.map((d,i) => <li key={i}>{d}</li>)}</ul></div>
                                </div>);
                            case 'voice':
                                const voiceData = data as GenerateVoiceOutput;
                                return <audio controls src={voiceData.audioDataUri} className="w-full" />;
                            case 'deck':
                                const deckData = data as GenerateDeckOutput;
                                return (
                                    <div className="space-y-2 text-sm">
                                        <h4 className="font-semibold flex items-center gap-2"><Presentation className="h-4 w-4" /> {deckData.title}</h4>
                                        <p className="text-muted-foreground">{deckData.slides.length} diapositives créées.</p>
                                        <Button onClick={() => openApp('deck', { initialResult: deckData, prompt: result.promptForTool })} size="sm" className="w-full !mt-3 bg-background/80 hover:bg-accent border text-foreground">
                                            Ouvrir dans (X)deck <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            case 'frame':
                                const frameData = data as GenerateFrameOutput;
                                const { htmlCode, cssCode, jsCode } = frameData;
                                return (
                                    <div className="space-y-2 text-sm">
                                        <h4 className="font-semibold flex items-center gap-2"><LayoutTemplate className="h-4 w-4" /> Maquette générée</h4>
                                        <p className="text-muted-foreground">{frameData.explanation}</p>
                                        <Button onClick={() => openApp('editor', { initialProjectCodes: { html: htmlCode, css: cssCode, js: jsCode } })} size="sm" className="w-full !mt-3 bg-background/80 hover:bg-accent border text-foreground">
                                            Ouvrir dans (X).alpha <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            case 'sound':
                                const soundData = data as GenerateSoundOutput;
                                return (
                                    <div className="space-y-2 text-sm">
                                        <h4 className="font-semibold flex items-center gap-2"><Music className="h-4 w-4" /> Son généré</h4>
                                        <p className="text-muted-foreground italic">"{soundData.description}"</p>
                                        <Button onClick={() => openApp('sound', { initialResult: soundData, prompt: result.promptForTool })} size="sm" className="w-full !mt-3 bg-background/80 hover:bg-accent border text-foreground">
                                            Ouvrir dans (X)sound <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                             case 'motion':
                                const motionData = data as GenerateMotionOutput;
                                return (
                                    <div className="space-y-2 text-sm">
                                        <h4 className="font-semibold flex items-center gap-2"><Film className="h-4 w-4" /> {motionData.title}</h4>
                                        <p className="text-muted-foreground">{motionData.scenes.length} scènes de script générées.</p>
                                        <Button onClick={() => openApp('motion', { initialResult: motionData, prompt: result.promptForTool })} size="sm" className="w-full !mt-3 bg-background/80 hover:bg-accent border text-foreground">
                                            Ouvrir dans (X)motion <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            case 'nexus':
                                const nexusData = data as GenerateNexusOutput;
                                return (
                                    <div className="space-y-2 text-sm">
                                        <h4 className="font-semibold flex items-center gap-2"><Network className="h-4 w-4" /> Carte mentale sur "{nexusData.mindMap.label}"</h4>
                                        <p className="text-muted-foreground">{nexusData.mindMap.children.length} branches principales créées.</p>
                                        <Button onClick={() => openApp('nexus', { initialResult: nexusData, prompt: result.promptForTool })} size="sm" className="w-full !mt-3 bg-background/80 hover:bg-accent border text-foreground">
                                            Ouvrir dans (X)nexus <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            case 'promptor': // 'ideas' tool
                                const ideasData = data as GenerateIdeasOutput;
                                return (
                                    <div className="space-y-2 text-sm">
                                        <h4 className="font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Idées générées</h4>
                                        <p className="text-muted-foreground">"{ideasData.titles[0]}" et autres pistes créatives.</p>
                                        <Button onClick={() => openApp('promptor', { initialResult: ideasData, prompt: result.promptForTool })} size="sm" className="w-full !mt-3 bg-background/80 hover:bg-accent border text-foreground">
                                            Ouvrir dans (X)promptor <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            case 'persona':
                                const personaData = data as GeneratePersonaOutput;
                                return (
                                    <div className="space-y-2 text-sm">
                                        <h4 className="font-semibold flex items-center gap-2"><Users className="h-4 w-4" /> Personas créés</h4>
                                        <p className="text-muted-foreground">{personaData.personas.length} profils générés, dont "{personaData.personas[0].name}".</p>
                                        <Button onClick={() => openApp('persona', { initialResult: personaData, prompt: result.promptForTool })} size="sm" className="w-full !mt-3 bg-background/80 hover:bg-accent border text-foreground">
                                            Ouvrir dans (X)persona <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            case 'code':
                                const codeData = data as GenerateCodeOutput;
                                const parseCodeFromMarkdown = (markdown: string): { language: string | null; code: string } => {
                                    const codeBlockRegex = /```(\w*)\n([\s\S]+)```/;
                                    const match = markdown.match(codeBlockRegex);
                                    if (match) {
                                        return { language: match[1] || 'plaintext', code: match[2].trim() };
                                    }
                                    return { language: 'plaintext', code: markdown.trim() };
                                };
                            
                                const { language, code: cleanCode } = parseCodeFromMarkdown(codeData.code);

                                return (<div className="space-y-2 text-sm">
                                    <p className="text-muted-foreground">{codeData.explanation}</p>
                                    <div className="relative group">
                                      <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-foreground"><code>{cleanCode}</code></pre>
                                      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {language && language !== 'plaintext' && (
                                             <Button asChild variant="ghost" size="icon" className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white" title="Ouvrir dans (X).alpha">
                                                <button onClick={() => openApp('editor', { initialFile: { code: cleanCode, language: language }})}><TerminalSquare className="h-4 w-4" /></button>
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white" onClick={() => handleCopy(cleanCode, 'Code')} title="Copier le code">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                </div>);
                            default:
                                return <p className='text-sm italic'>Le résultat de cet outil ne peut pas être affiché ici.</p>;
                        }
                    })()}
                    </div>
                </div>
            );
        default:
             return <p>Désolé, une erreur est survenue.</p>;
    }
}

function OriaXosUI({ messages, handleReset, openApp, formRef }: { messages: Message[], handleReset: () => void, openApp: (appId: string, props?: Record<string, any>) => void, formRef: React.RefObject<HTMLFormElement> }) {
    const { pending } = useFormStatus();
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const showWelcomeOverlay = !pending && messages.length === 0;

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="relative glass-card w-full h-full mx-auto overflow-hidden p-0 flex flex-col">
            <div className="absolute inset-0 z-0">
                 <AiLoadingAnimation isLoading={pending} />
            </div>
            
             <div
                className={cn(
                "absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 transition-opacity duration-500",
                !showWelcomeOverlay && "opacity-0 pointer-events-none"
                )}
            >
                <p className="mt-2 max-w-xl text-base text-muted-foreground">
                    Que souhaitez-vous créer aujourd'hui ?
                </p>
            </div>
    
            <div
                ref={scrollAreaRef}
                className="flex-1 p-6 space-y-4 overflow-y-auto relative z-10 no-scrollbar"
            >
                {messages.map((msg) => (
                    <div key={msg.id} className={cn("w-fit max-w-[85%] animate-in fade-in slide-in-from-bottom-4 duration-300", msg.type === 'user' ? 'ml-auto' : 'mr-auto')}>
                        <div className={cn("p-3 rounded-2xl leading-relaxed break-words", msg.type === 'user' ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted text-foreground rounded-bl-none")}>
                            {msg.type === 'user' && msg.text}
                            {msg.type === 'oria' && (msg.result ? <OriaResultDisplay result={msg.result} openApp={openApp} /> : <p>{msg.text}</p>)}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="relative z-10 p-4 border-t border-white/20 shrink-0">
                <div className="relative">
                    <Textarea
                        name="prompt"
                        placeholder="Envoyer un message..."
                        className="w-full bg-black/20 border-white/20 focus-visible:ring-primary/50 text-sm placeholder:text-muted-foreground resize-none rounded-2xl pl-4 pr-24 py-3 min-h-[48px] no-scrollbar max-h-40"
                        autoComplete="off"
                        disabled={pending}
                        required
                        rows={1}
                        onInput={(e) => {
                            const textarea = e.currentTarget;
                            textarea.style.height = 'auto';
                            textarea.style.height = `${textarea.scrollHeight}px`;
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (formRef.current?.checkValidity()) {
                                    formRef.current?.requestSubmit();
                                }
                            }
                        }}
                    />
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleReset}
                            aria-label="Réinitialiser la conversation"
                            className={cn(
                                "h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent transition-opacity duration-300 ease-in-out",
                                (messages.length === 0 || pending) && "opacity-0 pointer-events-none"
                            )}
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button type="submit" size="icon" disabled={pending} aria-label="Envoyer" className="w-8 h-8 rounded-full shrink-0">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OriaXOS({ openApp }: OriaXosProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const initialState = { id: 0, result: null, error: '', message: '' };
  const [state, formAction] = useFormState(oriaChatAction, initialState);

  const handleReset = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (state.id > 0) { // Action has been processed
        if (state.message === 'success' && state.result) {
            setMessages(prev => [...prev, {
                id: state.id,
                type: 'oria',
                result: state.result,
            }]);
        } else if (state.message === 'error') {
            setMessages(prev => [...prev, { id: state.id, type: 'oria', text: `Erreur: ${state.error || 'Une erreur est survenue.'}` }]);
        }
        formRef.current?.reset();
    }
  }, [state]);

  const wrappedAction = (formData: FormData) => {
    const prompt = formData.get('prompt') as string;
    if (!prompt.trim()) return;

    const history: OriaHistoryMessage[] = messages.slice(-10).map(msg => ({
      role: msg.type === 'user' ? 'user' : 'model',
      content: msg.type === 'user' ? msg.text! : JSON.stringify(msg.result!)
    }));
    
    formData.set('history', JSON.stringify(history));
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: prompt }]);
    
    formAction(formData);
  };

  return (
    <form ref={formRef} action={wrappedAction} className="h-full">
        <input type="hidden" name="context" value="xos" />
        <OriaXosUI messages={messages} handleReset={handleReset} openApp={openApp} formRef={formRef} />
    </form>
  );
}
