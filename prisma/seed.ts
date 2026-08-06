import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@as-consulting.ga";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  const existingAdmin = await db.adminUser.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await db.adminUser.create({
      data: {
        name: "Administrateur",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`✓ Admin créé : ${adminEmail}`);
    if (!process.env.ADMIN_PASSWORD) {
      console.log("  ⚠ Mot de passe par défaut utilisé : ChangeMe123! — changez-le après la première connexion.");
    }
  } else {
    console.log(`✓ Admin déjà présent : ${adminEmail}`);
  }

  const services = [
    {
      slug: "tenue-de-comptabilite",
      title: "Tenue de comptabilité",
      icon: "calculator",
      order: 1,
      shortDesc:
        "Une comptabilité fiable et à jour, des états financiers conformes aux normes OHADA, pour piloter votre activité sereinement.",
      description:
        "Nous prenons en charge l'ensemble de vos travaux comptables au quotidien. Notre équipe saisit, contrôle et analyse vos opérations afin de vous fournir des états financiers fiables dans les délais réglementaires.\n\nVous disposez ainsi d'une information comptable exacte pour piloter votre entreprise et prendre les bonnes décisions, tout en restant en conformité avec les normes OHADA et les obligations légales en vigueur au Gabon.",
      items: [
        "Tenue et saisie comptable (journaux achats, ventes, banque, caisse)",
        "Établissement des états financiers annuels (bilan, compte de résultat)",
        "Rapprochements bancaires et lettrage",
        "Clôture et préparation des liasses fiscales",
        "Comptabilité générale et analytique",
        "Immobilisations et amortissements",
      ],
    },
    {
      slug: "demarches-administratives-et-fiscales",
      title: "Démarches administratives et fiscales",
      icon: "file",
      order: 2,
      shortDesc:
        "Déclarations fiscales, TVA, IS, IRPP, CSS et accompagnement des contrôles : nous gérons vos obligations auprès de l'administration.",
      description:
        "La fiscalité gabonaise est exigeante et les échéances ne se rattrapent pas. Nous sécurisons l'ensemble de vos déclarations et de vos démarches administratives afin d'éviter les pénalités et de profiter des allègements auxquels vous avez droit.\n\nNous vous accompagnons également lors des contrôles fiscaux et vérifications de comptabilité, pour défendre sereinement les intérêts de votre entreprise.",
      items: [
        "Déclarations fiscales : TVA, impôts sur les sociétés (IS), IRPP, CSS",
        "Suivi des échéances fiscales et sociales",
        "Optimisation fiscale légale",
        "Accompagnement lors des contrôles fiscaux",
        "Formalités administratives et d'immatriculation",
        "Constitution et gestion des dossiers auprès de l'administration",
      ],
    },
    {
      slug: "gestion-sociale",
      title: "Gestion sociale",
      icon: "users",
      order: 3,
      shortDesc:
        "Paie complète, bulletins de salaire conformes et déclarations sociales : nous prenons en charge la gestion de votre personnel.",
      description:
        "La gestion de la paie est un poste sensible, entre le droit du travail, la convention collective et les déclarations à la CNSS. Nous établissons des bulletins de salaire conformes et sécurisons vos obligations sociales mois après mois.\n\nNotre objectif : vous décharger de la gestion administrative du personnel tout en garantissant le respect du cadre légal et le paiement exact de vos salariés.",
      items: [
        "Établissement des bulletins de paie",
        "Gestion des contrats de travail et du personnel",
        "Déclarations sociales et cotisations CNSS",
        "Attestations d'emploi et soldes de tout compte",
        "Gestion des congés et absences",
        "Conseil en droit du travail",
      ],
    },
    {
      slug: "creation-d-entreprise",
      title: "Création d'entreprise",
      icon: "rocket",
      order: 4,
      shortDesc:
        "Du choix de la forme juridique à l'immatriculation, nous vous accompagnons pas à pas dans la création de votre entreprise au Gabon.",
      description:
        "Vous avez un projet, nous avons la méthode. Nous vous accompagnons de la validation de votre business plan jusqu'à l'immatriculation définitive de votre entreprise.\n\nNous vous conseillons sur la forme juridique la plus adaptée (SARL, SA, EURL, entreprise individuelle), réalisons les démarches administratives à votre place et mettons en place votre organisation comptable dès le premier jour.",
      items: [
        "Étude de faisabilité et business plan",
        "Conseil sur le choix de la forme juridique",
        "Rédaction des statuts et actes de constitution",
        "Immatriculation au RCCM et formalités associées",
        "Ouverture de vos obligations fiscales et sociales",
        "Mise en place de l'organisation comptable",
      ],
    },
  ];

  for (const service of services) {
    const existing = await db.service.findUnique({ where: { slug: service.slug } });
    if (!existing) {
      await db.service.create({ data: service });
      console.log(`✓ Service créé : ${service.title}`);
    }
  }

  const faqs = [
    {
      question: "Quels documents dois-je fournir pour la tenue de comptabilité ?",
      answer:
        "Il vous suffit de nous transmettre vos factures, reçus, relevés bancaires et tout justificatif d'opérations. Nous mettons en place un processus simple de collecte mensuelle (physique ou dématérialisée).",
      order: 1,
    },
    {
      question: "Comment se déroule la création d'entreprise avec A&S Consulting ?",
      answer:
        "Après un premier entretien pour valider votre projet, nous préparons les statuts, réalisons les formalités d'immatriculation et mettons en place votre organisation fiscale et comptable. Vous êtes opérationnel dès la fin des démarches.",
      order: 2,
    },
    {
      question: "Proposez-vous un accompagnement en cas de contrôle fiscal ?",
      answer:
        "Oui. Nous préparons vos dossiers, vous représentons auprès de l'administration et nous veillons à la défense de vos intérêts tout au long de la procédure.",
      order: 3,
    },
    {
      question: "Vos honoraires sont-ils fixés au forfait ?",
      answer:
        "Nos honoraires sont définis après un premier diagnostic gratuit, selon vos besoins et le volume d'activité. Un forfait mensuel clair vous est proposé, sans mauvaise surprise.",
      order: 4,
    },
    {
      question: "Travaillez-vous avec les jeunes entreprises et les indépendants ?",
      answer:
        "Absolument. Nous accompagnons les startups, les entrepreneurs individuels et les indépendants avec des formules adaptées à leur budget et à leurs besoins.",
      order: 5,
    },
  ];

  for (const faq of faqs) {
    const existing = await db.faqItem.findFirst({
      where: { question: faq.question },
    });
    if (!existing) {
      await db.faqItem.create({ data: faq });
      console.log(`✓ FAQ ajoutée : ${faq.question}`);
    }
  }

  const posts = [
    {
      slug: "calendrier-fiscal-2026-gabon",
      title: "Calendrier fiscal 2026 : les échéances à ne pas manquer",
      excerpt:
        "Déclarations de TVA, impôts sur les sociétés, CSS : voici les principales échéances fiscales et sociales à retenir pour bien démarrer l'année.",
      content:
        "Chaque année, de nombreuses entreprises subissent des pénalités évitables simplement faute d'avoir anticipé leurs échéances.\n\nLa TVA doit généralement être déclarée mensuellement ou trimestriellement selon votre régime. L'impôt sur les sociétés et l'impôt sur le revenu font l'objet de paiements provisionnels puis d'une régularisation annuelle.\n\nNous vous recommandons de centraliser dès le début de l'année l'ensemble de vos justificatifs et de planifier vos échéances sur un calendrier unique.\n\nNotre cabinet tient à votre disposition un suivi personnalisé de vos obligations fiscales et sociales, pour que vous ne manquiez aucune date importante. Contactez-nous pour en savoir plus.",
      published: true,
    },
    {
      slug: "pourquoi-faire-appel-a-un-cabinet-comptable",
      title: "Pourquoi faire appel à un cabinet comptable dès la création de votre entreprise ?",
      excerpt:
        "Beaucoup de jeunes entreprises tentent de gérer leur comptabilité seules. Voici pourquoi un professionnel fait gagner du temps et de l'argent dès le départ.",
      content:
        "La comptabilité ne se limite pas à l'obligation légale : c'est un outil de pilotage essentiel. Un cabinet comptable vous apporte une vision claire de votre trésorerie, de votre rentabilité et de vos risques fiscaux.\n\nDès la création, une organisation comptable bien pensée évite les erreurs coûteuses : mauvaises déclarations, pièces manquantes, régularisations complexes.\n\nEn externalisant, vous gagnez du temps pour vous concentrer sur votre cœur de métier, tout en bénéficiant de conseils d'experts pour optimiser votre fiscalité.\n\nChez A&S Consulting, nous mettons en place des solutions simples et adaptées aux réalités des entreprises gabonaises, quel que soit votre stade de développement.",
      published: true,
    },
  ];

  for (const post of posts) {
    const existing = await db.post.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await db.post.create({ data: post });
      console.log(`✓ Article créé : ${post.title}`);
    }
  }

  const settings: Record<string, string> = {
    "contact.phone": process.env.SITE_PHONE ?? "+241 XX XX XX XX",
    "contact.email": process.env.SITE_EMAIL ?? "contact@as-consulting.ga",
    "contact.address": "Carrefour Léon Mba, face UBA gare routière, Libreville — Gabon",
    "contact.hours": "Lun – Ven : 8h00 – 17h30 · Sam : 9h00 – 13h00",
    "contact.whatsapp": process.env.SITE_WHATSAPP ?? "",
  };

  for (const [key, value] of Object.entries(settings)) {
    await db.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log("✓ Paramètres du site enregistrés");

  console.log("\nSeed terminé ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
