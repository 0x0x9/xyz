export type Post = {
  slug: string;
  title: string;
  author: string;
  avatar: string;
  category: string;
  date: string;
  readingTime: number;
  image: string;
  imageHint: string;
  excerpt: string;
  content: string;
};

export const blogPosts: Post[] = [
  {
    slug: "de-lidee-au-projet-avec-x-flux",
    title: "De l'idée au projet complet : Comment (X)flux révolutionne votre workflow",
    author: "Alfred Sisley",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    category: "Tutoriel",
    date: "2024-07-28",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1600&q=80",
    imageHint: "futuristic workflow interface",
    excerpt: "Découvrez comment notre outil d'orchestration IA, (X)flux, peut transformer une simple phrase en un plan d'action détaillé, avec tous les livrables créatifs dont vous avez besoin.",
    content: `
<p>Dans le monde de la création, l'un des plus grands défis est de passer de l'étincelle initiale d'une idée à un projet structuré et réalisable. C'est ici qu'intervient (X)flux, notre assistant IA conçu pour être votre chef de projet personnel.</p>
<h2>Le problème : la friction créative</h2>
<p>Combien de fois avez-vous eu une idée brillante, pour ensuite vous sentir submergé par les étapes nécessaires pour la concrétiser ? Entre la planification, la création de contenu, le design, et la stratégie, le chemin est semé d'embûches. (X)flux a été créé pour éliminer cette friction.</p>
<h2>Comment ça marche ?</h2>
<p>Le principe est simple : vous donnez à (X)flux un objectif de haut niveau. Par exemple :</p>
<blockquote>"Je suis un musicien et je veux lancer mon nouveau single sur le thème de l'exploration spatiale."</blockquote>
<p>(X)flux analyse votre demande et votre métier. Il sélectionne ensuite la combinaison d'outils la plus pertinente au sein de l'écosystème (X)yzz pour générer un projet complet.</p>
<h2>Les livrables générés</h2>
<p>Pour notre exemple musical, (X)flux pourrait générer :</p>
<ul>
  <li>Un plan de projet détaillé avec un brief créatif.</li>
  <li>Une palette de couleurs inspirée de l'espace pour votre identité visuelle.</li>
  <li>Un guide de style pour votre communication.</li>
  <li>Des idées de clips ou de visuels pour les réseaux sociaux.</li>
  <li>Un premier jet de communiqué de presse.</li>
</ul>
<p>Le tout, en quelques minutes. Vous n'avez plus qu'à prendre les rênes et à affiner le contenu avec votre touche personnelle. (X)flux ne remplace pas votre créativité, il l'amplifie.</p>
`
  },
  {
    slug: "maitriser-lart-du-prompt-avec-x-promptor",
    title: "Maîtriser l'Art du Prompt avec (X)promptor",
    author: "Chloé Martin",
    avatar: "https://images.unsplash.com/photo-1519340333755-c6e2a6a1b49a?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    category: "Conseils",
    date: "2024-07-25",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
    imageHint: "creative person writing ideas",
    excerpt: "L'efficacité de l'IA générative dépend de la qualité de vos prompts. Apprenez à transformer des idées vagues en instructions précises pour des résultats spectaculaires.",
    content: `
<p>Vous avez une idée en tête, une ambiance, une émotion, mais vous ne savez pas comment la traduire en une image ou un texte ? (X)promptor est votre allié. Cet outil est conçu pour prendre votre inspiration brute et la transformer en pistes créatives concrètes.</p>
<h2>De l'abstrait au concret</h2>
<p>Imaginez que vous donniez à (X)promptor l'idée suivante : "Une ville futuriste sous la pluie, ambiance néonoir."</p>
<p>(X)promptor ne va pas se contenter de vous donner une image. Il va décomposer votre idée en plusieurs axes :</p>
<ul>
  <li><strong>Prompts d'image détaillés :</strong> "A detailed cinematic shot of a rain-slicked street in a futuristic city, neon signs reflecting in the puddles, a lone figure in a trench coat walking away. Style of Blade Runner, photorealistic, 8K."</li>
  <li><strong>Suggestions de titres :</strong> "Les Larmes de Chrome", "Néon & Pluie", "Cyber-Mélancolie".</li>
  <li><strong>Styles artistiques :</strong> Néo-noir, Cyberpunk, Photographie cinématique, Illustration sombre.</li>
</ul>
<p>Avec ces éléments, vous avez une base solide pour démarrer n'importe quel projet créatif, qu'il s'agisse de générer une image, d'écrire une histoire ou de composer une musique.</p>
`
  }
];
