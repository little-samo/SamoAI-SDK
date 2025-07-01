import { UserId } from '@little-samo/samo-ai';

import { UserPublicDto } from '../entities';

import { LocationMessageDto } from './location.messages';

export const LocationEventType = {
  AgentExecution: 'AgentExecution',
  UserJoin: 'UserJoin',
  UserLeave: 'UserLeave',
  AddMessage: 'AddMessage',
  RenderingUpdated: 'RenderingUpdated',
} as const;

export type LocationEventType =
  (typeof LocationEventType)[keyof typeof LocationEventType];

export interface LocationEventDtoBase {
  locationId: number;
  type: LocationEventType;
}

export interface LocationRenderingUpdatedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.RenderingUpdated;
  rendering: string | null;
}

export interface LocationAgentExecutionEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.AgentExecution;
  name: string;
}

export interface LocationUserJoinEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.UserJoin;
  user: UserPublicDto;
}

export interface LocationUserLeaveEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.UserLeave;
  userId: UserId;
}

export interface LocationAddMessageEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.AddMessage;
  message: LocationMessageDto;
}

export type LocationEventDto =
  | LocationRenderingUpdatedEventDto
  | LocationAgentExecutionEventDto
  | LocationUserJoinEventDto
  | LocationUserLeaveEventDto
  | LocationAddMessageEventDto;
