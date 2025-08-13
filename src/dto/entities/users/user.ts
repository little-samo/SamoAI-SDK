import { UserId } from '@little-samo/samo-ai';

export interface UserPublicDto {
  id: UserId;
  username: string | null;
  nickname: string;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
}

export interface UserPrivateDto extends UserPublicDto {
  email: string | null;

  defaultCredits: number;

  maxAgents: number;
  maxLocationAgents: number;
  maxAgentLocations: number;
}
