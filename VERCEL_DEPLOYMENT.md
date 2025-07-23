# Déploiement sur Vercel

## 1. Connexion GitHub
- Connecte ton repo à Vercel (https://vercel.com/import/git)

## 2. Variables d'environnement
- Ajoute dans le dashboard Vercel :
  - `GOOGLE_API_KEY` (clé Gemini)
  - (autres clés si besoin)

## 3. Déploiement
- Chaque push sur `master` déclenche un build auto
- L'URL de prod est affichée dans le dashboard

## 4. Debug
- Consulte les logs Vercel en cas d'erreur (onglet "Deployments")
- Vérifie la structure `/app` et `/app/api` pour les routes

## 5. Bonnes pratiques
- Ne jamais push `.env.local` sur GitHub
- Les flows IA doivent être côté serveur (API route ou server action)

---

Pour toute question, consulte le README ou `/contact`.
