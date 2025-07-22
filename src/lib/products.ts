
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  hint: string;
  category: 'Matériel' | 'Logiciel' | 'Accessoire';
  isFeatured: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Station de Création X-1",
    description: "La puissance brute pour l'IA, la 3D et la vidéo 8K. Le summum de la performance.",
    price: 3499.00,
    image: "https://placehold.co/600x600.png",
    hint: "powerful desktop computer",
    category: 'Matériel',
    isFeatured: true,
  },
  {
    id: 2,
    name: "Suite Logicielle XOS Pro",
    description: "Un an d'accès à tous nos outils créatifs. Mises à jour incluses.",
    price: 299.00,
    image: "https://placehold.co/600x600.png",
    hint: "software box interface",
    category: 'Logiciel',
    isFeatured: true,
  },
  {
    id: 3,
    name: "Tablette Graphique X-Pen",
    description: "Précision et sensibilité inégalées pour donner vie à vos créations numériques.",
    price: 499.00,
    image: "https://placehold.co/600x600.png",
    hint: "graphics tablet",
    category: 'Accessoire',
    isFeatured: true,
  },
  {
    id: 4,
    name: "Casque Audio Studio X-Sound",
    description: "Un son neutre et détaillé pour le mixage et le mastering. Confort longue durée.",
    price: 349.00,
    image: "https://placehold.co/600x600.png",
    hint: "studio headphones",
    category: 'Accessoire',
    isFeatured: false,
  },
  {
    id: 5,
    name: "Moniteur 4K X-Vision",
    description: "Des couleurs d'une fidélité absolue sur un écran de 32 pouces calibré pour les professionnels.",
    price: 1299.00,
    image: "https://placehold.co/600x600.png",
    hint: "computer monitor",
    category: 'Matériel',
    isFeatured: false,
  },
  {
    id: 6,
    name: "Plugin (X)flux pour FCPX",
    description: "Intégrez la puissance de l'orchestration IA directement dans Final Cut Pro X.",
    price: 99.00,
    image: "https://placehold.co/600x600.png",
    hint: "software plugin interface",
    category: 'Logiciel',
    isFeatured: false,
  },
   {
    id: 7,
    name: "Clavier Mécanique X-Type",
    description: "Conçu pour le confort et la rapidité, avec des raccourcis pour tous les logiciels créatifs.",
    price: 179.00,
    image: "https://placehold.co/600x600.png",
    hint: "mechanical keyboard",
    category: 'Accessoire',
    isFeatured: false,
  },
  {
    id: 8,
    name: "Laptop de Création X-Book",
    description: "La puissance d'une station de travail dans un format portable et élégant.",
    price: 2899.00,
    image: "https://placehold.co/600x600.png",
    hint: "sleek laptop",
    category: 'Matériel',
    isFeatured: true,
  },
];
