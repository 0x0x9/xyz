'use server';
/**
 * @fileOverview A text reformatting AI agent.
 *
 * - reformatTextWithPrompt - A function that handles the text reformatting process.
 * - ReformatTextWithPromptInput - The input type for the reformatTextWithPrompt function.
 * - ReformatTextWithPromptOutput - The return type for the reformatTextWithPrompt function.
 */

import {ai} from '@/ai/genkit';
import {ReformatTextWithPromptInputSchema, ReformatTextWithPromptOutputSchema, type ReformatTextWithPromptInput, type ReformatTextWithPromptOutput } from '@/ai/types';

export async function reformatTextWithPrompt(input: ReformatTextWithPromptInput): Promise<ReformatTextWithPromptOutput> {
  return reformatTextWithPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reformatTextWithPromptPrompt',
  input: {schema: ReformatTextWithPromptInputSchema},
  output: {schema: ReformatTextWithPromptOutputSchema},
  prompt: `You are a text transformation expert. Your task is to reformat the given text based *only* on the provided prompt, without adding any extra conversational text or explanations.

Text to transform:
---
{{{text}}}
---

Transformation instruction:
---
{{{prompt}}}
---

Return *only* the transformed text in the 'reformattedText' field of the JSON output.`,
});

const reformatTextWithPromptFlow = ai.defineFlow(
  {
    name: 'reformatTextWithPromptFlow',
    inputSchema: ReformatTextWithPromptInputSchema,
    outputSchema: ReformatTextWithPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("L'IA n'a pas pu reformater le texte.");
    }
    return output;
  }
);
