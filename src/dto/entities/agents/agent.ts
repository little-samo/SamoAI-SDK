import { AgentId, UserId } from '@little-samo/samo-ai';

import type { AgentConfig, LlmPreset } from '@little-samo/samo-ai-sdk/models';

export interface AgentPublicDto {
  id: AgentId;
  name: string;
  avatar: string | null;
  role: string | null;
  ownerUserId: UserId;

  llmPreset: LlmPreset | null;
}

export interface AgentPrivateDto extends AgentPublicDto {
  config: AgentConfig | null;
  credentialTypes: string[];

  isEditable: boolean;
}

export interface AgentCostDto {
  agentId: AgentId;
  totalCost: number;

  llmPresetCost: number;

  gimmickCost?: number;
  canvasMaxLength?: number;
  canvasCost?: number;
}
