
export interface ProfileData {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  coverUrl?: string;
  bio?: string;
  isStartup: boolean;
  location?: string;
  email?: string;
  joinDate: string;
  followers: number;
  following: number;
  ambitionScore?: number;
  tags?: string[];
  
  // Personal user specific
  college?: string;
  major?: string;
  year?: string;
  mainSkill?: string;
  
  // Startup specific
  mission?: string;
  industry?: string;
  isPublic?: boolean;
  rolesNeeded?: string[];
}
