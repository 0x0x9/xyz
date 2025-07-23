// Exemple d'appel front-end à l'API route IA (compatible Next.js + Vercel)

export async function fetchGeneratedImage(prompt: string, style?: string) {
  const res = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, style }),
  });
  if (!res.ok) throw new Error("Erreur lors de la génération d'image");
  const { image } = await res.json();
  return image?.imageDataUri;
}
