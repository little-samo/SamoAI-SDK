import { AgentConfig } from '@little-samo/samo-ai-sdk/models';

import { UserPublicDto } from '../users';

export interface AgentPresetDto {
  id: bigint;
  presetName: string;
  presetShortDescription: string;
  presetDescription: string;
  config: Partial<AgentConfig>;
  ownerUser?: UserPublicDto;
  createdAt: Date;
  updatedAt: Date;
}
