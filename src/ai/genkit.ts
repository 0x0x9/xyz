
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { GenkitPlugin } from 'genkit/plugin';

// Définition conditionnelle des plugins
const plugins: GenkitPlugin[] = [];
if (process.env.GOOGLE_API_KEY) {
  plugins.push(googleAI({ apiKey: process.env.GOOGLE_API_KEY }));
} else {
    // Avertissement si la clé API est manquante, sans bloquer le démarrage.
    console.warn(
        "La variable d'environnement GOOGLE_API_KEY est manquante. " +
        "Les fonctionnalités d'IA générative seront désactivées. " +
        "Ajoutez la clé à votre fichier .env pour les activer."
    );
}

// Configuration globale et instance Genkit
export const ai = genkit({
  plugins,
  logSinks: [],
  traceSinks: [],
});
