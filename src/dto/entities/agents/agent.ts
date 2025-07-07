import { AgentId, UserId } from '@little-samo/samo-ai';
import { AgentConfig } from '@little-samo/samo-ai-sdk/models';

export interface AgentPublicDto {
  id: AgentId;
  name: string;
  avatar: string;
  ownerUserId: UserId;
}

export interface AgentPrivateDto extends AgentPublicDto {
  config: AgentConfig | null;
}
