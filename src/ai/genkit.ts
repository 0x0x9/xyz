
'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { firebase } from '@genkit-ai/firebase';

// Vérification de la clé API
if (!process.env.GOOGLE_API_KEY) {
  throw new Error(
    "La variable d'environnement GOOGLE_API_KEY est manquante. " +
    "Ajoutez-la à votre fichier .env.local"
  );
}

// Configuration globale et instance Genkit
export const ai = genkit({
  plugins: [
    firebase,
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
});
