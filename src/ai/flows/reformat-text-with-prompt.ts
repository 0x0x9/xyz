'use server';
/**
 * @fileOverview A text reformatting AI agent.
 *
 * - reformatTextWithPrompt - A function that handles the text reformatting process.
 * - ReformatTextWithPromptInput - The input type for the reformatTextWithPrompt function.
 * - ReformatTextWithPromptOutput - The return type for the reformatTextWithPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReformatTextWithPromptInputSchema = z.object({
  text: z.string().describe('The text to be reformatted.'),
  prompt: z.string().describe('The prompt to guide the reformatting process.'),
});
export type ReformatTextWithPromptInput = z.infer<typeof ReformatTextWithPromptInputSchema>;

const ReformatTextWithPromptOutputSchema = z.object({
  reformattedText: z.string().describe('The reformatted text.'),
});
export type ReformatTextWithPromptOutput = z.infer<typeof ReformatTextWithPromptOutputSchema>;

export async function reformatTextWithPrompt(input: ReformatTextWithPromptInput): Promise<ReformatTextWithPromptOutput> {
  return reformatTextWithPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reformatTextWithPromptPrompt',
  input: {schema: ReformatTextWithPromptInputSchema},
  output: {schema: ReformatTextWithPromptOutputSchema},
  prompt: `Reformat the following text according to the prompt.

Text: {{{text}}}
Prompt: {{{prompt}}}

Reformatted Text:`, 
});

const reformatTextWithPromptFlow = ai.defineFlow(
  {
    name: 'reformatTextWithPromptFlow',
    inputSchema: ReformatTextWithPromptInputSchema,
    outputSchema: ReformatTextWithPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
