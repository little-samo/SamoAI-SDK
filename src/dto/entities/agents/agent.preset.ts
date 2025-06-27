import { AgentConfig } from '@little-samo/samo-ai-sdk/models';

export interface AgentPresetDto {
  id: bigint;
  presetName: string;
  presetShortDescription: string;
  presetDescription: string;
  config: AgentConfig;
  createdAt: Date;
  updatedAt: Date;
}
