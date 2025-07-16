import { AgentId, LocationId, UserId } from '@little-samo/samo-ai';

import { UserPublicDto } from '../entities';

import { LocationMessageDto } from './location.message';

export const LocationEventType = {
  AgentExecuting: 'AgentExecuting',
  AgentExecuted: 'AgentExecuted',
  UserJoin: 'UserJoin',
  UserLeave: 'UserLeave',
  AddMessage: 'AddMessage',
  RenderingUpdated: 'RenderingUpdated',
  PauseUpdateUntilUpdated: 'PauseUpdateUntilUpdated',
} as const;

export type LocationEventType =
  (typeof LocationEventType)[keyof typeof LocationEventType];

export interface LocationEventDtoBase {
  locationId: LocationId;
  userIds?: UserId[];
  type: LocationEventType;
}

export interface LocationAgentExecutingEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.AgentExecuting;
  agentId: AgentId;
}

export interface LocationAgentExecutedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.AgentExecuted;
  agentId: AgentId;
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

export interface LocationRenderingUpdatedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.RenderingUpdated;
  rendering: string | null;
}

export interface LocationPauseUpdateUntilUpdatedEventDto
  extends LocationEventDtoBase {
  type: typeof LocationEventType.PauseUpdateUntilUpdated;
  pauseUpdateUntil: Date | null;
  pauseUpdateReason: string | null;
}

export type LocationEventDto =
  | LocationAgentExecutingEventDto
  | LocationAgentExecutedEventDto
  | LocationUserJoinEventDto
  | LocationUserLeaveEventDto
  | LocationAddMessageEventDto
  | LocationRenderingUpdatedEventDto
  | LocationPauseUpdateUntilUpdatedEventDto;
