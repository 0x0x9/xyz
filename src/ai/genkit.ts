import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error(
    "La variable d'environnement GOOGLE_API_KEY est manquante. " +
    "Ajoutez-la à votre fichier .env ou dans les variables d'environnement de votre hébergeur."
  );
}


export const ai = genkit({
  plugins: [googleAI()],
});
