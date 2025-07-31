export type Job = {
  id: number;
  title: string;
  department: 'Ingénierie' | 'Design' | 'Marketing' | 'Produit';
  location: 'Paris, France' | 'Remote';
  type: 'Plein temps' | 'Stage';
  description: string;
  responsibilities: string[];
  qualifications: string[];
};

export const jobOpenings: Job[] = [
  {
    id: 1,
    title: 'Ingénieur(e) IA Senior - Traitement du Langage Naturel',
    department: 'Ingénierie',
    location: 'Paris, France',
    type: 'Plein temps',
    description: 'Rejoignez notre équipe d\'élite pour développer la prochaine génération de nos outils d\'IA. Vous travaillerez sur des modèles de langage complexes pour améliorer (X)flux et Oria.',
    responsibilities: [
      'Concevoir et entraîner des modèles de langage pour des tâches créatives.',
      'Optimiser les pipelines de données pour l\'entraînement et l\'inférence.',
      'Collaborer avec les équipes Produit et Design pour intégrer les fonctionnalités IA.',
      'Mener une veille technologique sur les dernières avancées en IA.'
    ],
    qualifications: [
      '5+ années d\'expérience en NLP et Machine Learning.',
      'Maîtrise de Python et des frameworks comme TensorFlow ou PyTorch.',
      'Expérience avec les architectures de type Transformer (BERT, GPT, etc.).',
      'Doctorat ou Master en informatique, IA ou domaine connexe.'
    ]
  },
  {
    id: 2,
    title: 'UI/UX Designer Produit',
    department: 'Design',
    location: 'Remote',
    type: 'Plein temps',
    description: 'Vous serez responsable de l\'expérience utilisateur sur l\'ensemble de notre écosystème, de (X)OS à nos applications web. Votre mission : rendre la complexité simple et belle.',
    responsibilities: [
      'Créer des wireframes, des prototypes et des maquettes haute-fidélité.',
      'Mener des recherches utilisateurs et des tests d\'utilisabilité.',
      'Développer et maintenir notre Design System.',
      'Travailler en étroite collaboration avec les développeurs pour assurer une intégration parfaite.'
    ],
    qualifications: [
      'Portfolio solide démontrant une expérience en design d\'applications complexes.',
      'Maîtrise de Figma, Sketch ou Adobe XD.',
      'Excellente compréhension des principes de l\'ergonomie et du design centré utilisateur.',
      'Capacité à travailler dans un environnement agile et rapide.'
    ]
  },
  {
    id: 3,
    title: 'Chef de Produit - Outils Créatifs IA',
    department: 'Produit',
    location: 'Paris, France',
    type: 'Plein temps',
    description: 'Prenez la tête de notre suite d\'outils créatifs. Vous définirez la vision, la stratégie et la feuille de route pour des produits comme (X)motion, (X)palette et (X)muse.',
    responsibilities: [
      'Définir la vision et la stratégie produit à court et long terme.',
      'Rédiger les spécifications fonctionnelles et les user stories.',
      'Analyser les données d\'utilisation et les retours clients pour guider les décisions.',
      'Coordonner les équipes de design, d\'ingénierie et de marketing.'
    ],
    qualifications: [
      '3+ années d\'expérience en tant que Product Manager, idéalement dans la Tech ou le SaaS.',
      'Forte sensibilité pour les produits créatifs et l\'IA.',
      'Excellentes compétences en communication et en leadership.',
      'Expérience en gestion de produit agile (Scrum, Kanban).'
    ]
  },
];
