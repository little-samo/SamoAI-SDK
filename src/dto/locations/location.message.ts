import { EntityId, EntityType } from '@little-samo/samo-ai';

export interface LocationMessageDto {
  id: string;
  entityType: EntityType;
  entityId: EntityId;
  name: string;
  expression?: string;
  message?: string;
  action?: string;
  emotion?: string;
  image?: string;
  processed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
