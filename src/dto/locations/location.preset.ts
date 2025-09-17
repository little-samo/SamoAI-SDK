import { UserId } from '@little-samo/samo-ai';

import type {
  AgentCostDto,
  AgentPublicDto,
  GimmickCostDto,
  GimmickPublicDto,
} from '../entities';

export interface LocationPresetDto {
  id: bigint;
  name: string;
  presetDescription: string;

  thumbnail: string | null;
  ownerUserId: UserId | null;

  agents: AgentPublicDto[];
  agentCosts: AgentCostDto[];
  gimmicks: GimmickPublicDto[];
  gimmickCosts: GimmickCostDto[];

  isPublished: boolean;
  publishedAt: Date | null;
  hashtags: string[];

  locationCount: number;
  totalUsedCredit: number;
  totalMessageCount: number;

  isPublic: boolean;
  isAllowImport: boolean;
  isSensitive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
