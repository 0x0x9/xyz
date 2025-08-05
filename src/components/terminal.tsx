
'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Terminal as TerminalIcon, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { oriaChatAction } from '@/app/actions';
import type { OriaChatOutput, OriaHistoryMessage } from '@/ai/types';
import { ALL_APPS_CONFIG } from '@/lib/apps-config';

type Line = {
    type: 'input' | 'output' | 'system' | 'ai-result';
    text?: string;
    result?: OriaChatOutput;
};

const HELP_TEXT = `
Bienvenue sur (X)term, votre terminal assisté par Oria.
Commandes disponibles:
  > open <app_id>    - Ouvre une application (ex: open cloud, open editor)
  > clear              - Efface l'écran.
  > help               - Affiche ce message d'aide.
Vous pouvez aussi discuter normalement avec Oria.
`;

const OriaResultDisplay = ({ result }: { result: OriaChatOutput }) => {
    switch (result.type) {
        case 'response':
            return <p>{result.response}</p>;
        case 'redirect':
             return <p>Lancement de l'application '{result.tool}'...</p>;
        case 'tool_result':
            let content;
            switch (result.tool) {
                case 'text':
                    content = result.data.text;
                    break;
                case 'code':
                    content = `${result.data.explanation}\n\n${result.data.code}`;
                    break;
                case 'palette':
                    const paletteData = result.data as any;
                    content = `Palette: ${paletteData.paletteName}\n` +
                        paletteData.palette.map((c: any) => `- ${c.name}: ${c.hex}`).join('\n');
                    break;
                default:
                    content = `Résultat de l'outil '${result.tool}' généré.`;
            }
            return <div><p>{result.response}</p><p className="mt-2 whitespace-pre-wrap">{content}</p></div>;
    }
    return <p>Réponse inattendue.</p>;
}

export default function Terminal({ openApp }: { openApp?: (appId: string) => void }) {
    const [lines, setLines] = useState<Line[]>([
        { type: 'system', text: HELP_TEXT },
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const endOfLinesRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const initialState = { id: 0, result: null, error: '', message: '' };

    const clientAction = async (prevState: any, formData: FormData) => {
        const prompt = formData.get('prompt') as string;
        if (!prompt.trim()) return initialState;

        const [command, ...args] = prompt.trim().toLowerCase().split(' ');

        if (command === 'clear') {
            setLines([]);
            formRef.current?.reset();
            return initialState;
        }

        if (command === 'help') {
            setLines(prev => [...prev, { type: 'input', text: prompt }, { type: 'system', text: HELP_TEXT }]);
            formRef.current?.reset();
            return initialState;
        }

        if (command === 'open' && args[0] && openApp) {
            const appId = args[0];
            const appConfig = ALL_APPS_CONFIG.find(app => app.id.toLowerCase() === appId);
            if (appConfig) {
                 setLines(prev => [...prev, { type: 'input', text: prompt }, { type: 'output', text: `Ouverture de ${appConfig.name}...` }]);
                 openApp(appConfig.id);
            } else {
                 setLines(prev => [...prev, { type: 'input', text: prompt }, { type: 'output', text: `Erreur: Application '${appId}' non trouvée.` }]);
            }
            formRef.current?.reset();
            return initialState;
        }


        const history: OriaHistoryMessage[] = lines.filter(l => l.type === 'input' || l.type === 'ai-result').map(l => ({
            role: l.type === 'input' ? 'user' : 'model',
            content: l.type === 'input' ? l.text! : JSON.stringify(l.result!)
        }));

        formData.append('history', JSON.stringify(history));

        setLines(prev => [...prev, { type: 'input', text: prompt }]);
        
        const result = await oriaChatAction(prevState, formData);
        
        if (result.message === 'success' && result.result) {
            setLines(prev => [...prev, { type: 'ai-result', result: result.result }]);
        } else {
            setLines(prev => [...prev, { type: 'output', text: `Erreur: ${result.error}` }]);
        }
        
        formRef.current?.reset();
        return result;
    };

    const [state, formAction] = useFormState(clientAction, initialState);

    useEffect(() => {
        const lastLine = lines[lines.length - 1];
        if (
            openApp &&
            lastLine?.type === 'ai-result' &&
            lastLine.result?.type === 'redirect'
        ) {
            openApp(lastLine.result.tool);
        }
    }, [lines, openApp]);
    
    const FormStatus = () => {
        const { pending } = useFormStatus();
         useEffect(() => {
            endOfLinesRef.current?.scrollIntoView({ behavior: 'auto' });
            if (!pending) {
                inputRef.current?.focus();
            }
        }, [pending]);
        return <input
            ref={inputRef}
            name="prompt"
            type="text"
            className="w-full bg-transparent border-none outline-none text-white font-code"
            autoComplete="off"
            disabled={pending}
        />
    }


    return (
        <Card
            className="glass-card w-full max-w-4xl mx-auto bg-black/50 backdrop-blur-3xl border-white/20 font-code text-white shadow-2xl"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="p-2 border-b border-white/10 flex items-center gap-2">
                <TerminalIcon className="h-4 w-4 text-green-400" />
                <span className="text-sm text-white/80">(X)term</span>
            </div>
            <CardContent className="p-4 h-[500px] overflow-y-auto">
                {lines.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap text-sm leading-relaxed mb-2">
                        {line.type === 'input' && <><span className="text-blue-400 mr-2">$</span><span>{line.text}</span></>}
                        {line.type === 'system' && <span className="text-green-400">{line.text}</span>}
                        {line.type === 'output' && <span className="text-red-400">{line.text}</span>}
                        {line.type === 'ai-result' && line.result && (
                            <div className="flex gap-2">
                                <Bot className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-1" />
                                <div className="text-cyan-400/90">
                                    <OriaResultDisplay result={line.result} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                
                <form ref={formRef} action={formAction} className="flex items-center">
                    <span className="text-blue-400 mr-2">$</span>
                    <FormStatus />
                </form>
                <div ref={endOfLinesRef} />
            </CardContent>
        </Card>
    );
}
