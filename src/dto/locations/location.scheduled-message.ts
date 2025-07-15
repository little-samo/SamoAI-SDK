import { DayOfWeek } from '@little-samo/samo-ai/common';
import { LocationId } from '@little-samo/samo-ai/models';

export interface LocationScheduledMessageDto {
  id: string;
  locationId: LocationId;
  message: string;
  nextMessageAt: Date | null;
  repeatTimesOfDay: string[];
  repeatDaysOfWeek: DayOfWeek[];
  createdAt: Date;
  updatedAt: Date;
}
