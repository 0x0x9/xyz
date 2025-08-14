
'use server';

/**
 * @fileOverview Génère un moodboard d'images à partir d'une liste de prompts.
 *
 * - generateMoodboard - Une fonction qui prend une liste de prompts et retourne les données d'image pour chacun.
 */


import type { GenerateMoodboardInput, GenerateMoodboardOutput } from '@/ai/types';
import { generateContent } from './content-generator';


export async function generateMoodboard(input: GenerateMoodboardInput): Promise<GenerateMoodboardOutput> {
  const imagePromises = input.prompts.map(prompt => generateContent({
    prompt,
    style: 'photorealistic',
    contentType: 'image'
  }));
  const imageResults = await Promise.all(imagePromises);
  const imageDataUris = imageResults.map(result => result.data as string);
  return { imageDataUris };
}
