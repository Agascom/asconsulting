# A&S Consulting — Site web

Site vitrine du cabinet **A&S Consulting**, cabinet de gestion comptable, fiscale,
sociale et administrative basé à Libreville (Gabon).

## Stack

- **Next.js 16** (App Router, `src/`) avec Turbopack
- **React 19**, **Tailwind CSS v4** (thème CSS-first, palette `brand-*` / `gold-*`)
- **PostgreSQL** via **Prisma 6** + **Neon** (`@neondatabase/serverless`)
- Authentification admin : sessions **JWT** (`jose`) + `bcryptjs`, cookie httpOnly
- Validation **zod**, emails **nodemailer** (SMTP optionnel)

## Contenu du projet

- **Front office** (`src/app/(site)/`) : Accueil, Le Cabinet, Services (liste + détail),
  Pourquoi nous choisir, Actualités (liste + détail), FAQ, Contact, Mentions légales,
  Confidentialité.
- **Back office** (`/admin`) : tableau de bord avec statistiques, gestion des demandes
  de contact (statuts, filtres, recherche), CRUD services / actualités / FAQ,
  paramètres du site (coordonnées affichées en en-tête, pied de page et page contact).
- **API** (`src/app/api/`) : `contact` (formulaire public) et `admin/*` (login, logout,
  services, posts, faq, requests, settings — protégées par session).

## Installation

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Configurer l'environnement :

   ```bash
   cp .env.example .env
   ```

   Renseigner au minimum :
   - `DATABASE_URL` : chaîne de connexion de votre base Neon (Postgres).
   - `AUTH_SECRET` : clé secrète pour signer les sessions (`openssl rand -base64 32`).
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` : identifiants de l'administrateur initial.

3. Créer le schéma et charger les données initiales (4 services, 5 FAQ, 2 articles,
   l'administrateur et les paramètres du site) :

   ```bash
   npm run db:setup
   ```

   > **Important** : changez le mot de passe administrateur par défaut après la
   > première connexion. Le SMTP est optionnel : sans `SMTP_HOST`, les demandes de
   > contact sont uniquement enregistrées en base.

4. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

   - Site public : http://localhost:3000
   - Back office : http://localhost:3000/admin

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |
| `npm run db:setup` | Génère le client, pousse le schéma et lance le seed |
| `npm run db:generate` | Régénère le client Prisma |
| `npm run db:push` | Applique le schéma à la base |
| `npm run db:seed` | Recharge les données initiales |
| `npm run db:studio` | Prisma Studio (explorateur de la base) |

## Déploiement

Déploiement prévu sur **Vercel** (adapter `DATABASE_URL` et `AUTH_SECRET` aux
variables d'environnement de l'environnement cible).
