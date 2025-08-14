

'use server';

import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import type { Doc, GenerateFluxOutput, GenerateMuseOutput, ProjectPlan, GenerateIdeasOutput, VideoScript, Nexus, GeneratePaletteOutput, GeneratePersonaOutput, GenerateSoundOutput, Frame, GenerateToneOutput, GenerateCodeOutput, GenerateDeckOutput, GenerateTextOutput, GenerateVoiceOutput, OriaChatOutput, ExplainCodeOutput, DebugCodeOutput, AgendaEvent, ReformatTextWithPromptOutput, GenerateCodeInput, ExplainCodeInput, RefactorCodeInput, GenerateLightMoodOutput, ConvertImageOutput } from '@/ai/types';
import {
    GenerateFluxInputSchema,
    GenerateScheduleInputSchema,
    GenerateTextInputSchema,
    GenerateMuseInputSchema,
    CopilotLyricsInputSchema,
    GenerateIdeasInputSchema,
    GenerateMotionInputSchema,
    GenerateImageInputSchema,
    GenerateNexusInputSchema,
    GeneratePaletteInputSchema,
    GeneratePersonaInputSchema,
    GenerateSoundInputSchema,
    GenerateToneInputSchema,
    GenerateLightMoodInputSchema,
    GenerateCodeInputSchema,
    ExplainCodeInputSchema,
    DebugCodeInputSchema,
    RefactorCodeInputSchema,
    GenerateDeckInputSchema,
    GenerateVoiceInputSchema,
    ReformatTextWithPromptInputSchema,
    ConvertImageInputSchema,
    GenerateFrameInputSchema,
    OriaChatInputSchema,
    ParseEventInputSchema,
} from '@/ai/types';


// AI Flow Imports
import { generateFrame } from '@/ai/flows/generate-frame';
import { generateFlux } from '@/ai/flows/generate-flux';
import { oria } from '@/ai/flows/oria';
import { generateSchedule } from '@/ai/flows/generate-schedule';
import { generateMoodboard } from '@/ai/flows/generate-moodboard';
import { parseEvent } from '@/ai/flows/parse-event';
import { generateText } from '@/ai/flows/generate-text';
import { generateMuse } from '@/ai/flows/generate-muse';
import { copilotLyrics } from '@/ai/flows/copilot-lyrics';
import { generateIdeas } from '@/ai/flows/generate-ideas';
import { generateMotion } from '@/ai/flows/generate-motion';
import { generateImage } from '@/ai/flows/generate-image';
import { generateNexus } from '@/ai/flows/generate-nexus';
import { generatePalette } from '@/ai/flows/generate-palette';
import { generatePersona } from '@/ai/flows/generate-persona';
import { generateSound } from '@/ai/flows/generate-sound';
import { generateTone } from '@/ai/flows/generate-tone';
import { generateDeck } from '@/ai/flows/generate-deck';
import { generateVoice } from '@/ai/flows/generate-voice';
import { reformatTextWithPrompt } from '@/ai/flows/reformat-text-with-prompt';
import { convertImage } from '@/ai/flows/convert-image';
import { generateLightMood } from '@/ai/flows/generate-light-mood';
import * as codeActions from '@/ai/flows/code-actions';


// --- MOCK DATABASE ---
// In a real app, this would be a database like Firestore.
let mockDocs: Doc[] = [
  { id: 'doc-1', name: 'Designs/logo-v1.png', path: 'Designs/logo-v1.png', mimeType: 'image/png', size: 157286, createdAt: '2024-07-20T10:00:00Z', updatedAt: '2024-07-23T14:30:00Z', shareId: null },
  { id: 'doc-2', name: 'Projects/maestro-launch-plan.json', path: 'Projects/maestro-launch-plan.json', mimeType: 'application/json', size: 8192, createdAt: '2024-07-21T11:20:00Z', updatedAt: '2024-07-22T09:00:00Z', shareId: 'share-abc-123' },
  { id: 'doc-3', name: 'Marketing/blog-post-draft.md', path: 'Marketing/blog-post-draft.md', mimeType: 'text/markdown', size: 4096, createdAt: '2024-07-22T15:00:00Z', updatedAt: '2024-07-23T18:45:00Z', shareId: null },
  { id: 'doc-4', name: 'Designs/hero-image.jpg', path: 'Designs/hero-image.jpg', mimeType: 'image/jpeg', size: 2097152, createdAt: '2024-07-19T09:00:00Z', updatedAt: '2024-07-19T09:05:00Z', shareId: null },
  { id: 'folder-1', name: 'Designs/', path: 'Designs/', mimeType: 'application/x-directory', size: 0, createdAt: '2024-07-18T10:00:00Z', updatedAt: '2024-07-18T14:30:00Z', shareId: null },
];
let mockSharedDocs: Record<string, any> = {
    'share-abc-123': { user: 'mock-user-uid', doc: 'doc-2', path: 'Projects/maestro-launch-plan.json', name: 'Projects/maestro-launch-plan.json', mimeType: 'application/json' }
};
const resultsStore: Record<string, any> = {};

// Helper to handle safe parsing and error state return
function safeParse<T>(schema: z.ZodSchema<T>, formData: FormData, prevState: any) {
    const data = Object.fromEntries(formData);
    const parseResult = schema.safeParse(data);

    if (!parseResult.success) {
        const error = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        return { success: false, data: null, error, state: { ...prevState, message: 'error', error } };
    }
    return { success: true, data: parseResult.data, error: null, state: prevState };
}

// --- AI ACTIONS ---

export async function fluxAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateFluxOutput | null, error: string | null, id: number, prompt: string, job: string }> {
    const { success, data, error, state } = safeParse(GenerateFluxInputSchema, formData, prevState);
    if (!success) return state;

    try {
        const result = await generateFlux(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt, job: data.job ?? '' };
    } catch (e: any) {
        console.error('Error in fluxAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt: data.prompt, job: data.job ?? '' };
    }
}

export async function createManualProjectAction(prevState: any, formData: FormData): Promise<{ success: boolean; error: string | null; project?: ProjectPlan }> {
    const title = formData.get('title') as string;
    const creativeBrief = formData.get('creativeBrief') as string;

    if (!title || !creativeBrief) {
        return { success: false, error: 'Le titre et le brief sont requis.' };
    }

    try {
        const newProjectPlan: ProjectPlan = {
            id: `manual-${uuidv4()}`,
            title,
            creativeBrief,
            tasks: [
                 {
                    title: "Définir la stratégie",
                    description: "Clarifier les objectifs et la vision du projet.",
                    category: "Stratégie & Recherche",
                    duration: "2 jours",
                    checklist: [
                        { text: "Organiser une réunion de lancement", completed: false },
                        { text: "Valider le brief créatif", completed: false },
                    ]
                },
                {
                    title: "Créer les premiers contenus",
                    description: "Produire les premiers éléments visuels et textuels.",
                    category: "Création & Production",
                    duration: "1 semaine",
                    checklist: [
                        { text: "Rédiger le texte de la page d'accueil", completed: false },
                        { text: "Créer le logo et la charte graphique", completed: false },
                    ]
                }
            ],
            imagePrompts: [],
            events: [],
        };
        
        // Simulate saving to a "database"
        const projectDoc: Doc = {
            id: newProjectPlan.id!,
            name: `maestro-${newProjectPlan.title.replace(/\s+/g, '_')}.json`,
            path: `maestro-${newProjectPlan.title.replace(/\s+/g, '_')}.json`,
            mimeType: 'application/json',
            size: JSON.stringify(newProjectPlan).length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            shareId: null,
        };

        mockDocs.push(projectDoc);
        
        return { success: true, error: null, project: newProjectPlan };
    } catch (e: any) {
        console.error('Error in createManualProjectAction:', e);
        return { success: false, error: e.message };
    }
}


export async function generateFrameAction(prevState: any, formData: FormData): Promise<{ message: string, error: string | null, id: number, result: Frame | null }> {
    const { success, data, error, state } = safeParse(GenerateFrameInputSchema, formData, prevState);
    if (!success) return state;
    if (!data.prompt && !data.photoDataUri) {
         return { ...prevState, message: 'error', result: null, error: "Une description ou une image est requise." };
    }
    
    try {
        const result = await generateFrame({ prompt: data.prompt, photoDataUri: data.photoDataUri || undefined });
        return { ...prevState, message: 'success', result, error: null };
    } catch (e: any) {
        console.error('Error in generateFrameAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message };
    }
}


export async function oriaChatAction(prevState: any, formData: FormData): Promise<{ message: string, error: string | null, id: number, result: OriaChatOutput | null }> {
    const history = JSON.parse(formData.get('history') as string || '[]');
    const { success, data, error, state } = safeParse(OriaChatInputSchema.omit({ history: true }), formData, prevState);
    if (!success) return { ...state, id: prevState.id + 1 };
    
    try {
        const result = await oria({ prompt: data.prompt, context: data.context, history });
        return { message: 'success', error: null, id: prevState.id + 1, result };
    } catch (e: any) {
        console.error('Error in oriaChatAction:', e);
        return { message: 'error', error: e.message || "An unknown error occurred", id: prevState.id + 1, result: null };
    }
}

export async function generateScheduleAction(prevState: any, formData: FormData): Promise<{ message: string, plan: ProjectPlan | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GenerateScheduleInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };

    try {
        const plan = await generateSchedule(data);
        return { ...prevState, message: 'success', plan, error: null, prompt: data.prompt };
    } catch(e: any) {
        console.error('Error in generateScheduleAction:', e);
        return { ...prevState, message: 'error', plan: null, error: e.message, prompt: data.prompt };
    }
}

export async function generateTextAction(prevState: any, formData: FormData): Promise<{ message: string, text: string, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GenerateTextInputSchema, formData, prevState);
    if (!success) return { ...state, text: '', prompt: '' };

    try {
        const result = await generateText(data);
        return { message: 'success', text: result.text, error: null, id: prevState.id + 1, prompt: data.prompt };
    } catch (e: any) {
        console.error('Error in generateTextAction:', e);
        return { message: 'error', text: '', error: e.message, id: prevState.id + 1, prompt: data.prompt };
    }
}

export async function generateMoodboardAction(prompts: string[]) {
    try {
        const result = await generateMoodboard({ prompts });
        return { message: 'success', imageDataUris: result.imageDataUris, error: null };
    } catch (e: any) {
        console.error('Error in generateMoodboardAction:', e);
        return { message: 'error', imageDataUris: [], error: e.message as string };
    }
}

export async function parseEventAction(
    prevState: any, 
    formData: FormData
): Promise<{ success: boolean; event: AgendaEvent | null; error: string | null; id: number }> {
    const { success, data, error, state } = safeParse(ParseEventInputSchema.extend({ currentDate: z.string().optional() }), formData, prevState);
    if (!success) return { ...state, success: false, event: null, id: prevState.id + 1 };
    
    try {
        const result = await parseEvent({ prompt: data.prompt, currentDate: new Date().toISOString() });
        return { id: prevState.id + 1, success: true, event: result, error: null };
    } catch (e: any) {
        console.error('Error in parseEventAction:', e);
        return { id: prevState.id + 1, success: false, event: null, error: e.message };
    }
}

export async function generateMuseAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateMuseOutput | null, error: string | null, id: number, theme: string, mood: string, tempo: string, references: string }> {
    const { success, data, error, state } = safeParse(GenerateMuseInputSchema, formData, prevState);
    const formValues = Object.fromEntries(formData);
    if (!success) return { ...state, ...formValues, references: formValues.references || '' };

    try {
        const result = await generateMuse(data);
        return { ...prevState, message: 'success', result, error: null, ...data, references: data.references || '' };
    } catch (e: any) {
        console.error('Error in generateMuseAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, ...data, references: data.references || '' };
    }
}

export async function copilotLyricsAction(prevState: any, formData: FormData): Promise<{ success: boolean, suggestions: string[] | null, error: string | null, action: 'ENHANCE' | 'RHYMES' | undefined }> {
    const { success, data, error, state } = safeParse(CopilotLyricsInputSchema, formData, prevState);
    if (!success) return { success: false, suggestions: null, error: error, action: undefined };
    
    try {
        const result = await copilotLyrics(data);
        return { success: true, suggestions: result.suggestions, error: null, action: data.action };
    } catch (e: any) {
        console.error('Error in copilotLyricsAction:', e);
        return { success: false, suggestions: null, error: e.message, action: data.action };
    }
}

export async function generateIdeasAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateIdeasOutput | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GenerateIdeasInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };

    try {
        const result = await generateIdeas(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt };
    } catch (e: any) {
        console.error('Error in generateIdeasAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt: data.prompt };
    }
}

export async function generateMotionAction(prevState: any, formData: FormData): Promise<{ message: string, result: VideoScript | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GenerateMotionInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };

    try {
        const result = await generateMotion(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt };
    } catch(e: any) {
        console.error('Error in generateMotionAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt: data.prompt };
    }
}

export async function generateImageAction(prevState: any, formData: FormData): Promise<{ message: string, imageDataUri: string | null, error: string | null, prompt: string, style?: string, id: number }> {
    const { success, data, error, state } = safeParse(GenerateImageInputSchema, formData, prevState);
    if (!success) return { ...state, imageDataUri: null, prompt: '', style: 'none' };

    try {
        const { imageDataUri } = await generateImage(data);
        return { ...prevState, message: 'success', imageDataUri, error: null, prompt: data.prompt, style: data.style };
    } catch (e: any) {
        console.error('Error in generateImageAction:', e);
        return { ...prevState, message: 'error', imageDataUri: null, error: e.message, prompt: data.prompt, style: data.style };
    }
}

export async function generateNexusAction(prevState: any, formData: FormData): Promise<{ message: string, result: Nexus | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GenerateNexusInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };
    
    try {
        const result = await generateNexus(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt };
    } catch (e: any) {
        console.error('Error in generateNexusAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt: data.prompt };
    }
}

export async function generatePaletteAction(prevState: any, formData: FormData): Promise<{ message: string, result: GeneratePaletteOutput | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GeneratePaletteInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };

    try {
        const result = await generatePalette(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt };
    } catch(e: any) {
        console.error('Error in generatePaletteAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message as string, prompt: data.prompt };
    }
}

export async function generatePersonaAction(prevState: any, formData: FormData): Promise<{ message: string, result: GeneratePersonaOutput | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GeneratePersonaInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };

    try {
        const result = await generatePersona(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt };
    } catch(e: any) {
        console.error('Error in generatePersonaAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt: data.prompt };
    }
}

export async function generateSoundAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateSoundOutput | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GenerateSoundInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };

    try {
        const result = await generateSound(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt };
    } catch(e: any) {
        console.error('Error in generateSoundAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt: data.prompt };
    }
}

export async function generateToneAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateToneOutput | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GenerateToneInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };
    
    try {
        const result = await generateTone(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt };
    } catch (e: any) {
        console.error('Error in generateToneAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt: data.prompt };
    }
}

export async function generateLightMoodAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateLightMoodOutput | null, error: string | null, id: number }> {
    const { success, data, error, state } = safeParse(GenerateLightMoodInputSchema, formData, prevState);
    if (!success) return state;

    try {
        const result = await generateLightMood(data);
        return { ...prevState, message: 'success', result, error: null };
    } catch (e: any) {
        console.error('Error in generateLightMoodAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message };
    }
}

export async function generateCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
    const parse = GenerateCodeInputSchema.safeParse(Object.fromEntries(formData));
    if (!parse.success) {
        return { id: prevState.id + 1, result: null, error: "Prompt et langage sont requis." };
    }
    return codeActions.generateCodeAction(prevState, formData);
}
export async function explainCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: ExplainCodeOutput | null, error: string | null }> {
    const parse = ExplainCodeInputSchema.safeParse(Object.fromEntries(formData));
    if (!parse.success) {
        return { id: prevState.id + 1, result: null, error: "Code et langage sont requis." };
    }
    return codeActions.explainCodeAction(prevState, formData);
}
export async function debugCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: DebugCodeOutput | null, error: string | null }> {
    const parse = DebugCodeInputSchema.safeParse(Object.fromEntries(formData));
    if (!parse.success) {
        return { id: prevState.id + 1, result: null, error: "Code et langage sont requis." };
    }
    return codeActions.debugCodeAction(prevState, formData);
}
export async function refactorCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
    const parse = RefactorCodeInputSchema.safeParse(Object.fromEntries(formData));
    if (!parse.success) {
        return { id: prevState.id + 1, result: null, error: "Prompt, code et langage sont requis." };
    }
    return codeActions.refactorCodeAction(prevState, formData);
}

export async function generateDeckAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateDeckOutput | null, error: string | null, id: number, prompt: string }> {
    const { success, data, error, state } = safeParse(GenerateDeckInputSchema, formData, prevState);
    if (!success) return { ...state, prompt: '' };

    try {
        const result = await generateDeck(data);
        return { ...prevState, message: 'success', result, error: null, prompt: data.prompt };
    } catch (e: any) {
        console.error('Error in generateDeckAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt: data.prompt };
    }
}

export async function generateVoiceAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateVoiceOutput | null, error: string | null, id: number, text: string, voice: string }> {
    const { success, data, error, state } = safeParse(GenerateVoiceInputSchema, formData, prevState);
    if (!success) return { ...state, text: '', voice: 'Algenib' };

    try {
        const result = await generateVoice(data);
        return { ...prevState, message: 'success', result, error: null, text: data.text, voice: data.voice };
    } catch (e: any) {
        console.error('Error in generateVoiceAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, text: data.text, voice: data.voice };
    }
}

export async function reformatTextAction(
    prevState: any, 
    formData: FormData
): Promise<{ message: string; result: ReformatTextWithPromptOutput | null; error: string | null; id: number }> {
    const { success, data, error, state } = safeParse(ReformatTextWithPromptInputSchema, formData, prevState);
    if (!success) return { ...state, id: prevState.id + 1, message: 'error', result: null };

    try {
        const result = await reformatTextWithPrompt(data);
        return { ...prevState, id: prevState.id + 1, message: 'success', result, error: null };
    } catch(e: any) {
        console.error('Error in reformatTextAction:', e);
        return { ...prevState, id: prevState.id + 1, message: 'error', result: null, error: e.message };
    }
}

export async function convertImageAction(prevState: any, formData: FormData): Promise<{ message: string; result: ConvertImageOutput | null; error: string | null; id: number }> {
    const rawData = {
        image: formData.get('image'),
        outputFormat: formData.get('outputFormat'),
        removeTransparency: formData.get('removeTransparency') === 'on'
    };
    const { success, data, error, state } = safeParse(ConvertImageInputSchema, new FormData(), { ...prevState, ...rawData });
    
    // Note: Zod can't parse FormData directly with booleans. We manually create the object.
    const parseResult = ConvertImageInputSchema.safeParse(rawData);
    if (!parseResult.success) {
        const errorMessage = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        return { ...prevState, id: prevState.id + 1, message: 'error', result: null, error: errorMessage };
    }

    try {
        const result = await convertImage(parseResult.data);
        return { ...prevState, id: prevState.id + 1, message: 'success', result, error: null };
    } catch(e: any) {
        console.error('Error in convertImageAction:', e);
        return { ...prevState, id: prevState.id + 1, message: 'error', result: null, error: e.message };
    }
}


export async function getActionResult(id: string) {
    const data = resultsStore[id];
    delete resultsStore[id]; // Clean up after retrieval
    return data;
}

// --- MOCKED BACKEND ACTIONS ---

export async function updateProfileAction(data: { name: string; email: string }): Promise<{ success: boolean; error?: string }> {
    console.log("Action: updateProfileAction with data:", data);
    await new Promise(res => setTimeout(res, 500));
    if (!data.name || !data.email) {
        return { success: false, error: "Le nom et l'email sont requis." };
    }
    return { success: true };
}

export async function disconnectDeviceAction(data: { deviceId: number }): Promise<{ success: boolean; error?: string }> {
    console.log("Action: disconnectDeviceAction for deviceId:", data.deviceId);
    await new Promise(res => setTimeout(res, 500));
    return { success: true };
}


export async function listDocumentsAction(): Promise<Doc[]> {
    console.log("Action: listDocumentsAction");
    return mockDocs;
}

export async function uploadDocumentAction(data: { name: string; content: string; mimeType: string; metadata?: Record<string, any> }): Promise<{ docId: string }> {
    console.log("Action: uploadDocumentAction for", data.name);
    const newDoc: Doc = { id: uuidv4(), name: data.name, path: data.name, mimeType: data.mimeType, size: 12345, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), shareId: null };
    mockDocs.push(newDoc);
    return { docId: newDoc.id };
}

export async function shareDocumentAction(data: { docId: string; makePublic: boolean }): Promise<{ shareLink: string | null }> {
    console.log("Action: shareDocumentAction for", data.docId);
    const doc = mockDocs.find(d => d.id === data.docId);
    if (!doc) throw new Error("Document not found");

    if (data.makePublic) {
        const shareId = doc.shareId || `share-${uuidv4().substring(0, 8)}`;
        doc.shareId = shareId;
        return { shareLink: `https://xyzz.ai/share/${shareId}` };
    } else {
        doc.shareId = null;
        return { shareLink: null };
    }
}

export async function deleteDocumentAction(data: { docId: string }): Promise<{ success: boolean }> {
    console.log("Action: deleteDocumentAction for", data.docId);
    mockDocs = mockDocs.filter(d => d.id !== data.docId);
    return { success: true };
}

export async function createFolderAction(data: { currentPath: string, folderName: string }): Promise<{ success: boolean }> {
    console.log("Action: createFolderAction for", data.folderName);
    const fullFolderPath = `${data.currentPath}${data.folderName.trim()}/`;
    const newFolder: Doc = {
        id: `folder-${uuidv4()}`, name: fullFolderPath, path: fullFolderPath, mimeType: 'application/x-directory',
        size: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), shareId: null,
    };
    mockDocs.push(newFolder);
    return { success: true };
}

export async function deleteFolderAction(data: { folderPath: string }): Promise<{ success: boolean }> {
    console.log("Action: deleteFolderAction for", data.folderPath);
    mockDocs = mockDocs.filter(d => !d.name.startsWith(data.folderPath));
    return { success: true };
}

export async function getSignedUrlAction(data: { docId: string }): Promise<{ url: string }> {
    console.log("Action: getSignedUrlAction for", data.docId);
    return { url: 'https://placehold.co/600x400.png' };
}

export async function renameDocumentAction(data: { oldPath: string, newName: string, docId?: string }): Promise<{ success: boolean }> {
    console.log(`Action: renameDocumentAction from ${data.oldPath} to ${data.newName}`);
    return { success: true };
}

export async function uploadMuseDocumentAction(data: { name: string; content: string; mimeType: string; }): Promise<{ success: boolean; error?: string }> {
    console.log("Action: uploadMuseDocumentAction for", data.name);
    try {
        await uploadDocumentAction(data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || "An unknown error occurred" };
    }
}


