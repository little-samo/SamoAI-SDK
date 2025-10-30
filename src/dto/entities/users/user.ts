import { UserId } from '@little-samo/samo-ai';
import z from 'zod';

export interface UserPublicDto {
  id: UserId;
  username: string | null;
  nickname: string;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  avatarName: string | null;
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

export const UserAvatarSchema = z.object({
  name: z.string().max(64),
  avatar: z.string().max(2048),
  referenceAvatar: z.string().max(2048),
  role: z.string().max(200).optional(),
  appearance: z.string().max(500),
});

export type UserAvatarDto = z.infer<typeof UserAvatarSchema>;
