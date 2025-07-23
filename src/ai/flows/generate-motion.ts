'use server';

/**
 * @fileOverview Un agent IA de création de vidéo appelé (X)motion.
 *
 * - generateMotion - Une fonction qui prend un prompt et génère un script, des images et une voix off.
 */


import type { GenerateMotionInput, GenerateMotionOutput } from '@/ai/types';


export async function generateMotion(input: GenerateMotionInput): Promise<GenerateMotionOutput> {
  const { prompt } = input;
  const fullPrompt = `Vous êtes (X)motion, un réalisateur IA. Votre tâche est de transformer l'idée d'un utilisateur en un court script vidéo.\nLe script doit avoir un titre et entre 3 et 6 scènes distinctes.\nLe titre et la narration doivent être en **français**.\n\nVous devez générer :\n1.  Un titre pour la vidéo.\n2.  Un 'coverImagePrompt': un prompt d'image unique et détaillé, **en anglais**, pour générer une image de couverture pour la vidéo. Ce prompt doit capturer l'essence de toute la vidéo.\n3.  Une liste de scènes. Pour chaque scène, écrivez uniquement une narration courte (1-2 phrases).\n\nLa réponse complète doit être au format JSON valide.\n\nIdée de l'utilisateur : ${prompt}`;

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
  let title = '';
  let coverImagePrompt = '';
  let scenes: any[] = [];
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      title = obj.title || '';
      coverImagePrompt = obj.coverImagePrompt || '';
      scenes = obj.scenes || [];
    }
  } catch (e) {
    throw new Error('Could not parse Gemini API response: ' + e);
  }
  return { title, coverImagePrompt, scenes };
}

