/*
          # Création des profils utilisateurs et des rôles
          Ce script met en place la structure de base pour la gestion des utilisateurs, de leurs profils et de leurs rôles dans l'application.

          ## Description de la requête:
          Cette opération est structurelle et sûre. Elle n'affecte aucune donnée existante car elle ne fait qu'ajouter de nouvelles tables, types, et fonctions.
          1.  Crée un type énuméré `user_role` pour standardiser les rôles.
          2.  Crée une table `profiles` liée à la table `auth.users` de Supabase pour stocker des métadonnées comme le rôle.
          3.  Met en place la Sécurité au Niveau des Lignes (RLS) pour protéger les données des profils.
          4.  Crée un déclencheur (trigger) pour peupler automatiquement la table `profiles` à chaque nouvelle inscription.

          ## Métadonnées:
          - Schéma-Catégorie: "Structural"
          - Impact-Niveau: "Low"
          - Nécessite-Backup: false
          - Réversible: true (en supprimant les objets créés)

          ## Structure affectée:
          - Création du type: `public.user_role`
          - Création de la table: `public.profiles`
          - Création des politiques RLS sur `public.profiles`
          - Création de la fonction: `public.handle_new_user()`
          - Création du déclencheur sur `auth.users`

          ## Implications de sécurité:
          - RLS Status: Activée sur `public.profiles`.
          - Changements de politique: Oui, des politiques sont créées pour permettre aux utilisateurs de gérer leur propre profil en toute sécurité.
          - Exigences d'authentification: Les politiques sont basées sur l'UID de l'utilisateur authentifié (`auth.uid()`).

          ## Impact sur la performance:
          - Index: Un index de clé primaire est créé sur `profiles.id`.
          - Déclencheurs: Un déclencheur est ajouté sur la table `auth.users` à l'insertion. L'impact est minime et nécessaire pour la synchronisation des données.
          - Impact estimé: Faible.
          */

-- 1. Création du type pour les rôles utilisateurs
create type public.user_role as enum ('owner', 'editor', 'seller', 'viewer');

-- 2. Création de la table des profils
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  role user_role default 'viewer' not null
);

alter table public.profiles
  enable row level security;

-- 3. Création des politiques de sécurité pour la table des profils
create policy "Les profils publics sont visibles par tout le monde."
  on profiles for select using (true);

create policy "Les utilisateurs peuvent insérer leur propre profil."
  on profiles for insert with check (auth.uid() = id);

create policy "Les utilisateurs peuvent mettre à jour leur propre profil."
  on profiles for update using (auth.uid() = id);

-- 4. Fonction pour créer un profil à l'inscription d'un nouvel utilisateur
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- 5. Déclencheur (trigger) qui appelle la fonction à chaque nouvelle inscription
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
