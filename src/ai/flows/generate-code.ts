'use server';

/**
 * @fileOverview Un agent IA pour les développeurs qui génère des extraits de code.
 *
 * - generateCode - Une fonction qui prend une requête et génère du code et une explication.
 */


import type { GenerateCodeInput, GenerateCodeOutput } from '@/ai/types';


export async function generateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  const { language, prompt } = input;
  const fullPrompt = `Vous êtes (X)code, un assistant développeur IA expert. Votre tâche est de générer un extrait de code de haute qualité, prêt à l'emploi, basé sur la demande de l'utilisateur, accompagné d'une explication claire.\n\nL'utilisateur souhaite un snippet en **${language}**.\n\nDemande de l'utilisateur : ${prompt}\n\nVotre réponse doit être au format JSON et inclure :\n1.  **explanation**: Une explication claire et concise en **français** de ce que fait le code et de toute considération importante.\n2.  **code**: Le bloc de code généré. Il est absolument essentiel que le code soit encapsulé dans un bloc markdown avec l'identifiant de langage correct (par exemple, \`\`\`typescript ... \`\`\`).`;

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
  let explanation = '';
  let code = '';
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Find the first JSON object in the response
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      explanation = obj.explanation || '';
      code = obj.code || '';
    }
  } catch (e) {
    throw new Error('Could not parse Gemini API response: ' + e);
  }
  return { explanation, code };
}

