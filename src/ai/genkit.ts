import { configureGenkit } from '@genkit-ai/core';
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

// Configuration globale
configureGenkit({
  plugins: [
    firebase,
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  logLevel: 'debug