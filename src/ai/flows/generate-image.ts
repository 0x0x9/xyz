'use server';

/**
 * @fileOverview Génère une image à partir d'un prompt et d'un style fournis par l'utilisateur.
 *
 * - generateImage - Une fonction qui prend un prompt et un style, et retourne des données d'image.
 */


import type { GenerateImageInput, GenerateImageOutput } from '@/ai/types';


export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  let finalPrompt = input.prompt;
  if (input.style && input.style !== 'none') {
    finalPrompt = `${input.prompt}, style ${input.style}`;
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  // Gemini image generation endpoint (v1beta)
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            { text: finalPrompt }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Gemini API: ' + response.statusText);
  }

  const data = await response.json();
  // Try to extract the image data URI from the response
  let imageDataUri = '';
  try {
    // Gemini returns base64 image in parts[].inlineData.data (if available)
    const parts = data.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
        imageDataUri = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (e) {
    throw new Error('Could not parse Gemini API image response: ' + e);
  }
  if (!imageDataUri) {
    throw new Error('Image generation failed to produce an output.');
  }
  return { imageDataUri };
}

