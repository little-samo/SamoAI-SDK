import { ItemEventDto } from '../../items';

export const UserEventType = {
  ItemEvent: 'ItemEvent',
  UserUpdated: 'UserUpdated',
} as const;

export type UserEventType = (typeof UserEventType)[keyof typeof UserEventType];

export interface UserEventDtoBase {
  userId: number;
  type: UserEventType;
}

export interface UserItemEventDto extends UserEventDtoBase {
  type: typeof UserEventType.ItemEvent;
  itemEvent: ItemEventDto;
}

export interface UserUpdatedEventDto extends UserEventDtoBase {
  type: typeof UserEventType.UserUpdated;
}

export type UserEventDto = UserItemEventDto | UserUpdatedEventDto;
