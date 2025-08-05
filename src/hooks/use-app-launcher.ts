
'use client';

import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getActionResult } from '@/app/actions';
import type { GenerateFluxOutput } from '@/ai/types';
import type { WindowInstance } from './use-window-manager';

type OpenWindowFn = (appId: string, props?: Record<string, any>) => void;
type CloseWindowFn = (id: number) => void;

export function useAppLauncher(openWindow: OpenWindowFn, closeWindow: CloseWindowFn) {
    const { toast } = useToast();

    const launchFluxProject = useCallback(async (fluxResult: GenerateFluxOutput, prompt?: string) => {
        const fluxTaskId = Date.now();
        // This is a bit of a hack, we can't directly manipulate the window state from here.
        // We'd need a way to signal loading state back to the XOS client.
        // For now, we'll just open the windows.
        toast({ title: "Construction de l'espace de travail (X)flux..." });

        const appMapping: { [key in keyof GenerateFluxOutput]?: string } = {
            projectPlan: 'maestro', personas: 'persona', ideas: 'promptor', deck: 'deck',
            frame: 'editor', text: 'text', motion: 'motion', nexus: 'nexus',
            code: 'editor', agenda: 'agenda',
        };

        const appsToOpen: {appId: string, props: any}[] = [];

        if (fluxResult.palette || fluxResult.tone) {
            appsToOpen.push({ appId: 'brand-identity', props: { initialPalette: fluxResult.palette, initialTone: fluxResult.tone, prompt } });
        }
        
        for (const key in fluxResult) {
            const typedKey = key as keyof GenerateFluxOutput;
            if (typedKey !== 'palette' && typedKey !== 'tone' && fluxResult[typedKey] && appMapping[typedKey]) {
                const appId = appMapping[typedKey]!;
                let props: Record<string, any> = { prompt };

                if (typedKey === 'frame') props = { ...props, initialProjectCodes: { html: fluxResult.frame!.htmlCode, css: fluxResult.frame!.cssCode, js: fluxResult.frame!.jsCode }};
                else if (typedKey === 'text') props = { ...props, initialFile: { code: fluxResult.text!.text, language: 'markdown' } };
                else if (typedKey === 'code') props = { ...props, initialFile: { code: fluxResult.code!.code, language: 'typescript' } };
                else props = { ...props, initialResult: fluxResult[typedKey] };

                appsToOpen.push({ appId, props });
            }
        }
        
        for (const app of appsToOpen) {
            await new Promise(resolve => setTimeout(resolve, 300));
            openWindow(app.appId, app.props);
        }

    }, [openWindow, toast]);

    const launchAppFromUrl = useCallback(async (appId: string, resultId: string | null) => {
        if (resultId) {
            const data = await getActionResult(resultId);

            if (!data) {
                toast({ variant: "destructive", title: "Projet non trouvé", description: "Les données du projet n'ont pas été trouvées." });
                openWindow(appId);
                return;
            }

            if (appId === 'flux') {
                const fluxResult = data.result as GenerateFluxOutput;
                const prompt = data.prompt as string;
                if (fluxResult) {
                    launchFluxProject(fluxResult, prompt);
                } else {
                    toast({ variant: "destructive", title: "Erreur de chargement", description: "Les données du projet (X)flux sont invalides." });
                }
            } else {
                const props: Record<string, any> = { initialResult: data.result };
                 if (data.prompt) props.prompt = data.prompt;
                openWindow(appId, props);
            }
        } else {
            openWindow(appId);
        }
    }, [openWindow, toast, launchFluxProject]);


    return { launchAppFromUrl, launchFluxProject };
}
