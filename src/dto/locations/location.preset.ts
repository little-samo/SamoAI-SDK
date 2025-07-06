import { LocationConfig } from '@little-samo/samo-ai-sdk/models';

import { UserPublicDto } from '../entities';

export interface LocationPresetDto {
  id: bigint;
  presetName: string;
  presetShortDescription: string;
  presetDescription: string;
  name: string;
  description: string;
  config: Partial<LocationConfig>;
  ownerUser?: UserPublicDto;
  createdAt: Date;
  updatedAt: Date;
}
