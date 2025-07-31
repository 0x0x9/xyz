export type GalleryItem = {
  id: number;
  title: string;
  author: string;
  image: string;
  imageHint: string;
  tool: '(X)image' | '(X)flux' | '(X)frame';
  prompt: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Cité de cristal cosmique",
    author: "ArtExplorer",
    image: "https://images.unsplash.com/photo-1534433369931-29f1b1382103?auto=format&fit=crop&w=800&q=80",
    imageHint: "futuristic crystal city",
    tool: "(X)image",
    prompt: "A sprawling cosmic city made of shimmering crystals, floating in a nebula, cinematic lighting, hyperrealistic, 8K."
  },
  {
    id: 2,
    title: "Forêt enchantée au crépuscule",
    author: "PixelWitch",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    imageHint: "enchanted forest twilight",
    tool: "(X)image",
    prompt: "An enchanted forest at twilight, ancient trees with glowing runes, a soft mist on the ground, fireflies everywhere, style of Studio Ghibli."
  },
  {
    id: 3,
    title: "Maquette App Météo",
    author: "UIDesigner",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80",
    imageHint: "weather app interface",
    tool: "(X)frame",
    prompt: "A sleek and modern weather app interface, dark mode, with glassmorphism effects and vibrant weather icons."
  },
  {
    id: 4,
    title: "Le Gardien du Temps",
    author: "StoryWeaver",
    image: "https://images.unsplash.com/photo-1495364144941-115a383f5b89?auto=format&fit=crop&w=800&q=80",
    imageHint: "clock steampunk man",
    tool: "(X)flux",
    prompt: "Générer un concept de personnage pour un roman de fantasy steampunk : un vieil horloger qui est en réalité le gardien du temps."
  },
   {
    id: 5,
    title: "Robot jardinier",
    author: "AI_Dreamer",
    image: "https://images.unsplash.com/photo-1581092918422-752a1881014a?auto=format&fit=crop&w=800&q=80",
    imageHint: "robot futuristic garden",
    tool: "(X)image",
    prompt: "A friendly robot tending to a lush garden on a futuristic balcony overlooking a bustling sci-fi city."
  },
  {
    id: 6,
    title: "Portrait Néo-Pop",
    author: "ColorQueen",
    image: "https://images.unsplash.com/photo-1502444336024-d0b5d4529241?auto=format&fit=crop&w=800&q=80",
    imageHint: "colorful pop art portrait",
    tool: "(X)image",
    prompt: "A vibrant pop art portrait of a woman with colorful geometric patterns in the background, bold colors, style of Andy Warhol."
  },
];
