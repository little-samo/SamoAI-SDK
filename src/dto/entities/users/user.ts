import { UserId } from '@little-samo/samo-ai';
import z from 'zod';

import { ImageStyleSchema } from '../../images';

export interface UserPublicDto {
  id: UserId;
  username: string | null;
  nickname: string;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  profilePicture: string | null;
  coverPicture: string | null;
  avatarName: string | null;
  avatar: string | null;
  referenceAvatar: string | null;
  bio: string | null;
  appearance: string | null;
  level: number;
  ownedPublicAvatarCount: number | null;
  ownedAvatarUsageCount: number | null;
  ownedPresetLocationCount: number | null;
  ownedPresetMessageCount: number | null;
  followingCount: number | null;
  followerCount: number | null;
  following: boolean | null;
  followedBy: boolean | null;
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

  exp: number;
  nextExp: number;
  missionObjectiveBonusExp: number;
  missionBonusExp: number;

  totalLocationPresetPaidCreditUsed: number;

  createdAt: Date;
}

export const UserAvatarSchema = z.object({
  id: z.coerce.bigint().optional(),
  name: z.string().max(64),
  role: z.string().max(200).optional(),
  avatar: z.string().max(2048),
  referenceAvatar: z.string().max(2048).optional(),
  examplePoses: z.array(z.string().max(2048)).optional(),
  appearance: z.string().max(500),
  style: ImageStyleSchema.optional(),
  usageCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  isLiked: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
});

export type UserAvatarDto = z.infer<typeof UserAvatarSchema>;

// API Key Types
export const UserApiKeyTypeSchema = z.enum(['AVATAR']);

export type UserApiKeyType = z.infer<typeof UserApiKeyTypeSchema>;

export interface UserCommentDto {
  id: bigint;
  authorUserId: UserId;
  targetUserId: UserId;
  parentCommentId: bigint | null;

  content: string;
  contentImageUrl: string | null;

  likeCount: number;
  replyCount: number;

  userReaction: 'LIKE' | 'DISLIKE' | null;
  hasReported: boolean;

  isSecret: boolean;

  createdAt: Date;
  updatedAt: Date;
}
