import { EntityId, EntityType } from '@little-samo/samo-ai';

export interface LocationMessageDto {
  entityType: EntityType;
  entityId: EntityId;
  name: string;
  expression?: string;
  message?: string;
  action?: string;
  emotion?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
