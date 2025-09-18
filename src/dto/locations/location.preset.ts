import { EntityType, UserId } from '@little-samo/samo-ai';
import z from 'zod';

import type {
  AgentCostDto,
  AgentPublicDto,
  GimmickCostDto,
  GimmickPublicDto,
} from '../entities';

export const LocationPresetMessageSchema = z.object({
  entityType: z.nativeEnum(EntityType),
  entityId: z.coerce.bigint(),
  message: z.string().max(800),
});

export type LocationPresetMessageDto = z.infer<
  typeof LocationPresetMessageSchema
>;

export interface LocationPresetDto {
  id: bigint;
  name: string;
  presetDescription: string;
  presetShortDescription: string;

  thumbnail: string | null;
  ownerUserId: UserId | null;

  agents: AgentPublicDto[];
  agentCosts: AgentCostDto[];
  gimmicks: GimmickPublicDto[];
  gimmickCosts: GimmickCostDto[];
  messages: LocationPresetMessageDto[];

  isPublished: boolean;
  publishedAt: Date | null;
  hashtags: string[];

  isPublic: boolean;
  isAllowImport: boolean;
  isSensitive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface LocationPresetDetailDto extends LocationPresetDto {
  locationCount: number;
  totalUsedCredit: number;
  totalMessageCount: number;
}
