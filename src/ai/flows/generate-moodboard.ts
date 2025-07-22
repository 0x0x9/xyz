'use server';

/**
 * @fileOverview Génère un moodboard d'images à partir d'une liste de prompts.
 *
 * - generateMoodboard - Une fonction qui prend une liste de prompts et retourne les données d'image pour chacun.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateMoodboardInputSchema,
  type GenerateMoodboardInput,
  GenerateMoodboardOutputSchema,
  type GenerateMoodboardOutput,
} from '@/ai/types';
import { generateImage } from './generate-image';

export async function generateMoodboard(input: GenerateMoodboardInput): Promise<GenerateMoodboardOutput> {
  return generateMoodboardFlow(input);
}


const generateMoodboardFlow = ai.defineFlow(
  {
    name: 'generateMoodboardFlow',
    inputSchema: GenerateMoodboardInputSchema,
    outputSchema: GenerateMoodboardOutputSchema,
  },
  async (input) => {
    const imagePromises = input.prompts.map(prompt => generateImage({ prompt }));
    const imageResults = await Promise.all(imagePromises);
    const imageDataUris = imageResults.map(result => result.imageDataUri);
    
    return { imageDataUris };
  }
);
