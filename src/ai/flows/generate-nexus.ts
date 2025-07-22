'use server';

/**
 * @fileOverview Un agent IA pour créer des cartes mentales, (X)nexus.
 *
 * - generateNexus - Une fonction qui prend une idée centrale et génère une structure de carte mentale hiérarchique.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateNexusInputSchema,
  type GenerateNexusInput,
  GenerateNexusOutputSchema,
  type GenerateNexusOutput,
} from '@/ai/types';

export async function generateNexus(input: GenerateNexusInput): Promise<GenerateNexusOutput> {
  return nexusFlow(input);
}

const nexusPrompt = ai.definePrompt({
  name: 'nexusPrompt',
  input: { schema: GenerateNexusInputSchema },
  output: { schema: GenerateNexusOutputSchema },
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Vous êtes (X)nexus, un spécialiste de la visualisation d'idées et du brainstorming structuré. Votre mission est de transformer une idée centrale en une carte mentale hiérarchique et cohérente.

À partir de l'idée de l'utilisateur, vous devez générer une structure d'arbre. L'arbre doit avoir :
1.  **Un nœud racine (root)** qui reformule l'idée centrale de manière concise.
2.  **3 à 5 branches principales (enfants de la racine)** qui représentent les thèmes ou les aspects majeurs de l'idée.
3.  **2 à 4 sous-branches pour chaque branche principale**, détaillant davantage chaque thème.

Assurez-vous que chaque nœud a un 'id' unique (peut être un chemin comme "root.1.2") et un 'label' clair et concis en français.

La réponse doit être au format JSON et suivre le schéma de sortie.

Idée de l'utilisateur : {{{prompt}}}
`,
});

const nexusFlow = ai.defineFlow(
  {
    name: 'nexusFlow',
    inputSchema: GenerateNexusInputSchema,
    outputSchema: GenerateNexusOutputSchema,
  },
  async (input) => {
    const { output } = await nexusPrompt(input);
    if (!output) {
      throw new Error("(X)nexus n'a pas pu générer de carte mentale. Veuillez reformuler votre idée.");
    }
    return output;
  }
);
