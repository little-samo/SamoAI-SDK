import { LocationId, UserId } from '@little-samo/samo-ai/models';

import { LocationMessageDto } from './location.message';

export interface LocationSnapshotDto {
  snapshotKey: string;
  snapshotOwnerUserId: UserId;

  locationId: LocationId;
  locationName: string;
  locationOwnerUserId: UserId;

  messages: LocationMessageDto[];
  createdAt: Date;
}
