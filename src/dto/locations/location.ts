import { LocationId } from '@little-samo/samo-ai';
import {
  LocationConfig,
  LocationEnvironment,
  LocationType,
} from '@little-samo/samo-ai-sdk/models';

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
