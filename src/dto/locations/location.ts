import {
  AgentId,
  EntityId,
  EntityType,
  LocationId,
  UserId,
} from '@little-samo/samo-ai';
import {
  LocationConfig,
  LocationEnvironment,
  LocationPlatform,
  LocationType,
} from '@little-samo/samo-ai-sdk/models';

import type { LocationMessageDto } from './location.message';
import type { AgentCostDto } from '../entities/agents/agent';
import type { GimmickCostDto } from '../entities/gimmicks/gimmick';

export interface LocationPublicDto {
  id: LocationId;
  name: string;

  platform: LocationPlatform;
  type: LocationType;
  environment: LocationEnvironment;

  thumbnail: string | null;
  ownerUserId: UserId | null;

  param1: bigint;
  param2: bigint;
  param3: bigint;
  param4: bigint;

  createdAt: Date;
  updatedAt: Date;
}

export interface LocationPrivateDto extends LocationPublicDto {
  config: LocationConfig | null;
  credentialTypes: string[];
}

export interface LocationListItemDto extends LocationPublicDto {
  lastMessage: LocationMessageDto | null;
  unreadCount: number;
  agentIds: AgentId[];
  userIds: UserId[];
  gimmickCount: number;
  pauseUpdateUntil: Date | null;
  pauseUpdateReason: string | null;
}

export interface LocationCanvasDto {
  lastModifierEntityType: EntityType;
  lastModifierEntityId: EntityId;
  text: string;
  updatedAt: Date;
}

export interface LocationContentDto {
  id: LocationId;
  canvases: Record<string, LocationCanvasDto>;
  rendering: string | null;
}

export interface LocationCostDto {
  locationId: LocationId;
  agents: AgentCostDto[];
  gimmicks: GimmickCostDto[];
}
