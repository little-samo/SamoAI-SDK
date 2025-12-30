import { LocationId, UserId } from '@little-samo/samo-ai/models';
import { LocationEnvironment } from '@little-samo/samo-ai-sdk/models';

import { LocationMessageDto } from './location.message';

export interface LocationSnapshotDto {
  snapshotKey: string;
  snapshotOwnerUserId: UserId;

  locationId: LocationId;
  locationEnvironment: LocationEnvironment;
  locationName: string;
  locationOwnerUserId: UserId;
  locationSourcePresetId: bigint | null;

  messages: LocationMessageDto[];
  createdAt: Date;
}
