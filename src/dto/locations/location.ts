import { LocationId } from '@little-samo/samo-ai';
import { LocationConfig } from '@little-samo/samo-ai-sdk/models';

export interface LocationPublicDto {
  id: LocationId;
  name: string;

  platform: string;
  type: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface LocationPrivateDto extends LocationPublicDto {
  config: LocationConfig;
}
