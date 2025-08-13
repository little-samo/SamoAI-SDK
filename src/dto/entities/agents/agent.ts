import { AgentId, UserId } from '@little-samo/samo-ai';
import { AgentConfig } from '@little-samo/samo-ai-sdk/models';

export interface AgentPublicDto {
  id: AgentId;
  name: string;
  avatar: string | null;
  ownerUserId: UserId;
}

export interface AgentPrivateDto extends AgentPublicDto {
  config: AgentConfig | null;
  credentialTypes: string[];
}

export interface AgentCostDto {
  agentId: AgentId;
  totalCost: number;

  llmPresetCost: number;

  gimmickCost?: number;
  canvasCost?: number;
  agentCanvasCost?: number;
}
