export type PageTab =
  | "home"
  | "about"
  | "services"
  | "creation"
  | "client-space"
  | "location"
  | "contact";

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tag: string;
  image: string;
  subtitle: string;
  features: string[];
  benefits: string[];
  deliverables: string[];
  targetAudience: string[];
}

export interface ClientDocument {
  id: string;
  title: string;
  category: "Fiscal" | "Comptable" | "Social" | "Juridique";
  date: string;
  size: string;
  fileType: string;
}

export interface TaxCalendarTask {
  id: string;
  task: string;
  deadline: string;
  category: "TVA" | "CNSS" | "Acompte IS" | "Bilan";
  status: "Effectué" | "En cours" | "A venir";
}

export interface LegalFormInfo {
  code: string;
  name: string;
  fullName: string;
  minCapital: string;
  associates: string;
  advantages: string[];
  recommendedFor: string;
  estimatedDelay: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyType: string;
  comment: string;
  rating: number;
}

export interface FiscalResource {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  readTime: string;
  content?: string[];
  downloadName?: string;
}

export const COMPANY_INFO = {
  name: "A&S CONSULTING",
  tagline: "Cabinet de Services Professionnels Comptables, Fiscaux et Administratifs",
  subTagline:
    "Votre partenaire de confiance pour la gestion comptable, les formalités fiscales, le suivi social et la création d'entreprise.",
  addressLine1: "A proximité du carrefour Léon Mba",
  addressLine2: "Non loin de la banque UBA de la gare routière",
  city: "Libreville, Gabon",
  phonePrimary: "+241 07 45 88 12",
  phoneSecondary: "+241 06 22 10 05",
  email: "contact@asconsulting-ga.com",
  workingHours: "Lundi - Vendredi: 08h00 - 18h00 | Samedi: 08h30 - 13h00",
  googleMapsQuery: "Carrefour Léon Mba, Gare Routière, UBA Bank, Libreville",
  stats: [
    { label: "PME & Startups Accompagnées", value: "500+", subtext: "Partout au Gabon" },
    { label: "Années d'Expertise Métier", value: "10+", subtext: "Spécialistes diplômés" },
    { label: "Taux de Conformité Fiscale", value: "100%", subtext: "Respect rigoureux des normes" },
    { label: "Délai Réponse & Prise en charge", value: "< 24h", subtext: "Réactivité garantie" },
  ],
};

export const CORE_SERVICES: ServiceDetail[] = [
  {
    id: "comptabilite",
    title: "Tenue de Comptabilité",
    shortDesc:
      "Gestion rigoureuse et suivi complet de vos comptes conformément aux normes comptables en vigueur (OHADA).",
    fullDesc:
      "Nous assurons la tenue intégrale ou partagée de votre comptabilité. De la saisie des pièces comptables au dressement des états financiers annuels (bilan, compte de résultat, annexes), nous offrons un suivi précis permettant de piloter votre entreprise en toute sérénité.",
    iconName: "Calculator",
    tag: "Incontournable",
    image: "/images/comptable1.jpeg",
    subtitle: "Conformité SYSCOHADA & Rigorisme",
    features: [
      "Tenue régulière des journaux comptables (Ventes, Achats, Banque)",
      "Établissement des bilans annuels & compte de résultat SYSCOHADA",
      "Révision comptable et vérification des pièces justificatives",
      "Conseil en gestion de trésorerie et tableaux de bord financiers",
    ],
    benefits: [
      "Conformité totale avec le Système Comptable SYSCOHADA révisé",
      "Visibilité financière claire grâce à des tableaux de bord périodiques",
      "Saisie rapide, classement méthodique et archivage sécurisé de vos pièces",
      "Préparation et arrêt des comptes annuels (États Financiers)",
    ],
    deliverables: [
      "Journaux comptables et Grand Livre",
      "Balance générale mensuelle et trimestrielle",
      "Bilan comptable et Compte de Résultat",
      "Liasse fiscale annuelle certifiée",
    ],
    targetAudience: ["PME & TPE", "Startups", "Commerçants & Artisans", "Entrepreneurs Individuels"],
  },
  {
    id: "fiscalite",
    title: "Démarches Administratives & Fiscales",
    shortDesc:
      "Prise en charge de vos déclarations d'impôts, taxes, formalités administratives et obtention du quitus fiscal.",
    fullDesc:
      "Les formalités administratives et fiscales peuvent être complexes et chronophages. A&S CONSULTING prend en charge l'ensemble de vos obligations déclaratives (IS, IRPP, TVA, CSS, etc.) pour vous éviter tout risque de redressement et pénalités.",
    iconName: "FileCheck",
    tag: "Sérénité Fiscale",
    image: "/images/comptable 2.jpeg",
    subtitle: "Sérénité Juridique & Fiscale",
    features: [
      "Déclarations mensuelles de TVA & retenues à la source",
      "Calcul et télédéclaration de l'Impôt sur les Sociétés (IS) & IRPP",
      "Demande et suivi de l'obtention du Quitus Fiscal",
      "Assistance et accompagnement lors des contrôles fiscaux",
    ],
    benefits: [
      "Optimisation fiscale légale pour réduire vos charges",
      "Anticipation et respect strict des échéances déclaratives",
      "Représentation auprès des administrations fiscales et douanières",
      "Obtention rapide de vos attestations et Quitus Fiscal",
    ],
    deliverables: [
      "Déclarations mensuelles et annuelles (TVA, CSS, Impôt sur les Sociétés)",
      "Attestations d'immatriculation fiscale (NIF)",
      "Quitus Fiscal et dossiers d'exonération",
      "Assistance lors de contrôles fiscaux",
    ],
    targetAudience: ["Sociétés (SARL, SAS, SA)", "Professions libérales", "PME en croissance", "Succursales"],
  },
  {
    id: "gestion-sociale",
    title: "Gestion Sociale & Paie",
    shortDesc:
      "Gestion intégrale des bulletins de paie, déclarations CNSS/CNAMGS, contrats de travail et volet salarial.",
    fullDesc:
      "Un accompagnement RH et social structuré pour gérer votre capital humain. Nous gérons la paie de vos salariés, le calcul des cotisations sociales, les formalités d'embauche ainsi que la rédaction des contrats conformément au Code du Travail.",
    iconName: "Users",
    tag: "Ressources Humaines",
    image: "/images/equipe.jpeg",
    subtitle: "Règlement des Salaires & CNSS/CNAMGS",
    features: [
      "Établissement des bulletins de paie et fiches individuelles",
      "Calcul des cotisations sociales CNSS et prestations CNAMGS",
      "Rédaction des contrats de travail et avenants légaux",
      "Gestion des déclarations d'embauche, départs et soldes de tout compte",
    ],
    benefits: [
      "Émission rapide et sans erreur des bulletins de paie",
      "Gestion conforme des déclarations d'organismes sociaux (CNSS, CNAMGS)",
      "Sécurité juridique pour les contrats de travail et ruptures",
      "Gain de temps précieux pour votre direction générale",
    ],
    deliverables: [
      "Fiches de paie et états de virement salarial",
      "Déclarations mensuelles et trimestrielles CNSS & CNAMGS",
      "Rédaction de contrats de travail (CDI, CDD, Stage)",
      "Solde de tout compte et certificats de travail",
    ],
    targetAudience: ["Toutes entreprises ayant des salariés", "PME & PME en expansion", "Startups en phase de recrutement"],
  },
  {
    id: "creation-entreprise",
    title: "Création d'Entreprise & Formalités",
    shortDesc:
      "Accompagnement de A à Z : choix de la forme juridique, montage du dossier, statuts et immatriculation (RCCM/NIF).",
    fullDesc:
      "Du projet d'idée à l'immatriculation officielle, nous guidons les créateurs d'entreprise à chaque étape. Nous vous conseillons sur la forme juridique idéale (SARL, SUARL, EI, SAS) et effectuons toutes les démarches auprès du Guichet Unique de la Création d'Entreprise.",
    iconName: "Building2",
    tag: "Lancement",
    image: "/images/directeur.jpeg",
    subtitle: "Du Projet à l'Immatriculation",
    features: [
      "Conseil sur le choix de la forme juridique (SARL, SAS, SUARL, EI)",
      "Rédaction personnalisée des statuts et actes constitutifs",
      "Obtention du numéro NIF (Numéro d'Identification Fiscale) & RCCM",
      "Montage du dossier bancaire et déblocage du capital social",
    ],
    benefits: [
      "Conseil sur mesure pour le choix de la structure juridique et fiscale",
      "Rédaction sur mesure de vos statuts et actes constitutifs",
      "Prise en charge complète au Guichet Unique (RCCM, NIF, Publication)",
      "Obtention rapide du dossier d'immatriculation complet",
    ],
    deliverables: [
      "Statuts notariés ou sous seing privé",
      "Registre du Commerce et du Crédit Mobilier (RCCM)",
      "Numéro d'Identification Fiscale (NIF)",
      "Attestation d'immatriculation et ouverture du dossier bancaire",
    ],
    targetAudience: ["Porteurs de projets", "Futurs entrepreneurs", "Startups", "Investisseurs locaux et internationaux"],
  },
];

export const LEGAL_FORMS: LegalFormInfo[] = [
  {
    code: "SUARL",
    name: "SARL Unipersonnelle",
    fullName: "Société à Responsabilité Limitée Unipersonnelle",
    minCapital: "Libre (Conseillé à partir de 100 000 FCFA)",
    associates: "1 Associé Unique",
    advantages: [
      "Patrimoine personnel protégé",
      "Gestion simplifiée par un seul décisionnaire",
      "Transformation facile en SARL pluripersonnelle",
      "Crédibilité auprès des banques et partenaires",
    ],
    recommendedFor: "Entrepreneur individuel souhaitant limiter sa responsabilité.",
    estimatedDelay: "3 à 5 jours ouvrés",
  },
  {
    code: "SARL",
    name: "SARL Pluripersonnelle",
    fullName: "Société à Responsabilité Limitée",
    minCapital: "Libre (Conseillé à partir de 100 000 FCFA)",
    associates: "2 à 50 Associés",
    advantages: [
      "Cadre juridique très sécurisé et structuré",
      "Responsabilité limitée aux apports des associés",
      "Idéal pour s'associer entre partenaires ou investisseurs",
      "Régime fiscal clair et prévisible",
    ],
    recommendedFor: "PME, projets d'équipe, commerces avec plusieurs investisseurs.",
    estimatedDelay: "3 à 5 jours ouvrés",
  },
  {
    code: "EI",
    name: "Entreprise Individuelle",
    fullName: "Entreprise Individuelle (Nom Propre)",
    minCapital: "Aucun minimum requis",
    associates: "1 Personne physique",
    advantages: [
      "Création rapide et coût réduit de départ",
      "Comptabilité de trésorerie simplifiée",
      "Prise de décision directe et totale indépendance",
    ],
    recommendedFor: "Artisans, prestataires de services indépendants, consultants.",
    estimatedDelay: "2 à 4 jours ouvrés",
  },
  {
    code: "SAS / SASU",
    name: "Société par Actions Simplifiée",
    fullName: "Société par Actions Simplifiée (Unipersonnelle)",
    minCapital: "Libre",
    associates: "1 ou plusieurs actionnaires",
    advantages: [
      "Grande liberté statutaire pour l'entrée d'investisseurs",
      "Dirigeant affilié au régime social assimilé salarié",
      "Très attrayante pour la levée de fonds et les startups",
    ],
    recommendedFor: "Startups technologiques, projets à fort potentiel de croissance.",
    estimatedDelay: "4 à 7 jours ouvrés",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Marc ONDO",
    role: "Gérant & Fondateur",
    company: "Ondo Logistics & Transports",
    companyType: "PME",
    comment:
      "A&S CONSULTING s'occupe de notre tenue comptable et de nos déclarations fiscales mensuelles depuis 2 ans. Grâce à leur présence près de la Gare Routière, la transmission de nos factures se fait très facilement. Un professionnalisme irréprochable !",
    rating: 5,
  },
  {
    id: "2",
    name: "Sandrine NTSAME",
    role: "Directrice Générale",
    company: "Aura Tech Solutions",
    companyType: "Startup",
    comment:
      "Nous étions perdus dans les démarches de création de notre société. L'équipe de A&S CONSULTING nous a pris en main du montage du dossier jusqu'à l'obtention du RCCM et NIF en moins d'une semaine. Je recommande vivement !",
    rating: 5,
  },
  {
    id: "3",
    name: "Jean-Baptiste MBADINGA",
    role: "Promoteur Immobilier & Commerce",
    company: "Etablissements MBADINGA",
    companyType: "Entrepreneur Individuel",
    comment:
      "La gestion de la paie et des cotisations CNSS était un cauchemar pour notre PME. A&S CONSULTING édite nos bulletins de paie et télé-déclarations sans jamais rater une échéance. Un vrai gain de tranquillité.",
    rating: 5,
  },
];

export const FISCAL_RESOURCES: FiscalResource[] = [
  {
    id: "1",
    title: "Guide Pratique : Les étapes clés pour créer sa société en 2026",
    category: "Création",
    date: "Aout 2026",
    summary:
      "Découvrez les pièces indispensables, le choix du statut juridique et les délais réels pour immatriculer votre entreprise.",
    readTime: "4 min de lecture",
    downloadName: "Guide_Creation_Entreprise_ASConsulting.pdf",
    content: [
      "1. Choisir la forme juridique adaptée (SARL, SUARL, EI, SAS).",
      "2. Préparer les pièces d'identité et le contrat de bail commercial ou attestation de domiciliation.",
      "3. Rédiger les statuts et le PV d'assemblée constitutive.",
      "4. Soumettre le dossier au Guichet Unique pour l'obtention du RCCM et NIF.",
    ],
  },
  {
    id: "2",
    title: "Calendrier des Échéances Fiscales & Sociales Mensuelles",
    category: "Fiscalité",
    date: "Juillet 2026",
    summary:
      "Ne manquez aucune date limite de déclaration (TVA, IRPP, CSS, CNSS) afin d'éviter tout majoration ou pénalité de retard.",
    readTime: "3 min de lecture",
    downloadName: "Calendrier_Fiscal_Social.pdf",
    content: [
      "Chaque 15 du mois : Déclaration et paiement de la TVA et de la CSS.",
      "Chaque 15 du mois : Versement de l'IRPP retenu à la source sur les salaires.",
      "Fin de trimestre : Déclaration mensuelle/trimestrielle CNSS & CNAMGS.",
      "Avril/Mai : Dépôt des États Financiers annuels.",
    ],
  },
  {
    id: "3",
    title: "Pourquoi sous-traiter la paie de vos salariés à un cabinet ?",
    category: "Social",
    date: "Juin 2026",
    summary:
      "Les avantages majeurs d'une externalisation salariale : conformité au Code du Travail, zéro erreur de calcul et confidentialité.",
    readTime: "5 min de lecture",
    downloadName: "Fiche_Externalisation_Paie.pdf",
    content: [
      "Gestion confidentielle des rémunérations.",
      "Mise à jour automatique selon les nouvelles barèmes cotisables.",
      "Télé-déclarations sociales sécurisées.",
    ],
  },
];

export const CLIENT_DOCUMENTS: ClientDocument[] = [
  {
    id: "1",
    title: "Quitus_Fiscal_Certifie_Aout_2026.pdf",
    category: "Fiscal",
    date: "02/08/2026",
    size: "1.2 MB",
    fileType: "PDF",
  },
  {
    id: "2",
    title: "Liasse_Fiscale_Etats_Financiers_SYSCOHADA_2025.pdf",
    category: "Comptable",
    date: "15/05/2026",
    size: "4.8 MB",
    fileType: "PDF",
  },
  {
    id: "3",
    title: "Bordereau_Cotisations_CNSS_CNAMGS_Q2_2026.pdf",
    category: "Social",
    date: "20/07/2026",
    size: "890 KB",
    fileType: "PDF",
  },
  {
    id: "4",
    title: "Statuts_Entreprise_Registre_RCCM_NIF.pdf",
    category: "Juridique",
    date: "10/01/2026",
    size: "2.5 MB",
    fileType: "PDF",
  },
];

export const TAX_CALENDAR: TaxCalendarTask[] = [
  {
    id: "1",
    task: "Déclaration & Téléversement TVA Mensuelle",
    deadline: "15 Août 2026",
    category: "TVA",
    status: "Effectué",
  },
  {
    id: "2",
    task: "Paiement Cotisations Sociales CNSS / CNAMGS Paie Juillet",
    deadline: "25 Août 2026",
    category: "CNSS",
    status: "En cours",
  },
  {
    id: "3",
    task: "Acompte Provisionnel Impôt sur les Sociétés (IS)",
    deadline: "15 Septembre 2026",
    category: "Acompte IS",
    status: "A venir",
  },
];

export const FREQUENT_FAQS = [
  {
    q: "Où se trouve précisément le cabinet A&S CONSULTING ?",
    a: "Notre cabinet est idéalement situé à proximité immédiate du carrefour Léon Mba, tout près de la banque UBA de la gare routière. Notre emplacement est facile d'accès en transport en commun, taxi ou véhicule personnel avec possibilités de stationnement.",
  },
  {
    q: "Combien de temps prend la création d'une entreprise avec A&S CONSULTING ?",
    a: "Grâce à notre maîtrise des procédures administratives et du Guichet Unique, le dossier complet d'immatriculation (RCCM, NIF, Statuts) est généralement finalisé en 3 à 5 jours ouvrés une fois toutes les pièces fournies.",
  },
  {
    q: "Proposez-vous un accompagnement pour les entrepreneurs individuels et petites TPE ?",
    a: "Absolument. Nos offres de tenue comptable et de suivi fiscal sont adaptées au volume d'activité des indépendants, artisans, commerçants et TPE avec des forfaits très accessibles.",
  },
  {
    q: "Comment se déroule la transmission de nos pièces comptables au cabinet ?",
    a: "Vous pouvez soit déposer directement vos factures et pièces physiques à notre cabinet près de la Gare Routière, soit utiliser notre espace client en ligne / WhatsApp sécurisé pour nous transmettre vos numérisations.",
  },
  {
    q: "Pouvez-vous nous aider en cas de contrôle fiscal ou redressement ?",
    a: "Oui. Nous assistons nos clients lors des vérifications sur pièces ou sur place réalisées par l'administration fiscale, en préparant les dossiers justificatifs et en défendant leurs droits.",
  },
];
