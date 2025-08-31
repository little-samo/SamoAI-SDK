import { AgentId, GimmickId, LocationId, UserId } from '@little-samo/samo-ai';

import { LocationCanvasDto } from './location';
import { LocationMessageDto } from './location.message';

export const LocationEventType = {
  AgentJoined: 'AgentJoined',
  AgentLeft: 'AgentLeft',
  AgentExecuting: 'AgentExecuting',
  AgentExecuted: 'AgentExecuted',
  UserJoined: 'UserJoined',
  UserLeft: 'UserLeft',
  GimmickExecuting: 'GimmickExecuting',
  GimmickExecuted: 'GimmickExecuted',
  AddMessage: 'AddMessage',
  UpdateMessage: 'UpdateMessage',
  MessageProcessed: 'MessageProcessed',
  RenderingUpdated: 'RenderingUpdated',
  CanvasUpdated: 'CanvasUpdated',
  PauseUpdateUntilUpdated: 'PauseUpdateUntilUpdated',
  LocationUpdated: 'LocationUpdated',
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
  success: boolean;
  error?: string;
}

export interface LocationAgentJoinedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.AgentJoined;
  agentId: AgentId;
}

export interface LocationAgentLeftEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.AgentLeft;
  agentId: AgentId;
}

export interface LocationUserJoinedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.UserJoined;
  userId: UserId;
}

export interface LocationUserLeftEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.UserLeft;
  userId: UserId;
}

export interface LocationGimmickExecutingEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.GimmickExecuting;
  gimmickId: GimmickId;
}

export interface LocationGimmickExecutedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.GimmickExecuted;
  gimmickId: GimmickId;
  success: boolean;
  error?: string;
}

export interface LocationAddMessageEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.AddMessage;
  message: LocationMessageDto;
}

export interface LocationUpdateMessageEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.UpdateMessage;
  messageId: string;
  message: LocationMessageDto;
}

export interface LocationMessageProcessedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.MessageProcessed;
  lastMessageId: string;
}

export interface LocationRenderingUpdatedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.RenderingUpdated;
  rendering: string | null;
}

export interface LocationCanvasUpdatedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.CanvasUpdated;
  name: string;
  canvas: LocationCanvasDto;
}

export interface LocationPauseUpdateUntilUpdatedEventDto
  extends LocationEventDtoBase {
  type: typeof LocationEventType.PauseUpdateUntilUpdated;
  pauseUpdateUntil: Date | null;
  pauseUpdateReason: string | null;
}

export interface LocationUpdatedEventDto extends LocationEventDtoBase {
  type: typeof LocationEventType.LocationUpdated;
}

export type LocationEventDto =
  | LocationAgentExecutingEventDto
  | LocationAgentExecutedEventDto
  | LocationAgentJoinedEventDto
  | LocationAgentLeftEventDto
  | LocationUserJoinedEventDto
  | LocationUserLeftEventDto
  | LocationGimmickExecutingEventDto
  | LocationGimmickExecutedEventDto
  | LocationAddMessageEventDto
  | LocationUpdateMessageEventDto
  | LocationMessageProcessedEventDto
  | LocationRenderingUpdatedEventDto
  | LocationCanvasUpdatedEventDto
  | LocationPauseUpdateUntilUpdatedEventDto
  | LocationUpdatedEventDto;
