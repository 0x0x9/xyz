
export type CollaborationPost = {
  id: number;
  author: string;
  avatar: string;
  imageHint: string;
  title: string;
  description: string;
  skills: string[];
  type: 'Recherche de projet' | 'Offre de service' | 'Portfolio';
};

export const collaborationPosts: CollaborationPost[] = [
  {
    id: 1,
    author: "Alice Martin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    imageHint: "woman portrait professional",
    title: "Développeuse Frontend React",
    description: "Disponible pour des missions freelance. J'aide les startups à construire des interfaces rapides et élégantes.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    type: "Offre de service",
  },
  {
    id: 2,
    author: "Bob Dupont",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    imageHint: "man portrait creative",
    title: "Musicien & Sound Designer",
    description: "Je compose des bandes sonores originales et des effets sonores pour des jeux vidéo et des films. Ouvert aux collaborations.",
    skills: ["Composition", "Ableton Live", "Sound Design", "Mixage"],
    type: "Offre de service",
  },
  {
    id: 3,
    author: "Studio Nebula",
    avatar: "https://images.unsplash.com/photo-1581092162502-34f7a2334882?auto=format&fit=crop&w=800&q=80",
    imageHint: "abstract space logo",
    title: "Recherche Motion Designer pour un court-métrage",
    description: "Nous recherchons un motion designer talentueux pour créer les animations de titre et les effets visuels de notre prochain court-métrage de science-fiction.",
    skills: ["After Effects", "Motion Graphics", "Animation 2D"],
    type: "Recherche de projet",
  },
  {
    id: 4,
    author: "Clara Garcia",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    imageHint: "woman portrait design",
    title: "Mon Portfolio de Design UI/UX",
    description: "Découvrez mes derniers projets, de la recherche utilisateur à la maquette haute-fidélité. Construit avec (X)frame.",
    skills: ["UI/UX", "Figma", "Design System", "Recherche Utilisateur"],
    type: "Portfolio",
  },
   {
    id: 5,
    author: "David Moreau",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80",
    imageHint: "man portrait tech",
    title: "Expert en IA Générative",
    description: "Je conçois et j'intègre des solutions d'IA sur mesure pour automatiser vos workflows créatifs. Consultant disponible.",
    skills: ["IA Générative", "Genkit", "Python", "API"],
    type: "Offre de service",
  },
  {
    id: 6,
    author: "E-commerce Vision",
    avatar: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d54?auto=format&fit=crop&w=800&q=80",
    imageHint: "modern startup logo",
    title: "Besoin d'un logo pour notre nouvelle marque",
    description: "Nous sommes une nouvelle marque de vêtements durables et nous cherchons un designer pour créer un logo percutant et mémorable.",
    skills: ["Branding", "Logo Design", "Illustration"],
    type: "Recherche de projet",
  },
];
