import { LocationId } from '@little-samo/samo-ai';
import {
  LocationConfig,
  LocationEnvironment,
  LocationType,
} from '@little-samo/samo-ai-sdk/models';

import { LocationMessageDto } from './location.message';

export interface LocationPublicDto {
  id: LocationId;
  name: string;

  type: LocationType;
  environment: LocationEnvironment;

  createdAt: Date;
  updatedAt: Date;
}

export interface LocationPrivateDto extends LocationPublicDto {
  config: LocationConfig;
}

export interface LocationListItemDto extends LocationPublicDto {
  lastMessage: LocationMessageDto | null;
  unreadCount: number;
  agentCount: number;
  userCount: number;
  gimmickCount: number;
}
