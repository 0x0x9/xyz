
'use server';

/**
 * @fileOverview This file aggregates all code-related AI flows into a single file for easier import into the UI.
 * It re-exports the functions from the individual flow files.
 */

import { generateCode } from './generate-code';
import { explainCode } from './explain-code';
import { debugCode } from './debug-code';
import { refactorCode } from './refactor-code';
import type { GenerateCodeOutput, ExplainCodeOutput, DebugCodeOutput, RefactorCodeInput } from '@/ai/types';

const createErrorResponse = (e: any, id: number) => {
    const errorMessage = e.message || "An unknown error occurred.";
    console.error("AI Action Error:", errorMessage);
    return { id: id + 1, result: null, error: errorMessage };
}

export async function generateCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
    try {
        const result = await generateCode({ 
            prompt: formData.get('prompt') as string,
            language: formData.get('language') as string,
        });
        return { id: prevState.id + 1, result, error: null };
    } catch (e: any) {
        return createErrorResponse(e, prevState.id);
    }
}

export async function explainCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: ExplainCodeOutput | null, error: string | null }> {
    try {
        const result = await explainCode({
            code: formData.get('code') as string,
            language: formData.get('language') as string,
        });
        return { id: prevState.id + 1, result, error: null };
    } catch (e: any) {
        return createErrorResponse(e, prevState.id);
    }
}

export async function debugCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: DebugCodeOutput | null, error: string | null }> {
    try {
        const result = await debugCode({
            code: formData.get('code') as string,
            language: formData.get('language') as string,
        });
        return { id: prevState.id + 1, result, error: null };
    } catch (e: any) {
        return createErrorResponse(e, prevState.id);
    }
}

export async function refactorCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
     try {
        const result = await refactorCode({
            prompt: formData.get('prompt') as string,
            code: formData.get('code') as string,
            language: formData.get('language') as string,
        } as RefactorCodeInput);
        return { id: prevState.id + 1, result, error: null };
    } catch (e: any) {
        return createErrorResponse(e, prevState.id);
    }
}

// Re-export original functions for potential direct server-side use
export { generateCode, explainCode, debugCode, refactorCode };
