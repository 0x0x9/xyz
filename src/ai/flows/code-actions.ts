
'use server';

/**
 * @fileOverview This file aggregates all code-related AI flows into a single file for easier import into the UI.
 * It re-exports the functions from the individual flow files.
 */

import { generateCode } from './generate-code';
import { explainCode } from './explain-code';
import { debugCode } from './debug-code';
import { refactorCode } from './refactor-code';
import type { GenerateCodeOutput, ExplainCodeOutput, DebugCodeOutput, GenerateCodeInput, RefactorCodeInput } from '@/ai/types';

// Helper function to create a consistent response structure
function createResponse<T>(data: T | null, error: string | null = null, idDelta = 1) {
    return (prevState: { id: number }) => ({
        id: prevState.id + idDelta,
        result: data,
        error: error,
    });
}

// Re-exporting flows wrapped in server actions compatible with useFormState

export async function generateCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
    try {
        const result = await generateCode({ 
            prompt: formData.get('prompt') as string,
            language: formData.get('language') as string,
        });
        return createResponse(result)(prevState);
    } catch (e: any) {
        return createResponse(null, e.message || "An unknown error occurred.")(prevState);
    }
}

export async function explainCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: ExplainCodeOutput | null, error: string | null }> {
    try {
        const result = await explainCode({
            code: formData.get('code') as string,
            language: formData.get('language') as string,
        });
        return createResponse(result)(prevState);
    } catch (e: any) {
        return createResponse(null, e.message || "An unknown error occurred.")(prevState);
    }
}

export async function debugCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: DebugCodeOutput | null, error: string | null }> {
    try {
        const result = await debugCode({
            code: formData.get('code') as string,
            language: formData.get('language') as string,
        });
        return createResponse(result)(prevState);
    } catch (e: any) {
        return createResponse(null, e.message || "An unknown error occurred.")(prevState);
    }
}

export async function refactorCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
     try {
        const result = await refactorCode({
            prompt: formData.get('prompt') as string,
            code: formData.get('code') as string,
            language: formData.get('language') as string,
        });
        return createResponse(result)(prevState);
    } catch (e: any) {
        return createResponse(null, e.message || "An unknown error occurred.")(prevState);
    }
}

// Re-export original functions for potential direct server-side use
export { generateCode, explainCode, debugCode, refactorCode };
