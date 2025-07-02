import { LocationConfig } from '@little-samo/samo-ai-sdk/models';

export interface LocationPresetDto {
  id: bigint;
  presetName: string;
  presetShortDescription: string;
  presetDescription: string;
  name: string;
  description: string;
  config: Partial<LocationConfig>;
  createdAt: Date;
  updatedAt: Date;
}
