
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
  specs?: Record<string, string>;
};

export const products: Product[] = [
  {
    id: 1,
    name: "(X)-φ (fi)",
    description: "Le summum de la puissance créative. Pour celles et ceux qui repoussent les limites de ce qu’une machine peut faire… et de ce qu’un esprit peut créer. Ce n'est pas qu'un ordinateur. C’est un studio, une galerie, une scène, un lab.",
    price: 4499.00,
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
    features: [
      "Puissance de calcul extrême pour la 3D, le dev et le montage 8K.",
      "Flexibilité totale avec la double compatibilité GPU (NVIDIA/AMD).",
      "Multitâche ultra-fluide grâce à 96 Go de RAM DDR5 extensible.",
      "Châssis premium en aluminium, silencieux et évolutif."
    ],
    specs: {
      "Système": "(X) OS – Studio Edition, avec support natif Windows/macOS via partitions intelligentes (X) SYNC Bridge.",
      "Processeur": "Intel® Core i9-14900K ou AMD Ryzen 9 7950X — 24 cœurs / 32 threads.",
      "Carte graphique": "NVIDIA RTX 4080 Super ou AMD Radeon RX 7900 XTX (Autres GPU disponibles).",
      "Mémoire vive": "96 Go DDR5 (extensible à 192Go).",
      "Stockage": "20 To (SSD NVMe Gen4 8 To + 12 To HDD) +  emplacement libre pour extension.",
      "Refroidissement": "Système hybride silencieux (air/liquide) avec ventilation adaptative.",
      "Boîtier": "Moyen-tour compact en alliage d’aluminium noir satiné, éclairage sobre configurable.",
      "Connectique": "4×USB-C, 4×USB 3.2, 2×DisplayPort 2.1, HDMI 2.1, Ethernet 2.5 GbE, SD Express, Wi-Fi 6E.",
      "Audio": "DAC intégré 32 bits haute fidélité, prises audio jack pro isolées.",
      "Abonnement Inclus": "1 an d'abonnement (X) SYNC pour la synchronisation multi-plateforme.",
      "Garantie": "2 ans (extensible) + support prioritaire pour les créatifs pro."
    }
  },
  {
    id: 8,
    name: "(X)-book",
    description: "La puissance d'une station de travail dans un format portable et élégant, pour créer n'importe où.",
    price: 2899.00,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"],
    hint: "sleek laptop",
    category: 'Matériel',
    isFeatured: true,
    configurable: false,
    features: ["Écran Liquid Retina XDR 14 pouces", "Puce (X)OS Fusion A1 avec Neural Engine", "Jusqu'à 18h d'autonomie", "Clavier Magique rétroéclairé", "Châssis unibody en aluminium recyclé"],
    specs: {
        "Processeur": "Puce (X)OS Fusion A1",
        "Mémoire": "32 Go de mémoire unifiée",
        "Stockage": "1 To SSD",
        "Écran": "Écran Liquid Retina XDR 14,2 pouces",
        "Batterie": "Jusqu'à 18 heures d'autonomie"
    }
  },
  {
    id: 9,
    name: "(X)-oméga",
    description: "Le choix logique des créatifs qui veulent créer vite, bien, et sans se ruiner. Un prix contenu, une vision ambitieuse, des performances solides.",
    price: 1999.00,
    images: [
        "https://images.unsplash.com/photo-1618384887924-c9b0b4597d95?auto=format&fit=crop&w=800&q=80",
    ],
    hint: "sleek modern desktop computer",
    category: 'Matériel',
    isFeatured: false,
    configurable: true,
    features: [
        "Processeur Intel Core i7 ou AMD Ryzen 7", 
        "(X)OS préinstallé avec compatibilité Windows/macOS", 
        "32 Go de RAM DDR5 (extensible)", 
        "Stockage SSD NVMe Gen4 ultra-rapide", 
        "Carte graphique NVIDIA RTX série 40"
    ],
    specs: {
        "Processeur": "Intel Core i7-14700K ou AMD Ryzen 7 7800X3D",
        "Carte graphique": "NVIDIA GeForce RTX 4070 Ti Super",
        "Mémoire": "32 Go DDR5",
        "Stockage": "2 To SSD NVMe Gen4 + 8To HDD",
        "Connectique": "USB-C 10 Gbps, HDMI 2.1, DisplayPort 1.4, Ethernet 2.5 GbE",
        "Boîtier": "Moyen-tour compact, aluminium brossé",
        "Refroidissement": "Ventirad haute performance silencieux"
    }
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
    features: ["Accès à la suite complète d'outils IA", "1 To de stockage (X)cloud sécurisé", "Mises à jour majeures incluses", "Support technique prioritaire"],
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
    features: ["8192 niveaux de pression", "Détection de l'inclinaison à 60°", "Pointe de précision interchangeable", "Connexion magnétique au X-Book"],
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
    features: ["Audio spatial avec suivi dynamique de la tête", "Transducteurs haute-fidélité de 40mm", "Réduction de bruit active de pointe", "Mode Transparence adaptatif"],
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
    features: ["Dalle IPS 32 pouces avec résolution 4K", "Couverture 99% DCI-P3", "Luminosité de 600 nits", "Calibrage d'usine Delta E < 2"],
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
