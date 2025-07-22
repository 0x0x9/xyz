'use server';

/**
 * @fileOverview Generates creative ideas based on a prompt.
 *
 * - generateCreativeIdeas - A function that generates creative ideas.
 * - GenerateCreativeIdeasInput - The input type for the generateCreativeIdeas function.
 * - GenerateCreativeIdeasOutput - The return type for the generateCreativeIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCreativeIdeasInputSchema = z.object({
  prompt: z.string().describe('A prompt to generate creative ideas from.'),
});

export type GenerateCreativeIdeasInput = z.infer<typeof GenerateCreativeIdeasInputSchema>;

const GenerateCreativeIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of creative ideas.'),
});

export type GenerateCreativeIdeasOutput = z.infer<typeof GenerateCreativeIdeasOutputSchema>;

export async function generateCreativeIdeas(input: GenerateCreativeIdeasInput): Promise<GenerateCreativeIdeasOutput> {
  return generateCreativeIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCreativeIdeasPrompt',
  input: {schema: GenerateCreativeIdeasInputSchema},
  output: {schema: GenerateCreativeIdeasOutputSchema},
  prompt: `You are a creative idea generator. Generate a list of creative ideas based on the following prompt:\n\nPrompt: {{{prompt}}}`,
});

const generateCreativeIdeasFlow = ai.defineFlow(
  {
    name: 'generateCreativeIdeasFlow',
    inputSchema: GenerateCreativeIdeasInputSchema,
    outputSchema: GenerateCreativeIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
