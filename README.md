# Formulaire d'inscription — La Grande Rencontre

Application Next.js pour gérer les inscriptions à l'événement **La Grande
Rencontre** (Vases d'Honneur — Dimanche 4 Octobre 2026, Stade Félix
Houphouët-Boigny).

## Fonctionnalités

- Formulaire public (`/`) : nom, prénom, téléphone WhatsApp.
- La preuve de paiement (image) est **optionnelle** au moment de
  l'inscription : la personne peut l'envoyer tout de suite sur la page de
  confirmation (`/merci/[id]`), ou plus tard via un **lien unique**
  (`/inscription/[id]`) qui lui est fourni.
- Page d'administration (`/admin`), protégée par mot de passe : liste des
  inscriptions, preuve de paiement associée, export CSV.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Stockage des inscriptions : **Vercel KV** (Redis / Upstash)
- Stockage des images de preuve de paiement : **Vercel Blob**

## Déploiement sur Vercel

1. Poussez ce dépôt sur GitHub (déjà fait) et importez-le dans
   [Vercel](https://vercel.com/new).
2. Dans l'onglet **Storage** du projet Vercel, ajoutez :
   - une base **Redis** (marketplace Upstash — historiquement nommée
     "Vercel KV") → connectez-la au projet ; les variables
     `KV_REST_API_URL` / `KV_REST_API_TOKEN` / `KV_URL` sont créées
     automatiquement.
   - un store **Blob** → connectez-le au projet ; la variable
     `BLOB_READ_WRITE_TOKEN` est créée automatiquement.
3. Dans **Settings → Environment Variables**, ajoutez :
   - `ADMIN_PASSWORD` : le mot de passe pour accéder à `/admin`.
4. Redéployez si besoin (un déploiement après l'ajout des intégrations
   suffit à récupérer les nouvelles variables).

## Déploiement automatique via GitHub Actions

Un workflow (`.github/workflows/deploy.yml`) déploie automatiquement sur
Vercel à chaque push sur `main` (ou manuellement via l'onglet **Actions →
Deploy to Vercel → Run workflow**).

Pour l'activer, ajoutez ces secrets dans **Settings → Secrets and
variables → Actions** du dépôt GitHub :

- `VERCEL_TOKEN` : un token créé sur https://vercel.com/account/tokens
- `VERCEL_ORG_ID` et `VERCEL_PROJECT_ID` : obtenus en liant le projet une
  fois en local avec `npx vercel link --token=VOTRE_TOKEN`, puis en lisant
  le fichier généré `.vercel/project.json`.

Les intégrations Redis (KV) et Blob, ainsi que `ADMIN_PASSWORD`, doivent
toujours être ajoutées une fois depuis le dashboard Vercel (étapes
ci-dessus) — un token seul ne peut pas les créer.

## Développement local

```bash
cp .env.example .env.local
# renseignez ADMIN_PASSWORD et les variables KV/Blob (vercel env pull
# fonctionne aussi une fois le projet lié)
npm install
npm run dev
```
