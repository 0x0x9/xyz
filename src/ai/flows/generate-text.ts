'use server';

/**
 * @fileOverview Un agent IA qui génère du contenu textuel.
 *
 * - generateText - Une fonction qui prend un prompt et génère du texte.
 */

import { ai } from '@/ai/genkit';
import type { GenerateTextInput, GenerateTextOutput } from '@/ai/types';

export async function generateText(input: GenerateTextInput): Promise<GenerateTextOutput> {
  const { text } = await ai.generate({
      prompt: input.prompt,
  });

  return {
    text: text || "Aucune réponse générée.",
  };
}
