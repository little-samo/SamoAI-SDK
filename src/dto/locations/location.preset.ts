import { EntityType, LocationId, UserId } from '@little-samo/samo-ai';
import z from 'zod';

import type {
  AgentConfig,
  LocationConfig,
  LocationConfigCanvas,
} from '@little-samo/samo-ai-sdk/models';

import type {
  AgentCostDto,
  AgentPublicDto,
  GimmickCostDto,
  GimmickPublicDto,
} from '../entities';

export const LocationPresetMessageSchema = z.object({
  entityType: z.nativeEnum(EntityType),
  entityId: z.coerce.bigint(),

  message: z.string().max(800).optional(),
  image: z.string().max(2048).optional(),
});

export type LocationPresetMessageDto = z.infer<
  typeof LocationPresetMessageSchema
>;

export const LocationPresetCanvasSchema = z.object({
  name: z.string().max(32),
  text: z.string().max(5000),
});

export type LocationPresetCanvasDto = z.infer<
  typeof LocationPresetCanvasSchema
>;

export interface LocationPresetDto {
  id: bigint;
  name: string;
  version: number;
  versionUpdatedAt: Date;
  presetDescription: string;
  presetShortDescription: string;

  thumbnail: string | null;
  ownerUserId: UserId | null;
  sourceLocationId: LocationId | null;

  agents: AgentPublicDto[];
  agentCosts: AgentCostDto[];
  gimmicks: GimmickPublicDto[];
  gimmickCosts: GimmickCostDto[];
  canvases: LocationPresetCanvasDto[];
  canvasConfigs: LocationConfigCanvas[];
  messages: LocationPresetMessageDto[];

  isPublished: boolean;
  publishedAt: Date | null;
  hashtags: string[];
  likeCount: number;

  isPublic: boolean;
  isAllowImport: boolean;
  isSensitive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface LocationPresetDetailDto extends LocationPresetDto {
  userRating: 'LIKE' | 'DISLIKE' | null;
  locationCount: number;
  totalUsedCredit: number;
  totalMessageCount: number;
}

export interface LocationPresetPrivateDto extends LocationPresetDto {
  locationConfig: LocationConfig;
  agentConfigs: AgentConfig[];
}

export interface LocationPresetCommentDto {
  id: bigint;
  content: string;
  authorUserId: UserId;
  locationPresetId: bigint;
  parentCommentId: bigint | null;

  likeCount: number;
  replyCount: number;

  userReaction: 'LIKE' | 'DISLIKE' | null;
  hasReported: boolean;

  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
