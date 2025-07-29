'use server';

/**
 * @fileOverview Génère une image à partir d'un prompt et d'un style fournis par l'utilisateur.
 *
 * - generateImage - Une fonction qui prend un prompt et un style, et retourne des données d'image.
 */
import { ai } from '@/ai/genkit';
import type { GenerateImageInput, GenerateImageOutput } from '@/ai/types';

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  let finalPrompt = input.prompt;
  if (input.style && input.style !== 'none') {
    finalPrompt = `${input.prompt}, style ${input.style}`;
  }

  const { media } = await ai.generate({
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    prompt: finalPrompt,
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  if (!media?.url) {
    throw new Error('Image generation failed to produce an output.');
  }

  return { imageDataUri: media.url };
}
