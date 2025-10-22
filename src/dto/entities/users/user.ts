import { UserId } from '@little-samo/samo-ai';

export interface UserPublicDto {
  id: UserId;
  username: string | null;
  nickname: string;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  avatar: string | null;
  referenceAvatar: string | null;
  appearance: string | null;
}

export interface UserPrivateDto extends UserPublicDto {
  locale: string;
  country: string;
  adminLevel: number;

  birthDate: Date | null;
  email: string | null;

  defaultCredits: number;

  maxAgents: number;
  maxLocationAgents: number;
  maxLocationAgentsHardLimit: number;
  maxAgentLocations: number;

  isAllowSensitive: boolean;
}

export interface UserAvatarDto {
  name: string;
  avatar: string;
  referenceAvatar: string | null;
  appearance: string | null;
}
