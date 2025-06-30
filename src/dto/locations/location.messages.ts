import { EntityId, EntityType, LocationMessage } from '@little-samo/samo-ai';

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

export function convertLocationMessageToDto(
  message: LocationMessage
): LocationMessageDto {
  return {
    entityType: message.entityType,
    entityId: message.entityId,
    name: message.name,
    expression: message.expression,
    message: message.message,
    action: message.action,
    emotion: message.emotion,
    image: message.image,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
}
