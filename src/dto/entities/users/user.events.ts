import { UserId } from '@little-samo/samo-ai';

import { ItemEventDto } from '../../items';

export const UserEventType = {
  ItemEvent: 'ItemEvent',
  UserUpdated: 'UserUpdated',
  UserLevelExpUpdated: 'UserLevelExpUpdated',
} as const;

export type UserEventType = (typeof UserEventType)[keyof typeof UserEventType];

export interface UserEventDtoBase {
  userId: UserId;
  type: UserEventType;
}

export interface UserItemEventDto extends UserEventDtoBase {
  type: typeof UserEventType.ItemEvent;
  itemEvent: ItemEventDto;
}

export interface UserUpdatedEventDto extends UserEventDtoBase {
  type: typeof UserEventType.UserUpdated;
}

export interface UserLevelExpUpdatedEventDto extends UserEventDtoBase {
  type: typeof UserEventType.UserLevelExpUpdated;
  reason:
    | 'UNKNOWN'
    | 'CREDIT_SPENT_AT_LOCATION'
    | 'MISSION_OBJECTIVE_COMPLETE'
    | 'MISSION_COMPLETE';
  level: number;
  prevLevel: number;
  exp: number;
  prevExp: number;
  nextExp: number;
  bonusCredit: number;
}

export type UserEventDto =
  | UserItemEventDto
  | UserUpdatedEventDto
  | UserLevelExpUpdatedEventDto;
