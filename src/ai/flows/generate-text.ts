'use server';

/**
 * @fileOverview Un agent IA qui génère du contenu textuel.
 *
 * - generateText - Une fonction qui prend un prompt et génère du texte.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateTextInputSchema,
  type GenerateTextInput,
  GenerateTextOutputSchema,
  type GenerateTextOutput,
} from '@/ai/types';

export async function generateText(input: GenerateTextInput): Promise<GenerateTextOutput> {
  return textFlow(input);
}

const textPrompt = ai.definePrompt({
  name: 'textPrompt',
  input: { schema: GenerateTextInputSchema },
  output: { schema: GenerateTextOutputSchema },
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Vous êtes un Écrivain IA polyvalent, un maître des mots capable de s'adapter à n'importe quel format et style.
Votre mission est de générer un texte clair, concis et parfaitement adapté à la demande de l'utilisateur.

Le texte doit être bien écrit, sans fautes, et répondre directement à la demande.

Demande de l'utilisateur: {{{prompt}}}
`,
});

const textFlow = ai.defineFlow(
  {
    name: 'textFlow',
    inputSchema: GenerateTextInputSchema,
    outputSchema: GenerateTextOutputSchema,
  },
  async (input) => {
    const { output } = await textPrompt(input);
    if (!output) {
      throw new Error("L'IA n'a pas pu générer de texte. Veuillez reformuler votre demande.");
    }
    return output;
  }
);
