'use server';

/**
 * @fileOverview Un copilote IA pour l'écriture de paroles.
 *
 * - copilotLyrics - Une fonction qui analyse une sélection de texte et suggère des améliorations ou des rimes.
 */


import type { CopilotLyricsInput, CopilotLyricsOutput } from '@/ai/types';


export async function copilotLyrics(input: CopilotLyricsInput): Promise<CopilotLyricsOutput> {
  const { mood, fullText, textToEdit, action } = input;
  const prompt = `Vous êtes (X)muse, un parolier expert et un poète. Votre rôle est d'assister un artiste dans son processus d'écriture. L'ambiance générale du morceau est : **${mood}**.\n\nVoici le texte complet sur lequel il travaille :\n---\n${fullText}\n---\n\nL'artiste a sélectionné la portion de texte suivante : \"${textToEdit}\"\n\nLa tâche demandée est : **${action}**.\n\n- Si la tâche est 'ENHANCE', proposez 3 à 5 manières alternatives et améliorées de cette sélection. Les suggestions doivent respecter l'ambiance et le style du texte. Pensez à varier le vocabulaire, utiliser des métaphores, améliorer le rythme ou la fluidité. Ne vous contentez pas de reformuler, enrichissez le propos.\n- Si la tâche est 'RHYMES', proposez une liste de 5 à 10 rimes (mots ou courtes expressions) pour le dernier mot de la sélection. Les rimes doivent être pertinentes par rapport au thème et à l'ambiance. Proposez des rimes riches, suffisantes et pauvres pour donner un maximum de choix.\n\nRépondez **uniquement** avec un objet JSON valide qui respecte ce schéma : { \"suggestions\": [\"suggestion 1\", \"suggestion 2\", ...] }.`;

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
            { text: prompt }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Gemini API: ' + response.statusText);
  }

  const data = await response.json();
  // Try to extract the JSON object from the response text
  let suggestions: string[] = [];
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Find the first JSON object in the response
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      suggestions = obj.suggestions || [];
    }
  } catch (e) {
    throw new Error('Could not parse Gemini API response: ' + e);
  }
  return { suggestions };
}

