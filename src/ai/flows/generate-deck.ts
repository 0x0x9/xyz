'use server';
/**
 * @fileOverview Un agent IA qui génère des présentations, (X)deck.
 *
 * - generateDeck - Une fonction qui prend un sujet et génère une présentation complète.
 */


import type { GenerateDeckInput, GenerateDeckOutput } from '@/ai/types';


export async function generateDeck(input: GenerateDeckInput): Promise<GenerateDeckOutput> {
  const { prompt } = input;
  const fullPrompt = `Vous êtes (X)deck, un concepteur de présentations expert. Votre mission est de transformer un sujet en une présentation structurée, claire et visuellement inspirante.\n\nLe sujet est : ${prompt}\n\nVous devez générer :\n1.  Un titre de présentation percutant.\n2.  Une série de 5 à 8 diapositives. Chaque diapositive doit inclure :\n    *   Un titre clair et concis.\n    *   Du contenu sous forme d'une liste de 2 à 4 points clés.\n    *   Un prompt d'image (imagePrompt) détaillé, en anglais, pour illustrer la diapositive.\n    *   Des notes pour l'orateur (speakerNotes) qui développent les points clés.\n\nLa réponse doit être en français (sauf pour imagePrompt) et au format JSON.`;

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
  let slides: any[] = [];
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      title = obj.title || '';
      slides = obj.slides || [];
    }
  } catch (e) {
    throw new Error('Could not parse Gemini API response: ' + e);
  }
  return { title, slides };
}

