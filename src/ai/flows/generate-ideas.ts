'use server';

/**
 * @fileOverview Un agent IA de génération d'idées appelé (X)promptor.
 *
 * - generateIdeas - Une fonction qui prend une idée vague et génère des prompts créatifs concrets.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateIdeasInputSchema,
  type GenerateIdeasInput,
  GenerateIdeasOutputSchema,
  type GenerateIdeasOutput,
} from '@/ai/types';

export async function generateIdeas(input: GenerateIdeasInput): Promise<GenerateIdeasOutput> {
  return promptorFlow(input);
}

const promptorPrompt = ai.definePrompt({
  name: 'promptorPrompt',
  input: { schema: GenerateIdeasInputSchema },
  output: { schema: GenerateIdeasOutputSchema },
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Vous êtes (X)promptor, un assistant créatif expert en brainstorming. Votre rôle est de transformer une idée vague en pistes créatives concrètes et inspirantes. La réponse doit être en français, sauf pour le champ 'imagePrompts' qui doit être en anglais pour une meilleure compatibilité avec les modèles de génération d'images.

Idée de l'utilisateur : {{{prompt}}}

Générez une réponse JSON qui correspond au schéma de sortie. Pour cela, remplissez les champs suivants :
1.  **imagePrompts**: Créez une liste de 3 prompts d'image très détaillés et descriptifs, en anglais.
2.  **titles**: Proposez une liste de 3 suggestions de titres originaux et accrocheurs, en français.
3.  **styles**: Suggérez une liste de 3 styles artistiques, genres ou tons qui pourraient correspondre à l'idée.
`,
});

const promptorFlow = ai.defineFlow(
  {
    name: 'promptorFlow',
    inputSchema: GenerateIdeasInputSchema,
    outputSchema: GenerateIdeasOutputSchema,
  },
  async (input) => {
    const { output } = await promptorPrompt(input);
    if (!output) {
      throw new Error("(X)promptor n'a pas pu générer d'idées. Veuillez reformuler votre demande.");
    }
    return output;
  }
);
