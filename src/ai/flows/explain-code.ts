'use server';

/**
 * @fileOverview Un agent IA qui explique des extraits de code.
 *
 * - explainCode - Une fonction qui prend un code et son langage, puis retourne une explication claire.
 */


import type { ExplainCodeInput, ExplainCodeOutput } from '@/ai/types';


export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
  const { language, code } = input;
  const prompt = `Vous êtes (X)code, un excellent pédagogue et expert en programmation. Votre mission est d'expliquer un extrait de code de manière simple, claire et concise.\n\nL'utilisateur a fourni le code suivant en **${language}** :\n\n\\u0060\u0060\u0060\n${code}\n\u0060\u0060\u0060\n\nRédigez une explication en **français** qui couvre :\n1.  Le but principal du code.\n2.  Le fonctionnement de chaque partie importante.\n3.  Comment l'utiliser avec un exemple simple si pertinent.\n\nL'explication doit être facile à comprendre pour un développeur débutant. La réponse doit être au format JSON.`;

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
  let explanation = '';
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Find the first JSON object in the response
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      explanation = obj.explanation || '';
    }
  } catch (e) {
    throw new Error('Could not parse Gemini API response: ' + e);
  }
  return { explanation };
}

