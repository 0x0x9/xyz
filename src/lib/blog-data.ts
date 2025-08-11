
export type Post = {
  slug: string;
  title: string;
  author: string;
  avatar: string;
  imageHint: string;
  category: string;
  date: string;
  readingTime: number;
  image: string;
  excerpt: string;
  content: string;
};

export const blogPosts: Post[] = [
  {
    slug: "alpha-beta-et-vous-au-coeur-de-linnovation",
    title: "Alpha, Bêta & Vous : Au Cœur de l'Innovation (X)yzz",
    author: "Démon François",
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    imageHint: "man portrait professional apple style",
    category: "Annonce",
    date: "2024-08-01",
    readingTime: 4,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1600&q=80",
    excerpt: "Vous utilisez nos outils et vous voyez les mentions 'Alpha' ou 'Bêta'. Qu'est-ce que cela signifie ? Plongez avec nous dans les coulisses de la création de (X)yzz.ai.",
    content: `
      <h2>Participer à la Révolution</h2>
      <p>Chez (X)yzz.ai, nous ne construisons pas seulement des outils, nous façonnons un écosystème. Et nous le faisons avec vous. C'est pourquoi une grande partie de notre suite est disponible en version <strong>Alpha</strong> ou <strong>Bêta</strong>. Cela signifie que vous avez un accès privilégié à des technologies de pointe, avant même leur finalisation. En contrepartie, votre expérience et vos retours sont le compas qui nous guide.</p>
      
      <h3>La Phase Alpha : Pour les Pionniers</h3>
      <p>Un produit en Alpha est à son stade le plus précoce. C'est le terrain de jeu des explorateurs, de ceux qui n'ont pas peur de rencontrer quelques imperfections pour avoir un aperçu du futur. Les fonctionnalités peuvent changer, évoluer, voire disparaître.</p>
      <p><strong>Exemple :</strong> Notre éditeur de code, <strong>(X).alpha</strong>, est actuellement dans cette phase. Son nom n'est pas un hasard ! Nous y testons nos idées les plus audacieuses en matière d'assistance au développement par l'IA.</p>
      <blockquote>Utiliser un outil en Alpha, c'est être aux premières loges de l'innovation et influencer directement sa trajectoire.</blockquote>

      <h3>La Phase Bêta : Stabilité et Collaboration</h3>
      <p>Quand un outil passe en Bêta, il a atteint un niveau de maturité et de stabilité bien plus élevé. Les fonctionnalités principales sont en place et fiables. La phase Bêta est une conversation à grande échelle avec notre communauté pour peaufiner l'expérience, corriger les derniers bugs et s'assurer que l'outil répond parfaitement à vos besoins.</p>
      <p><strong>Exemple :</strong> Le cœur de notre système, comme <strong>(X)flux</strong> ou <strong>Maestro</strong>, est en phase Bêta. Ces outils sont robustes et prêts à être intégrés dans vos workflows, et nous comptons sur vos retours pour les rendre parfaits.</p>

      <h2>Votre Voix Compte</h2>
      <p>Que vous utilisiez un outil en Alpha ou en Bêta, votre rôle est essentiel. Chaque bug signalé, chaque suggestion d'amélioration et chaque création que vous partagez nous aident à construire un écosystème plus puissant et plus intuitif. Vous n'êtes pas de simples utilisateurs ; vous êtes les co-architectes de (X)yzz.ai.</p>
      <p>Merci de faire partie de cette aventure. Ensemble, nous ne faisons pas que prédire le futur de la création, nous le construisons.</p>
    `
  },
  {
    slug: "de-lidee-au-projet-avec-x-flux",
    title: "De l'idée au projet complet : Comment (X)flux révolutionne votre workflow",
    author: "Alfred Sisley",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    imageHint: "woman portrait professional",
    category: "Tutoriel",
    date: "2024-07-28",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1600&q=80",
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
    imageHint: "woman portrait friendly",
    category: "Conseils",
    date: "2024-07-25",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
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
  },
  {
    slug: "creer-sa-premiere-maquette-avec-x-frame",
    title: "Tutoriel : Créez votre première maquette web avec (X)frame",
    author: "Ziari Kamal",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    imageHint: "man working computer design",
    category: "Tutoriel",
    date: "2024-07-29",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1600&q=80",
    excerpt: "Passez de l'idée à une interface fonctionnelle en quelques minutes. Ce guide vous montre comment utiliser (X)frame pour générer du code React à partir d'une simple description.",
    content: `
      <h2>Introduction : Qu'est-ce que (X)frame ?</h2>
      <p><strong>(X)frame</strong> est un outil d'IA révolutionnaire qui transforme vos descriptions textuelles en <strong>composants React fonctionnels</strong>. Fini les heures passées à coder des maquettes ! Vous décrivez, (X)frame construit. Dans ce tutoriel, nous allons créer une carte de profil utilisateur simple.</p>
      
      <h3>Étape 1 : Lancer (X)frame</h3>
      <p>La première étape est d'ouvrir (X)frame depuis votre bureau (X)OS ou via la commande <code>open frame</code> dans (X)term. Vous serez accueilli par une interface simple vous invitant à décrire le composant que vous souhaitez créer.</p>
      
      <h3>Étape 2 : Rédiger le Prompt</h3>
      <p>La qualité de votre résultat dépend de la clarté de votre prompt. Soyons précis. Dans la zone de texte, écrivez :</p>
      <blockquote>"Crée une carte de profil utilisateur. Elle doit contenir un avatar rond, un nom d'utilisateur, un nom de compte (handle), et un bouton 'Suivre'. Utilise les composants Card de shadcn/ui et des icônes de lucide-react si nécessaire. Le design doit être moderne et épuré."</blockquote>
      <p>Ce prompt indique à (X)frame non seulement <strong>ce qu'il faut construire</strong> (une carte de profil), mais aussi <strong>quels outils utiliser</strong> (shadcn/ui, lucide-react) et <strong>quel style adopter</strong> (moderne, épuré).</p>
      
      <h3>Étape 3 : Générer et Analyser le Code</h3>
      <p>Cliquez sur "Générer". En quelques instants, (X)frame vous fournira le code JSX complet du composant React. Vous remarquerez qu'il a correctement importé <code>Card</code>, <code>Avatar</code>, et <code>Button</code> depuis les bonnes bibliothèques. Le code est propre et prêt à l'emploi.</p>
      <p>Le plus impressionnant est que (X)frame ne se contente pas de générer du code statique. Il inclut souvent des états de base. Par exemple, le bouton "Suivre" pourrait avoir un état <code>isFollowing</code> géré avec un <code>useState</code> pour basculer son texte et son style.</p>
      
      <h3>Étape 4 : Personnaliser et Intégrer</h3>
      <p>Le code généré est une base solide. Vous pouvez maintenant le copier-coller dans votre projet existant via (X).alpha (notre éditeur de code) et le personnaliser. Changez les textes, ajustez les styles avec Tailwind CSS, ou ajoutez une logique plus complexe. Vous venez de gagner un temps précieux.</p>
      
      <h2>Conclusion</h2>
      <p>Vous avez créé votre premier composant avec (X)frame ! Cet outil est conçu pour <strong>accélérer votre développement</strong>, vous permettant de vous concentrer sur la logique complexe plutôt que sur la mise en place répétitive des interfaces. Expérimentez avec des prompts plus complexes et découvrez toute la puissance de l'IA au service du design.</p>
    `
  }
];

export const mockReplies: Record<number, Reply[]> = {
  1: [
    {
      id: 101,
      author: "Juliette L.",
      avatar: "https://placehold.co/100x100.png",
      hint: "person portrait",
      timestamp: "il y a 2 heures",
      content: "Salut Alexandre ! Perso, je suis passé sur le dernier driver NVIDIA Studio, ça a bien aidé. Tu as vérifié si tes drivers sont à jour ?",
      likes: 15,
    },
    {
      id: 102,
      author: "Thomas G.",
      avatar: "https://placehold.co/100x100.png",
      hint: "person portrait",
      timestamp: "il y a 1 heure",
      content: "Bonne question. Je baisse souvent le nombre de samples pour les previews et je l'augmente uniquement pour le rendu final. C'est basique mais ça change la vie.",
      likes: 8,
    },
     {
      id: 103,
      author: "Alexandre D.",
      avatar: "https://placehold.co/100x100.png",
      hint: "person portrait",
      timestamp: "il y a 30 minutes",
      content: "Merci pour vos retours ! @Juliette, je vais checker les drivers, bonne idée. @Thomas, oui je fais ça aussi, mais même le rendu final est très long sur ma scène actuelle.",
      likes: 2,
    },
  ],
  2: [
     {
      id: 201,
      author: "Alexandre D.",
      avatar: "https://placehold.co/100x100.png",
      hint: "person portrait",
      timestamp: "il y a 4 heures",
      content: "Super intéressant ton retour ! Je n'ai pas encore osé me lancer avec (X)flux, ça a l'air puissant mais un peu intimidant.",
      likes: 5,
    },
  ],
};

export type Reply = {
  id: number;
  author: string;
  avatar: string;
  hint: string;
  timestamp: string;
  content: string;
  likes: number;
};
