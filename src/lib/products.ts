
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  hint: string;
  category: 'Matériel' | 'Logiciel' | 'Accessoire';
  isFeatured: boolean;
  configurable?: boolean;
  features?: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Station de Création X-1",
    description: "La puissance brute pour l'IA, la 3D et la vidéo 8K. Le summum de la performance, entièrement configurable.",
    price: 3499.00,
    images: [
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1587593665183-a773cb21f845?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1588229712046-5682b1377854?auto=format&fit=crop&w=800&q=80"
    ],
    hint: "powerful desktop computer",
    category: 'Matériel',
    isFeatured: true,
    configurable: true,
  },
   {
    id: 8,
    name: "Laptop de Création X-Book",
    description: "La puissance d'une station de travail dans un format portable et élégant, pour créer n'importe où.",
    price: 2899.00,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"],
    hint: "sleek laptop",
    category: 'Matériel',
    isFeatured: true,
    configurable: false,
  },
  {
    id: 9,
    name: "(X)-oméga",
    description: "La porte d'entrée vers l'écosystème (X)yzz. Idéal pour les créatifs et développeurs qui veulent la puissance et la flexibilité.",
    price: 1999.00,
    images: [
        "https://images.unsplash.com/photo-1618384887924-c9b0b4597d95?auto=format&fit=crop&w=800&q=80",
    ],
    hint: "sleek modern desktop computer",
    category: 'Matériel',
    isFeatured: false,
    configurable: false,
    features: ["(X)OS complet", "Dual-OS Windows/macOS", "32 Go RAM", "1 To SSD", "(X)Cloud inclus"],
  },
  {
    id: 10,
    name: "(X)-alpha",
    description: "La station de travail pour les professionnels exigeants. Le Triple-OS et l'IA intégrée ouvrent des possibilités créatives infinies.",
    price: 2999.00,
    images: [
        "https://images.unsplash.com/photo-1629227845354-952936a70703?auto=format&fit=crop&w=800&q=80",
    ],
    hint: "professional high-end computer",
    category: 'Matériel',
    isFeatured: false,
    configurable: false,
    features: ["(X)OS Pro", "Triple-OS + Linux", "64 Go RAM", "2 To SSD", "(X)AI intégré"],
  },
  {
    id: 11,
    name: "(X)-fi",
    description: "La machine ultime pour les studios et les créateurs sans compromis. Performances extrêmes pour les tâches les plus lourdes.",
    price: 4499.00,
    images: [
        "https://images.unsplash.com/photo-1603792013941-2c13e639a03f?auto=format&fit=crop&w=800&q=80",
    ],
    hint: "ultimate performance computer",
    category: 'Matériel',
    isFeatured: false,
    configurable: false,
    features: ["(X)OS Studio", "Multi-GPU dédié", "128 Go RAM", "4 To SSD", "Support prioritaire"],
  },
  {
    id: 2,
    name: "Abonnement XOS Pro",
    description: "Un an d'accès à tous nos outils créatifs IA, au cloud et aux mises à jour exclusives.",
    price: 299.00,
    images: ["https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"],
    hint: "software box interface",
    category: 'Logiciel',
    isFeatured: true,
    configurable: false,
  },
  {
    id: 3,
    name: "Tablette Graphique X-Pen",
    description: "Précision et sensibilité inégalées pour donner vie à vos créations numériques.",
    price: 499.00,
    images: ["https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"],
    hint: "graphics tablet",
    category: 'Accessoire',
    isFeatured: true,
    configurable: false,
  },
  {
    id: 4,
    name: "Casque Audio Studio X-Sound",
    description: "Un son neutre et détaillé pour le mixage et le mastering. Confort longue durée.",
    price: 349.00,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"],
    hint: "studio headphones",
    category: 'Accessoire',
    isFeatured: false,
    configurable: false,
  },
  {
    id: 5,
    name: "Moniteur 4K X-Vision",
    description: "Des couleurs d'une fidélité absolue sur un écran de 32 pouces calibré pour les professionnels.",
    price: 1299.00,
    images: ["https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80"],
    hint: "computer monitor",
    category: 'Matériel',
    isFeatured: false,
    configurable: false,
  },
  {
    id: 6,
    name: "Plugin (X)flux pour FCPX",
    description: "Intégrez la puissance de l'orchestration IA directement dans Final Cut Pro X.",
    price: 99.00,
    images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"],
    hint: "software plugin interface",
    category: 'Logiciel',
    isFeatured: false,
    configurable: false,
  },
   {
    id: 7,
    name: "Clavier Mécanique X-Type",
    description: "Conçu pour le confort et la rapidité, avec des raccourcis pour tous les logiciels créatifs.",
    price: 179.00,
    images: ["https://images.unsplash.com/photo-1618384887924-c9b0b4597d95?auto=format&fit=crop&w=800&q=80"],
    hint: "mechanical keyboard",
    category: 'Accessoire',
    isFeatured: false,
    configurable: false,
  },
];
