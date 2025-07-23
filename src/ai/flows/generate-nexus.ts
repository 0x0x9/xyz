'use server';

/**
 * @fileOverview Un agent IA pour créer des cartes mentales, (X)nexus.
 *
 * - generateNexus - Une fonction qui prend une idée centrale et génère une structure de carte mentale hiérarchique.
 */


import type { GenerateNexusInput, GenerateNexusOutput } from '@/ai/types';


export async function generateNexus(input: GenerateNexusInput): Promise<GenerateNexusOutput> {
  const { prompt } = input;
  const fullPrompt = `Vous êtes (X)nexus, un spécialiste de la visualisation d'idées et du brainstorming structuré. Votre mission est de transformer une idée centrale en une carte mentale hiérarchique et cohérente.\n\nÀ partir de l'idée de l'utilisateur, vous devez générer une structure d'arbre. L'arbre doit avoir :\n1.  Un nœud racine (root) qui reformule l'idée centrale de manière concise.\n2.  3 à 5 branches principales (enfants de la racine) qui représentent les thèmes ou les aspects majeurs de l'idée.\n3.  2 à 4 sous-branches pour chaque branche principale, détaillant davantage chaque thème.\n\nAssurez-vous que chaque nœud a un 'id' unique (peut être un chemin comme "root.1.2") et un 'label' clair et concis en français.\n\nLa réponse doit être au format JSON et suivre le schéma de sortie.\n\nIdée de l'utilisateur : ${prompt}`;

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
  let mindMap = null;
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      mindMap = obj.root || null;
    }
  } catch (e) {
    throw new Error('Could not parse Gemini API response: ' + e);
  }
  return { mindMap };
}

