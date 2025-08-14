
'use server';

import { generateCode } from '@/ai/flows/generate-code';
import { explainCode } from '@/ai/flows/explain-code';
import { debugCode } from '@/ai/flows/debug-code';
import { refactorCode } from '@/ai/flows/refactor-code';
import { generateFlux } from '@/ai/flows/generate-flux';
import { generateSchedule } from '@/ai/flows/generate-schedule';
import { generateImage } from '@/ai/flows/generate-image';
import { generatePalette } from '@/ai/flows/generate-palette';
import { generateTone } from '@/ai/flows/generate-tone';
import { generatePersona } from '@/ai/flows/generate-persona';
import { generateIdeas } from '@/ai/flows/generate-ideas';
import { generateMotion } from '@/ai/flows/generate-motion';
import { generateVoice } from '@/ai/flows/generate-voice';
import { generateDeck } from '@/ai/flows/generate-deck';
import { generateFrame } from '@/ai/flows/generate-frame';
import { generateSound } from '@/ai/flows/generate-sound';
import { generateNexus } from '@/ai/flows/generate-nexus';
import { reformatTextWithPrompt } from '@/ai/flows/reformat-text-with-prompt';
import { convertImage } from '@/ai/flows/convert-image';
import { generateLightMood } from '@/ai/flows/generate-light-mood';
import { generateMoodboard } from '@/ai/flows/generate-moodboard';
import { copilotLyrics } from '@/ai/flows/copilot-lyrics';
import { generateMuse } from '@/ai/flows/generate-muse';
import { createFolder } from '@/ai/flows/create-folder';
import { deleteDocument } from '@/ai/flows/delete-document';
import { deleteFolder } from '@/ai/flows/delete-folder';
import { getSignedUrl } from '@/ai/flows/get-signed-url';
import { listDocuments } from '@/ai/flows/list-documents';
import { renameDocument } from '@/ai/flows/rename-document';
import { shareDocument } from '@/ai/flows/share-document';
import { uploadDocument } from '@/ai/flows/upload-document';
import { createManualProject, oriaChat, parseEvent } from '@/ai/flows/client-actions';

import type {
  GenerateCodeOutput,
  ExplainCodeOutput,
  DebugCodeOutput,
  RefactorCodeInput,
  GenerateFluxOutput,
  ProjectPlan,
  GenerateImageOutput,
  GeneratePaletteOutput,
  GenerateToneOutput,
  GeneratePersonaOutput,
  GenerateIdeasOutput,
  GenerateMotionOutput,
  GenerateVoiceOutput,
  GenerateDeckOutput,
  GenerateFrameOutput,
  GenerateSoundOutput,
  GenerateNexusOutput,
  ReformatTextWithPromptOutput,
  ConvertImageOutput,
  GenerateLightMoodOutput,
  GenerateMoodboardOutput,
  CopilotLyricsOutput,
  GenerateMuseOutput,
  OriaChatOutput,
  AgendaEvent,
} from '@/ai/types';

import {
  GenerateCodeInputSchema,
  ExplainCodeInputSchema,
  DebugCodeInputSchema,
  RefactorCodeInputSchema,
  GenerateFluxInputSchema,
  GenerateScheduleInputSchema,
  GenerateImageInputSchema,
  GeneratePaletteInputSchema,
  GenerateToneInputSchema,
  GeneratePersonaInputSchema,
  GenerateIdeasInputSchema,
  GenerateMotionInputSchema,
  GenerateVoiceInputSchema,
  GenerateDeckInputSchema,
  GenerateFrameInputSchema,
  GenerateSoundInputSchema,
  GenerateNexusInputSchema,
  ReformatTextWithPromptInputSchema,
  ConvertImageInputSchema,
  GenerateLightMoodInputSchema,
  CopilotLyricsInputSchema,
  GenerateMuseInputSchema,
  OriaChatInputSchema,
  ParseEventInputSchema,
} from '@/ai/types';

const createErrorResponse = (e: any, id: number) => {
  const errorMessage = e.message || 'An unknown error occurred.';
  console.error('AI Action Error:', errorMessage);
  return { id: id + 1, result: null, error: errorMessage };
};

// Generic function to create server actions
function createAction<TInput, TOutput>(
  schema: Zod.Schema<TInput>,
  flow: (input: TInput) => Promise<TOutput>
) {
  return async (
    prevState: any,
    formData: FormData
  ): Promise<{ id: number; result: TOutput | null; error: string | null; }> => {
    const parseResult = schema.safeParse(Object.fromEntries(formData));
    if (!parseResult.success) {
      const error = parseResult.error.errors.map(e => e.message).join(', ');
      return { id: prevState.id + 1, result: null, error };
    }
    try {
      const result = await flow(parseResult.data);
      return { id: prevState.id + 1, result, error: null };
    } catch (e: any) {
      return createErrorResponse(e, prevState.id);
    }
  };
}

export const generateCodeAction = createAction(GenerateCodeInputSchema, generateCode);
export const explainCodeAction = createAction(ExplainCodeInputSchema, explainCode);
export const debugCodeAction = createAction(DebugCodeInputSchema, debugCode);
export const refactorCodeAction = createAction(RefactorCodeInputSchema, refactorCode);
export const fluxAction = createAction(GenerateFluxInputSchema, generateFlux);
export const generateScheduleAction = createAction(GenerateScheduleInputSchema, generateSchedule);
export const generateImageAction = async (prevState: any, formData: FormData): Promise<{ id: number, message: string, imageDataUri: string | null, error: string | null, prompt: string }> => {
    const parseResult = GenerateImageInputSchema.safeParse(Object.fromEntries(formData));
    if (!parseResult.success) {
      const error = parseResult.error.errors.map(e => e.message).join(', ');
      return { id: prevState.id + 1, message: 'error', imageDataUri: null, error, prompt: '' };
    }
    try {
      const result = await generateImage(parseResult.data);
      return { id: prevState.id + 1, message: 'success', imageDataUri: result.imageDataUri, error: null, prompt: parseResult.data.prompt };
    } catch (e: any) {
      return { id: prevState.id + 1, message: 'error', imageDataUri: null, error: e.message, prompt: parseResult.data.prompt };
    }
}
export const generatePaletteAction = createAction(GeneratePaletteInputSchema, generatePalette);
export const generateToneAction = createAction(GenerateToneInputSchema, generateTone);
export const generatePersonaAction = createAction(GeneratePersonaInputSchema, generatePersona);
export const generateIdeasAction = createAction(GenerateIdeasInputSchema, generateIdeas);
export const generateMotionAction = createAction(GenerateMotionInputSchema, generateMotion);
export const generateVoiceAction = createAction(GenerateVoiceInputSchema, generateVoice);
export const generateDeckAction = createAction(GenerateDeckInputSchema, generateDeck);
export const generateFrameAction = createAction(GenerateFrameInputSchema, generateFrame);
export const generateSoundAction = createAction(GenerateSoundInputSchema, generateSound);
export const generateNexusAction = createAction(GenerateNexusInputSchema, generateNexus);
export const reformatTextAction = createAction(ReformatTextWithPromptInputSchema, reformatTextWithPrompt);
export const convertImageAction = async (prevState: any, formData: FormData): Promise<{ id: number, message: string, result: ConvertImageOutput | null, error: string | null }> => {
    const imageFile = formData.get('imageFile') as File;
    const outputFormat = formData.get('outputFormat') as 'jpeg' | 'png' | 'webp';
    const removeTransparency = formData.get('removeTransparency') === 'on';

    if (!imageFile || imageFile.size === 0) {
        // Fallback to data URI if file is not there (e.g. from a previous state)
        const imageUri = formData.get('image') as string;
        if (!imageUri) return { id: prevState.id + 1, message: 'error', result: null, error: 'Aucune image fournie.' };
        
        const result = await convertImage({ image: imageUri, outputFormat, removeTransparency });
        return { id: prevState.id + 1, message: 'success', result, error: null };
    }

    const image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(imageFile);
    });

    try {
        const result = await convertImage({ image, outputFormat, removeTransparency });
        return { id: prevState.id + 1, message: 'success', result, error: null };
    } catch (e: any) {
        return createErrorResponse(e, prevState.id);
    }
};

export const generateLightMoodAction = createAction(GenerateLightMoodInputSchema, generateLightMood);

export async function generateMoodboardAction(prompts: string[]): Promise<{ message: string, imageDataUris: string[] | null, error: string | null }> {
    try {
        const result = await generateMoodboard({ prompts });
        return { message: 'success', imageDataUris: result.imageDataUris, error: null };
    } catch(e: any) {
        return { message: 'error', imageDataUris: null, error: e.message };
    }
}
export const copilotLyricsAction = async (prevState: any, formData: FormData): Promise<{ success: boolean, suggestions: string[] | null, error: string | null, action: 'ENHANCE' | 'RHYMES' | undefined }> => {
    const parseResult = CopilotLyricsInputSchema.safeParse(Object.fromEntries(formData));
    if (!parseResult.success) {
      const error = parseResult.error.errors.map(e => e.message).join(', ');
      return { success: false, suggestions: null, error, action: undefined };
    }
    try {
        const result = await copilotLyrics(parseResult.data);
        return { success: true, suggestions: result.suggestions, error: null, action: parseResult.data.action };
    } catch (e: any) {
        return { success: false, suggestions: null, error: e.message, action: parseResult.data.action };
    }
};

export const generateMuseAction = createAction(GenerateMuseInputSchema, generateMuse);
export const createFolderAction = createAction(createFolder.inputSchema, createFolder);
export const deleteDocumentAction = createAction(deleteDocument.inputSchema, deleteDocument);
export const deleteFolderAction = createAction(deleteFolder.inputSchema, deleteFolder);
export const getSignedUrlAction = createAction(getSignedUrl.inputSchema, getSignedUrl);
export const listDocumentsAction = async () => listDocuments();
export const renameDocumentAction = createAction(renameDocument.inputSchema, renameDocument);
export const shareDocumentAction = createAction(shareDocument.inputSchema, shareDocument);
export const uploadDocumentAction = createAction(uploadDocument.inputSchema, uploadDocument);
export const oriaChatAction = createAction(OriaChatInputSchema, oriaChat);
export const parseEventAction = async (prevState: any, formData: FormData): Promise<{ id: number, success: boolean, event: AgendaEvent | null, error: string | null }> => {
    const prompt = formData.get('prompt') as string;
    if (!prompt) return { id: prevState.id + 1, success: false, event: null, error: 'Prompt is required.' };
    
    try {
        const event = await parseEvent({ prompt, currentDate: new Date().toISOString() });
        return { id: prevState.id + 1, success: true, event, error: null };
    } catch (e: any) {
        return { id: prevState.id + 1, success: false, event: null, error: e.message };
    }
};
export const uploadMuseDocumentAction = uploadDocumentAction;

export async function getActionResult(resultId: string): Promise<{ result: any; prompt: string | null } | null> {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(resultId);
        if (stored) {
            localStorage.removeItem(resultId);
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored result", e);
                return null;
            }
        }
    }
    return null;
}
