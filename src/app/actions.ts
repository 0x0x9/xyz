
'use server';

import {
  generateCode,
  explainCode,
  debugCode,
  refactorCode,
} from './ai-flows';
import type {
  GenerateCodeOutput,
  ExplainCodeOutput,
  DebugCodeOutput,
  RefactorCodeInput,
} from '@/ai/types';
import {
  GenerateCodeInputSchema,
  ExplainCodeInputSchema,
  DebugCodeInputSchema,
  RefactorCodeInputSchema,
} from '@/ai/types';

const createErrorResponse = (e: any, id: number) => {
  const errorMessage = e.message || 'An unknown error occurred.';
  console.error('AI Action Error:', errorMessage);
  return { id: id + 1, result: null, error: errorMessage };
};

export async function generateCodeAction(
  prevState: any,
  formData: FormData
): Promise<{ id: number; result: GenerateCodeOutput | null; error: string | null }> {
  const parseResult = GenerateCodeInputSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!parseResult.success) {
    return {
      id: prevState.id + 1,
      result: null,
      error: 'Prompt et langage sont requis.',
    };
  }
  try {
    const result = await generateCode(parseResult.data);
    return { id: prevState.id + 1, result, error: null };
  } catch (e: any) {
    return createErrorResponse(e, prevState.id);
  }
}

export async function explainCodeAction(
  prevState: any,
  formData: FormData
): Promise<{ id: number; result: ExplainCodeOutput | null; error: string | null }> {
  const parseResult = ExplainCodeInputSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!parseResult.success) {
    return {
      id: prevState.id + 1,
      result: null,
      error: 'Code et langage sont requis.',
    };
  }
  try {
    const result = await explainCode(parseResult.data);
    return { id: prevState.id + 1, result, error: null };
  } catch (e: any) {
    return createErrorResponse(e, prevState.id);
  }
}

export async function debugCodeAction(
  prevState: any,
  formData: FormData
): Promise<{ id: number; result: DebugCodeOutput | null; error: string | null }> {
  const parseResult = DebugCodeInputSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!parseResult.success) {
    return {
      id: prevState.id + 1,
      result: null,
      error: 'Code et langage sont requis.',
    };
  }
  try {
    const result = await debugCode(parseResult.data);
    return { id: prevState.id + 1, result, error: null };
  } catch (e: any) {
    return createErrorResponse(e, prevState.id);
  }
}

export async function refactorCodeAction(
  prevState: any,
  formData: FormData
): Promise<{ id: number; result: GenerateCodeOutput | null; error: string | null }> {
  const parseResult = RefactorCodeInputSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!parseResult.success) {
    return {
      id: prevState.id + 1,
      result: null,
      error: 'Prompt, code et langage sont requis.',
    };
  }
  try {
    const result = await refactorCode(parseResult.data as RefactorCodeInput);
    return { id: prevState.id + 1, result, error: null };
  } catch (e: any) {
    return createErrorResponse(e, prevState.id);
  }
}
