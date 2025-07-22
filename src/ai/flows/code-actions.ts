
'use server';

/**
 * @fileOverview This file aggregates all code-related AI flows into a single file for easier import into the UI.
 * It re-exports the functions from the individual flow files.
 */

import { generateCode } from './generate-code';
import { explainCode } from './explain-code';
import { debugCode } from './debug-code';
import { refactorCode } from './refactor-code';
import type { GenerateCodeOutput, ExplainCodeOutput, DebugCodeOutput, GenerateCodeInput } from '@/ai/types';

// Helper function to handle form state for client components
async function handleFormAction<T_Input, T_Output>(
    action: (input: T_Input) => Promise<T_Output>,
    prevState: { id: number; result: T_Output | null; error: string | null },
    formData: FormData
): Promise<{ id: number; result: T_Output | null; error: string | null }> {
    try {
        const input = Object.fromEntries(formData.entries()) as T_Input;
        const result = await action(input);
        return { id: prevState.id + 1, result, error: null };
    } catch (e: any) {
        console.error(e);
        return { id: prevState.id + 1, result: null, error: e.message || "An unknown error occurred." };
    }
}

// Re-exporting flows wrapped in server actions compatible with useFormState

export async function generateCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
    return handleFormAction(generateCode, prevState, formData);
}

export async function explainCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: ExplainCodeOutput | null, error: string | null }> {
    return handleFormAction(explainCode, prevState, formData);
}

export async function debugCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: DebugCodeOutput | null, error: string | null }> {
    return handleFormAction(debugCode, prevState, formData);
}

export async function refactorCodeAction(prevState: any, formData: FormData): Promise<{ id: number, result: GenerateCodeOutput | null, error: string | null }> {
    return handleFormAction(refactorCode, prevState, formData);
}

// Re-export original functions for potential direct server-side use
export { generateCode, explainCode, debugCode, refactorCode };
