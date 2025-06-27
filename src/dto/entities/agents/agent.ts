import { AgentId, UserId } from '@little-samo/samo-ai';
import { AgentConfig } from '@little-samo/samo-ai-sdk/models';

import { EntityDto } from '../entity';

export interface AgentDto extends EntityDto {
  id: AgentId;
}

export interface AgentPrivateDto {
  id: AgentId;
  name: string;
  username: string | null;
  ownerUserId: UserId;
  config: AgentConfig;
}
