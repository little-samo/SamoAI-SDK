import {
  AgentId,
  EntityId,
  EntityType,
  LocationId,
  UserId,
} from '@little-samo/samo-ai';

import type {
  LocationConfig,
  LocationConfigCanvas,
  LocationEnvironment,
  LocationPlatform,
  LocationType,
} from '@little-samo/samo-ai-sdk/models';

import type { LocationMessageDto } from './location.message';
import type { AgentCostDto } from '../entities/agents/agent';
import type {
  GimmickCostDto,
  GimmickPublicDto,
} from '../entities/gimmicks/gimmick';

export interface LocationPublicDto {
  id: LocationId;
  name: string;

  platform: LocationPlatform;
  type: LocationType;
  environment: LocationEnvironment;
  maxUsers: number;

  thumbnail: string | null;
  ownerUserId: UserId | null;
  canvasConfigs: LocationConfigCanvas[];
  gimmicks: GimmickPublicDto[];

  sourceLocationPresetId: bigint | null;

  isPublished: boolean;
  publishedAt: Date | null;
  publishDescription: string | null;
  hashtags: string[];

  param1: bigint;
  param2: bigint;
  param3: bigint;
  param4: bigint;

  freeCreditBalance: number;
  paidCreditBalance: number;
  totalUsedCredit: number;
  lastChargedCredit: number;
  useLocationCreditOnly: boolean;
  creditCostPerChat: number;
  chatRequiresPaidCredit: boolean;

  isPublic: boolean;
  isAdminChat: boolean;
  isSensitive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface LocationPrivateDto extends LocationPublicDto {
  config: LocationConfig | null;
  credentialTypes: string[];
  overrideAgentLlmLevel: 'FREE' | 'LOW' | 'MEDIUM' | 'HIGH' | null;

  isEditable: boolean;
}

export interface LocationListItemDto extends LocationPublicDto {
  lastMessage: LocationMessageDto | null;
  messageCount: number;
  unreadCount: number;
  agentIds: AgentId[];
  userIds: UserId[];
  pauseUpdateUntil: Date | null;
  pauseUpdateReason: string | null;
}

export interface LocationCanvasDto {
  lastModifierEntityType: EntityType;
  lastModifierEntityId: EntityId;
  text: string;
  isExplicit?: boolean;
  updatedAt: Date;
}

export interface LocationContentDto {
  id: LocationId;
  canvases: Record<string, LocationCanvasDto>;
  rendering: string | null;
  suggestedResponses: string[] | null;
}

export interface LocationCostDto {
  locationId: LocationId;
  agents: AgentCostDto[];
  gimmicks: GimmickCostDto[];
}
