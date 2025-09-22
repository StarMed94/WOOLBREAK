export type UserRole = 'owner' | 'editor' | 'seller' | 'viewer';

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  role: UserRole;
}

export interface Plugin {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  active: boolean;
  icon: React.ReactNode;
}
