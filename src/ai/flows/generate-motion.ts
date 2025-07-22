'use server';

/**
 * @fileOverview Un agent IA de création de vidéo appelé (X)motion.
 *
 * - generateMotion - Une fonction qui prend un prompt et génère un script, des images et une voix off.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { GenerateMotionInput, GenerateMotionOutput, VideoScript } from '@/ai/types';
import { GenerateMotionInputSchema, VideoScriptSchema } from '@/ai/types';

// Main exported function
export async function generateMotion(input: GenerateMotionInput): Promise<GenerateMotionOutput> {
  return motionFlow(input);
}

// Prompts
const scriptPrompt = ai.definePrompt({
  name: 'motionScriptPrompt',
  input: { schema: GenerateMotionInputSchema },
  output: { schema: VideoScriptSchema },
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Vous êtes (X)motion, un réalisateur IA. Votre tâche est de transformer l'idée d'un utilisateur en un court script vidéo.
Le script doit avoir un titre et entre 3 et 6 scènes distinctes.
Le titre et la narration doivent être en **français**.

Vous devez générer :
1.  **Un titre** pour la vidéo.
2.  **Un 'coverImagePrompt'**: un prompt d'image unique et détaillé, **en anglais**, pour générer une image de couverture pour la vidéo. Ce prompt doit capturer l'essence de toute la vidéo.
3.  **Une liste de scènes**. Pour chaque scène, écrivez uniquement une narration courte (1-2 phrases).

La réponse complète doit être au format JSON valide.

Idée de l'utilisateur : {{{prompt}}}
`,
});

// Main Flow
const motionFlow = ai.defineFlow(
  {
    name: 'motionFlow',
    inputSchema: GenerateMotionInputSchema,
    outputSchema: VideoScriptSchema,
  },
  async (input) => {
    // 1. Generate the script
    const { output: script } = await scriptPrompt(input);
    if (!script || !script.scenes || !script.coverImagePrompt) {
      throw new Error("Motion AI a échoué à générer un script ou un prompt d'image.");
    }

    // 2. Return the script without generating the image
    return script;
  }
);
