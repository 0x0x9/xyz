
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Configuration globale et instance Genkit
export const ai = genkit({
  plugins: [
    // Le plugin Google AI sera activé uniquement si une clé API est fournie.
    // Cela permet à l'application de démarrer même sans configuration de Genkit.
    process.env.GOOGLE_API_KEY
      ? googleAI({ apiKey: process.env.GOOGLE_API_KEY })
      : [],
  ],
  logSinks: [],
  traceSinks: [],
});

// Avertissement si la clé API est manquante, sans bloquer le démarrage.
if (!process.env.GOOGLE_API_KEY) {
  console.warn(
    "La variable d'environnement GOOGLE_API_KEY est manquante. " +
    "Les fonctionnalités d'IA générative seront désactivées. " +
    "Ajoutez la clé à votre fichier .env pour les activer."
  );
}
