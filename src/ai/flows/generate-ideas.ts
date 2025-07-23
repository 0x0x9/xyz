'use server';

/**
 * @fileOverview Un agent IA de génération d'idées appelé (X)promptor.
 *
 * - generateIdeas - Une fonction qui prend une idée vague et génère des prompts créatifs concrets.
 */


import type { GenerateIdeasInput, GenerateIdeasOutput } from '@/ai/types';


export async function generateIdeas(input: GenerateIdeasInput): Promise<GenerateIdeasOutput> {
  const { prompt } = input;
  const fullPrompt = `Vous êtes (X)promptor, un assistant créatif expert en brainstorming. Votre rôle est de transformer une idée vague en pistes créatives concrètes et inspirantes. La réponse doit être en français, sauf pour le champ 'imagePrompts' qui doit être en anglais pour une meilleure compatibilité avec les modèles de génération d'images.\n\nIdée de l'utilisateur : ${prompt}\n\nGénérez une réponse JSON qui correspond au schéma de sortie. Pour cela, remplissez les champs suivants :\n1.  **imagePrompts**: Créez une liste de 3 prompts d'image très détaillés et descriptifs, en anglais.\n2.  **titles**: Proposez une liste de 3 suggestions de titres originaux et accrocheurs, en français.\n3.  **styles**: Suggérez une liste de 3 styles artistiques, genres ou tons qui pourraient correspondre à l'idée.`;

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            { text: fullPrompt }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Gemini API: ' + response.statusText);
  }

  const data = await response.json();
  let imagePrompts: string[] = [];
  let titles: string[] = [];
  let styles: string[] = [];
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Find the first JSON object in the response
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      imagePrompts = obj.imagePrompts || [];
      titles = obj.titles || [];
      styles = obj.styles || [];
    }
  } catch (e) {
    throw new Error('Could not parse Gemini API response: ' + e);
  }
  return { imagePrompts, titles, styles };
}

