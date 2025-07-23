'use server';

/**
 * @fileOverview Un agent IA qui génère du contenu textuel.
 *
 * - generateText - Une fonction qui prend un prompt et génère du texte.
 */


import type { GenerateTextInput, GenerateTextOutput } from '@/ai/types';

export async function generateText(input: GenerateTextInput): Promise<GenerateTextOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY manquante dans les variables d\'environnement');
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: input.prompt }] }]
    })
  });
  const data = await response.json();
  return {
    text: data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse générée.",
  };
}
