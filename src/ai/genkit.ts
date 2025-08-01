import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase';

// Initialise la télémétrie Firebase pour les logs et les traces.
// Ceci suppose que votre environnement serveur est authentifié
// (par ex., via la variable d'environnement GOOGLE_APPLICATION_CREDENTIALS).
enableFirebaseTelemetry();

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
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  // On réactive les "sinks" pour diriger les logs et traces vers Firebase.
  logSinks: ['firebase'],
  traceSinks: ['firebase'],
});
