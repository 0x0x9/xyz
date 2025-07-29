'use server';

/**
 * @fileOverview Un agent IA pour l'écriture de récits, (X)story.
 *
 * - generateStory - Une fonction qui prend un concept et génère une structure narrative complète.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateStoryInputSchema,
  type GenerateStoryInput,
  GenerateStoryOutputSchema,
  type GenerateStoryOutput,
} from '@/ai/types';

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  return storyFlow(input);
}

const storyPrompt = ai.definePrompt({
  name: 'storyPrompt',
  input: { schema: GenerateStoryInputSchema },
  output: { schema: GenerateStoryOutputSchema },
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Vous êtes (X)story, un scénariste et architecte narratif expert. Votre mission est de transformer une idée brute en une histoire structurée et captivante.

Le concept de base de l'utilisateur est : **{{{prompt}}}**
{{#if characters}}
Description des personnages : **{{{characters}}}**
{{/if}}
{{#if style}}
Style d'écriture demandé : **{{{style}}}**
{{/if}}

À partir de ces informations, vous devez générer une structure narrative complète. Assurez-vous que tous les éléments sont cohérents entre eux.

Votre réponse doit être un objet JSON valide qui respecte scrupuleusement le schéma de sortie, incluant :
1.  **title**: Un titre original et pertinent pour l'histoire.
2.  **logline**: Un résumé de l'histoire en une seule phrase percutante qui capture le conflit principal.
3.  **synopsis**: Un résumé détaillé de l'intrigue en 3 à 5 paragraphes, couvrant le début, le milieu et la fin.
4.  **characterProfiles**: Des fiches pour 2 ou 3 personnages principaux, avec leur nom, une description de leur personnalité et de leur rôle, et leurs motivations profondes.
5.  **chapterOutlines**: Un plan détaillé d'au moins 5 chapitres, chacun avec un titre et un résumé de ses événements clés.`,
});

const storyFlow = ai.defineFlow(
  {
    name: 'storyFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async (input) => {
    const { output } = await storyPrompt(input);
    if (!output) {
      throw new Error("(X)story n'a pas pu générer d'histoire. Veuillez reformuler votre idée.");
    }
    return output;
  }
);
