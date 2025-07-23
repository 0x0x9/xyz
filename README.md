# (X)yzz.ai

Plateforme créative IA Next.js 14+ (App Router, TypeScript, Tailwind, ShadCN UI, Genkit, Vercel ready)

## Déploiement Vercel

1. **Connecte ton repo GitHub à Vercel**
2. **Ajoute les variables d'environnement dans Vercel**
   - `GOOGLE_API_KEY` (clé Gemini)
   - (autres clés si besoin)
3. **Push = déploiement automatique**

## Structure principale
- `/src/app/` : Pages et API routes Next.js
- `/src/ai/flows/` : Flows IA (Genkit)
- `/src/ai/genkit.ts` : Init Genkit + vérif clé API
- `/public/` : Assets statiques

## Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- Genkit (Google Gemini)
- Framer Motion
- Zustand

## Bonnes pratiques
- Jamais de clé API côté client
- Flows IA = server actions ou API routes
- Compatible Vercel (serverless)

---

Pour toute question, contacte l'équipe sur `/contact`.
