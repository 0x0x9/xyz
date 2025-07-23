"use server";
/**
 * @fileOverview Un agent IA qui génère des maquettes (wireframes), (X)frame.
 *
 * - generateFrame - Une fonction qui prend une description d'UI et génère du code React pour un composant.
 */

import type { GenerateFrameInput, GenerateFrameOutput } from '@/ai/types';

export async function generateFrame(input: GenerateFrameInput): Promise<GenerateFrameOutput> {
  if (!input.prompt && !input.photoDataUri) {
    throw new Error("Veuillez fournir une description textuelle ou une image d'inspiration.");
  }
  let context = '';
  if (input.prompt) {
    context += `La description textuelle est : ${input.prompt}\n`;
  }
  if (input.photoDataUri) {
    context += `Utilisez cette image comme inspiration principale pour la mise en page, les couleurs, le thème et la structure : [image fournie]`;
  }
  const prompt = `Vous êtes (X)frame, un développeur frontend expert spécialisé dans l'écosystème Next.js, React, Tailwind CSS et shadcn/ui. Votre mission est de transformer une description ou une image en un **composant React fonctionnel, interactif et esthétique de qualité production**.\n\nInstructions impératives :\n1.  Structure du Composant React :\n    *   Le code généré doit être un composant React unique et complet.\n    *   Utilisez les hooks React (useState, useCallback, etc.) pour toute logique interactive. L'interactivité doit être significative (ex: gestion d'état, validation de formulaire), pas un simple compteur.\n    *   Le code doit être propre, bien formaté et prêt à être utilisé.\n2.  Styling & Composants :\n    *   Utilisez en priorité les composants shadcn/ui disponibles (ex: <Button>, <Card>, <Input>, etc.).\n    *   Utilisez les classes Tailwind CSS pour tout le style (disposition, couleurs, typographie, etc.).\n    *   N'utilisez PAS de CSS personnalisé dans le champ `cssCode` à moins que ce soit absolument indispensable pour un effet complexe (ex: animation custom). La plupart du temps, ce champ doit rester vide.\n    *   Utilisez des icônes de la bibliothèque lucide-react lorsque c'est pertinent.\n3.  Code de sortie :\n    *   `htmlCode` (JSX) : Doit contenir le code JSX complet du composant React. Incluez les imports nécessaires (React, hooks, shadcn/ui, lucide-react).\n    *   `jsCode` : Doit être vide. Toute la logique JavaScript doit être intégrée dans le composant React du champ `htmlCode`.\n    *   `cssCode` : Doit être vide, sauf si un style complexe est nécessaire.\n4.  Qualité et Esthétique :\n    *   Le design doit être moderne, épuré, professionnel et responsive.\n    *   Inspirez-vous du style "glassmorphism" si possible.\n    *   Utilisez des textes de remplissage pertinents en **français**.\n5.  Explication :\n    *   Fournissez une explication claire et concise du composant, de sa structure, de son fonctionnement et de ses dépendances (ex: "Ce composant utilise le composant Card de shadcn/ui et l'icône User de lucide-react").\n\nContexte de la demande :\n${context}\n\nFormat de sortie attendu (JSON) : { htmlCode, jsCode, cssCode, explanation }`;

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
  let htmlCode = '';
  let jsCode = '';
  let cssCode = '';
  let explanation = '';
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      htmlCode = obj.htmlCode || '';
  {
