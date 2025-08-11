

'use server';

import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import type { Doc, GenerateFluxOutput, GenerateMuseOutput, ProjectPlan, GenerateIdeasOutput, VideoScript, Nexus, GeneratePaletteOutput, GeneratePersonaOutput, GenerateSoundOutput, Frame, GenerateToneOutput, GenerateCodeOutput, GenerateDeckOutput, GenerateTextOutput, GenerateVoiceOutput, OriaChatOutput, ExplainCodeOutput, DebugCodeOutput, AgendaEvent, ReformatTextWithPromptOutput, GenerateCodeInput, ExplainCodeInput, RefactorCodeInput, GenerateLightMoodOutput } from '@/ai/types';

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


// --- AI ACTIONS ---

export async function fluxAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateFluxOutput | null, error: string | null, id: number, prompt: string, job: string }> {
    const prompt = formData.get('prompt') as string;
    const job = formData.get('job') as string;
    try {
        const result = await generateFlux({ prompt, job });
        return { ...prevState, message: 'success', result, error: null, prompt, job };
    } catch (e: any) {
        console.error('Error in fluxAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt, job };
    }
}

export async function generateFrameAction(prevState: any, formData: FormData): Promise<{ message: string, error: string | null, id: number, result: Frame | null }> {
    const prompt = formData.get('prompt') as string;
    const photoDataUri = formData.get('photoDataUri') as string;
    try {
        const result = await generateFrame({ prompt, photoDataUri: photoDataUri || undefined });
        return { ...prevState, message: 'success', result, error: null };
    } catch (e: any) {
        console.error('Error in generateFrameAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message };
    }
}


export async function oriaChatAction(prevState: any, formData: FormData): Promise<{ message: string, error: string | null, id: number, result: OriaChatOutput | null }> {
    const prompt = formData.get('prompt') as string;
    const history = JSON.parse(formData.get('history') as string || '[]');
    const context = formData.get('context') as 'homepage' | 'xos' | 'dock' || 'xos';
    try {
        const result = await oria({ prompt, history, context });
        return { message: 'success', error: null, id: prevState.id + 1, result };
    } catch (e: any) {
        console.error('Error in oriaChatAction:', e);
        return { message: 'error', error: e.message || "An unknown error occurred", id: prevState.id + 1, result: null };
    }
}

export async function generateScheduleAction(prevState: any, formData: FormData): Promise<{ message: string, plan: ProjectPlan | null, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const plan = await generateSchedule({ prompt });
        return { ...prevState, message: 'success', plan, error: null, prompt };
    } catch(e: any) {
        console.error('Error in generateScheduleAction:', e);
        return { ...prevState, message: 'error', plan: null, error: e.message, prompt };
    }
}

export async function generateTextAction(prevState: any, formData: FormData): Promise<{ message: string, text: string, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generateText({ prompt });
        return { message: 'success', text: result.text, error: null, id: prevState.id + 1, prompt };
    } catch (e: any) {
        console.error('Error in generateTextAction:', e);
        return { message: 'error', text: '', error: e.message, id: prevState.id + 1, prompt };
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
    const prompt = formData.get('prompt') as string;
    try {
        const result = await parseEvent({ prompt, currentDate: new Date().toISOString() });
        return { id: prevState.id + 1, success: true, event: result, error: null };
    } catch (e: any) {
        console.error('Error in parseEventAction:', e);
        return { id: prevState.id + 1, success: false, event: null, error: e.message };
    }
}

export async function generateMuseAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateMuseOutput | null, error: string | null, id: number, theme: string, mood: string, tempo: string, references: string }> {
    const theme = formData.get('theme') as string;
    const mood = formData.get('mood') as string;
    const tempo = formData.get('tempo') as string;
    const references = formData.get('references') as string;
    try {
        const result = await generateMuse({ theme, mood, tempo, references });
        return { ...prevState, message: 'success', result, error: null, theme, mood, tempo, references };
    } catch (e: any) {
        console.error('Error in generateMuseAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, theme, mood, tempo, references };
    }
}

export async function copilotLyricsAction(prevState: any, formData: FormData): Promise<{ success: boolean, suggestions: string[] | null, error: string | null, action: 'ENHANCE' | 'RHYMES' | undefined }> {
    const textToEdit = formData.get('textToEdit') as string;
    const fullText = formData.get('fullText') as string;
    const mood = formData.get('mood') as string;
    const action = formData.get('action') as 'ENHANCE' | 'RHYMES';
    try {
        const result = await copilotLyrics({ textToEdit, fullText, mood, action });
        return { success: true, suggestions: result.suggestions, error: null, action };
    } catch (e: any) {
        console.error('Error in copilotLyricsAction:', e);
        return { success: false, suggestions: null, error: e.message, action };
    }
}

export async function generateIdeasAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateIdeasOutput | null, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generateIdeas({ prompt });
        return { ...prevState, message: 'success', result, error: null, prompt };
    } catch (e: any) {
        console.error('Error in generateIdeasAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt };
    }
}

export async function generateMotionAction(prevState: any, formData: FormData): Promise<{ message: string, result: VideoScript | null, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generateMotion({ prompt });
        return { ...prevState, message: 'success', result, error: null, prompt };
    } catch(e: any) {
        console.error('Error in generateMotionAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt };
    }
}

export async function generateImageAction(prevState: any, formData: FormData): Promise<{ message: string, imageDataUri: string | null, error: string | null, prompt: string, style?: string, id: number }> {
    const prompt = formData.get('prompt') as string;
    const style = formData.get('style') as string;
    try {
        const { imageDataUri } = await generateImage({ prompt, style });
        return { ...prevState, message: 'success', imageDataUri, error: null, prompt, style };
    } catch (e: any) {
        console.error('Error in generateImageAction:', e);
        return { ...prevState, message: 'error', imageDataUri: null, error: e.message, prompt, style };
    }
}

export async function generateNexusAction(prevState: any, formData: FormData): Promise<{ message: string, result: Nexus | null, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generateNexus({ prompt });
        return { ...prevState, message: 'success', result, error: null, prompt };
    } catch (e: any) {
        console.error('Error in generateNexusAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt };
    }
}

export async function generatePaletteAction(prevState: any, formData: FormData): Promise<{ message: string, result: GeneratePaletteOutput | null, error: 'string' | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generatePalette({ prompt });
        return { ...prevState, message: 'success', result, error: null, prompt };
    } catch(e: any) {
        console.error('Error in generatePaletteAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt };
    }
}

export async function generatePersonaAction(prevState: any, formData: FormData): Promise<{ message: string, result: GeneratePersonaOutput | null, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generatePersona({ prompt });
        return { ...prevState, message: 'success', result, error: null, prompt };
    } catch(e: any) {
        console.error('Error in generatePersonaAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt };
    }
}

export async function generateSoundAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateSoundOutput | null, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generateSound({ prompt });
        return { ...prevState, message: 'success', result, error: null, prompt };
    } catch(e: any) {
        console.error('Error in generateSoundAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt };
    }
}

export async function generateToneAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateToneOutput | null, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generateTone({ prompt });
        return { ...prevState, message: 'success', result, error: null, prompt };
    } catch (e: any) {
        console.error('Error in generateToneAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt };
    }
}

export async function generateLightMoodAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateLightMoodOutput | null, error: string | null, id: number }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generateLightMood({ prompt });
        return { ...prevState, message: 'success', result, error: null };
    } catch (e: any) {
        console.error('Error in generateLightMoodAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message };
    }
}


const CodeActionSchema = z.object({
    prompt: z.string().min(1),
    language: z.string().min(1)
});

const ExplainCodeActionSchema = z.object({
    code: z.string().min(1),
    language: z.string().min(1)
});

const RefactorCodeActionSchema = z.object({
    prompt: z.string().min(1),
    code: z.string().min(1),
    language: z.string().min(1)
});

export async function generateCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
    const parse = CodeActionSchema.safeParse({
        prompt: formData.get('prompt'),
        language: formData.get('language'),
    });
    if (!parse.success) {
        return { id: prevState.id + 1, result: null, error: "Prompt et langage sont requis." };
    }
    return codeActions.generateCodeAction(prevState, formData);
}
export async function explainCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: ExplainCodeOutput | null, error: string | null }> {
    const parse = ExplainCodeActionSchema.safeParse({
        code: formData.get('code'),
        language: formData.get('language'),
    });
    if (!parse.success) {
        return { id: prevState.id + 1, result: null, error: "Code et langage sont requis." };
    }
    return codeActions.explainCodeAction(prevState, formData);
}
export async function debugCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: DebugCodeOutput | null, error: string | null }> {
    const parse = ExplainCodeActionSchema.safeParse({
        code: formData.get('code'),
        language: formData.get('language'),
    });
    if (!parse.success) {
        return { id: prevState.id + 1, result: null, error: "Code et langage sont requis." };
    }
    return codeActions.debugCodeAction(prevState, formData);
}
export async function refactorCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
    const parse = RefactorCodeActionSchema.safeParse({
        prompt: formData.get('prompt'),
        code: formData.get('code'),
        language: formData.get('language'),
    });
    if (!parse.success) {
        return { id: prevState.id + 1, result: null, error: "Prompt, code et langage sont requis." };
    }
    return codeActions.refactorCodeAction(prevState, formData);
}

export async function generateDeckAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateDeckOutput | null, error: string | null, id: number, prompt: string }> {
    const prompt = formData.get('prompt') as string;
    try {
        const result = await generateDeck({ prompt });
        return { ...prevState, message: 'success', result, error: null, prompt };
    } catch (e: any) {
        console.error('Error in generateDeckAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, prompt };
    }
}

export async function generateVoiceAction(prevState: any, formData: FormData): Promise<{ message: string, result: GenerateVoiceOutput | null, error: string | null, id: number, text: string, voice: string }> {
    const text = formData.get('text') as string;
    const voice = formData.get('voice') as string || 'Algenib';
    try {
        const result = await generateVoice({ text, voice });
        return { ...prevState, message: 'success', result, error: null, text, voice };
    } catch (e: any) {
        console.error('Error in generateVoiceAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message, text, voice };
    }
}

export async function reformatTextAction(
    prevState: any, 
    formData: FormData
): Promise<{ message: string; result: ReformatTextWithPromptOutput | null; error: string | null; id: number }> {
    const text = formData.get('text') as string;
    const prompt = formData.get('prompt') as string;
    try {
        const result = await reformatTextWithPrompt({ text, prompt });
        return { ...prevState, id: prevState.id + 1, message: 'success', result, error: null };
    } catch(e: any) {
        console.error('Error in reformatTextAction:', e);
        return { ...prevState, id: prevState.id + 1, message: 'error', result: null, error: e.message };
    }
}

export async function convertImageAction(prevState: any, formData: FormData) {
    const image = formData.get('image') as string;
    const outputFormat = formData.get('outputFormat') as 'jpeg' | 'png' | 'webp';
    const removeTransparency = formData.get('removeTransparency') === 'on';

    try {
        const result = await convertImage({ image, outputFormat, removeTransparency });
        return { ...prevState, message: 'success', result, error: null };
    } catch(e: any) {
        console.error('Error in convertImageAction:', e);
        return { ...prevState, message: 'error', result: null, error: e.message };
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
