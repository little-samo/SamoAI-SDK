import { DayOfWeek } from '@little-samo/samo-ai/common';
import { LocationPlatform } from '@little-samo/samo-ai-sdk/models';
import { z } from 'zod';

import {
  LocationConfig,
  LocationConfigSchema,
} from '../../models/locations/location.config';

import { LocationListItemDto, LocationPrivateDto } from './location';
import { LocationMessageDto } from './location.message';
import { LocationPresetDto } from './location.preset';
import { LocationScheduledMessageDto } from './location.scheduled-message';

// User locations DTOs
export const UserLocationsQuerySchema = z.object({
  cursor: z.string().optional().describe('Pagination cursor for next page'),
  limit: z.coerce
    .number()
    .min(1)
    .max(10)
    .default(10)
    .describe('Number of locations to return'),
});

export type UserLocationsQueryDto = z.infer<typeof UserLocationsQuerySchema>;

export interface UserLocationsResponseDto {
  locations: LocationListItemDto[];
  meta: {
    total: number;
    nextCursor?: string;
  };
}

// Get location DTOs
export const GetLocationParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationParamsDto = z.infer<typeof GetLocationParamsSchema>;

export interface GetLocationResponseDto {
  location: LocationListItemDto;
}

// Get Location Private DTOs
export const GetLocationPrivateParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationPrivateParamsDto = z.infer<
  typeof GetLocationPrivateParamsSchema
>;

export interface GetLocationPrivateResponseDto {
  location: LocationPrivateDto;
}

// Mark location as read DTOs
export const MarkLocationAsReadParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type MarkLocationAsReadParamsDto = z.infer<
  typeof MarkLocationAsReadParamsSchema
>;

// Location unread count DTOs
export const LocationUnreadCountParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type LocationUnreadCountParamsDto = z.infer<
  typeof LocationUnreadCountParamsSchema
>;

export interface LocationUnreadCountResponseDto {
  unreadCount: number;
}

// Multiple locations unread count DTOs
export const LocationsUnreadCountQuerySchema = z.object({
  locationIds: z
    .string()
    .transform((val) =>
      val.split(',').map((id) => z.coerce.bigint().parse(id.trim()))
    )
    .refine((arr) => arr.length > 0 && arr.length <= 10, {
      message: 'locationIds must contain 1-10 location IDs',
    }),
});

export type LocationsUnreadCountQueryDto = z.infer<
  typeof LocationsUnreadCountQuerySchema
>;

export interface LocationUnreadCountItemDto {
  locationId: bigint;
  unreadCount: number;
  lastMessage: LocationMessageDto | null;
}

export interface LocationsUnreadCountResponseDto {
  data: LocationUnreadCountItemDto[];
}

// Join agent to location DTOs
export const JoinAgentToLocationParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type JoinAgentToLocationParamsDto = z.infer<
  typeof JoinAgentToLocationParamsSchema
>;

export const JoinAgentToLocationBodySchema = z.object({
  agentId: z.coerce.bigint(),
});

export type JoinAgentToLocationBodyDto = z.infer<
  typeof JoinAgentToLocationBodySchema
>;

export interface JoinAgentToLocationResponseDto {
  agentAdded: boolean;
  message?: string;
}

// Join agent to location tool schema (combines params and body for tools)
export const JoinAgentToLocationToolSchema = z.object({
  locationId: z.coerce.bigint(),
  agentId: z.coerce.bigint(),
});

export type JoinAgentToLocationToolDto = z.infer<
  typeof JoinAgentToLocationToolSchema
>;

// Remove agent from location DTOs
export const RemoveAgentFromLocationParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type RemoveAgentFromLocationParamsDto = z.infer<
  typeof RemoveAgentFromLocationParamsSchema
>;

export const RemoveAgentFromLocationBodySchema = z.object({
  agentId: z.coerce.bigint(),
});

export type RemoveAgentFromLocationBodyDto = z.infer<
  typeof RemoveAgentFromLocationBodySchema
>;

export interface RemoveAgentFromLocationResponseDto {
  agentRemoved: boolean;
  message?: string;
}

// Remove agent from location tool schema (combines params and body for tools)
export const RemoveAgentFromLocationToolSchema = z.object({
  locationId: z.coerce.bigint(),
  agentId: z.coerce.bigint(),
});

export type RemoveAgentFromLocationToolDto = z.infer<
  typeof RemoveAgentFromLocationToolSchema
>;

export interface LocationMessagesResponseDto {
  messages: LocationMessageDto[];
  cursor?: string;
}

export const LocationPresetsPaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export type LocationPresetsPaginationQueryDto = z.infer<
  typeof LocationPresetsPaginationQuerySchema
>;

export interface LocationPresetsPaginatedResponseDto {
  data: LocationPresetDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const CreateLocationFromPresetSchema = z.object({
  presetId: z.coerce.bigint(),
  platform: z
    .nativeEnum(LocationPlatform)
    .optional()
    .default(LocationPlatform.API),
});

export type CreateLocationFromPresetDto = z.infer<
  typeof CreateLocationFromPresetSchema
>;

export interface CreateLocationFromPresetResponseDto {
  location: LocationPrivateDto;
}

export const LocationUpdateConfigSchema = z.object({
  locationId: z.coerce.bigint().describe('ID of the location to update'),
  config: LocationConfigSchema.partial()
    .strict()
    .describe(
      'Only the specific configuration fields that need to be updated (name, environment, core, description, etc.)'
    ),
});

export type LocationUpdateConfigDto = z.infer<
  typeof LocationUpdateConfigSchema
>;

export type LocationUpdateConfigResponseDto = Partial<LocationConfig>;

export const GetAgentHelperLocationQuerySchema = z.object({
  agentId: z.coerce.bigint(),
  platform: z
    .nativeEnum(LocationPlatform)
    .optional()
    .default(LocationPlatform.API),
});

export type GetAgentHelperLocationDto = z.infer<
  typeof GetAgentHelperLocationQuerySchema
>;

export interface GetAgentHelperLocationResponseDto {
  location: LocationPrivateDto;
}

export const GetLocationHelperLocationQuerySchema = z.object({
  locationId: z.coerce.bigint(),
  platform: z
    .nativeEnum(LocationPlatform)
    .optional()
    .default(LocationPlatform.API),
});

export type GetLocationHelperLocationDto = z.infer<
  typeof GetLocationHelperLocationQuerySchema
>;

export interface GetLocationHelperLocationResponseDto {
  location: LocationPrivateDto;
}

export const GetAgentDmLocationQuerySchema = z.object({
  agentId: z.coerce.bigint(),
  platform: z
    .nativeEnum(LocationPlatform)
    .optional()
    .default(LocationPlatform.API),
});

export type GetAgentDmLocationDto = z.infer<
  typeof GetAgentDmLocationQuerySchema
>;

export interface GetAgentDmLocationResponseDto {
  location: LocationPrivateDto;
}

// Get scheduled messages DTOs
export const GetLocationScheduledMessagesParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationScheduledMessagesParamsDto = z.infer<
  typeof GetLocationScheduledMessagesParamsSchema
>;

export interface GetLocationScheduledMessagesResponseDto {
  scheduledMessages: LocationScheduledMessageDto[];
}

// Create scheduled message DTOs
export const CreateLocationScheduledMessageParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type CreateLocationScheduledMessageParamsDto = z.infer<
  typeof CreateLocationScheduledMessageParamsSchema
>;

// Base schema for common repeat fields
const LocationScheduledMessageBaseSchema = z.object({
  repeatTimesOfDay: z
    .array(z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/))
    .min(1)
    .max(24)
    .describe('Times of day to repeat the message (24-hour format)'),
  repeatDaysOfWeek: z
    .array(z.nativeEnum(DayOfWeek))
    .max(7)
    .optional()
    .default([])
    .describe('Days of week to repeat the message'),
});

export const CreateLocationScheduledMessageBodySchema =
  LocationScheduledMessageBaseSchema.extend({
    message: z.string().max(500),
  });

export type CreateLocationScheduledMessageBodyDto = z.infer<
  typeof CreateLocationScheduledMessageBodySchema
>;

export interface CreateLocationScheduledMessageResponseDto {
  scheduledMessage: LocationScheduledMessageDto;
}

// Update scheduled message DTOs
export const UpdateLocationScheduledMessageParamsSchema = z.object({
  locationId: z.coerce.bigint(),
  messageId: z.string(),
});

export type UpdateLocationScheduledMessageParamsDto = z.infer<
  typeof UpdateLocationScheduledMessageParamsSchema
>;

export const UpdateLocationScheduledMessageBodySchema =
  LocationScheduledMessageBaseSchema.extend({
    message: z.string().max(500).optional(),
  });

export type UpdateLocationScheduledMessageBodyDto = z.infer<
  typeof UpdateLocationScheduledMessageBodySchema
>;

export interface UpdateLocationScheduledMessageResponseDto {
  scheduledMessage: LocationScheduledMessageDto;
}

// Delete scheduled message DTOs
export const DeleteLocationScheduledMessageParamsSchema = z.object({
  locationId: z.coerce.bigint(),
  messageId: z.string(),
});

export type DeleteLocationScheduledMessageParamsDto = z.infer<
  typeof DeleteLocationScheduledMessageParamsSchema
>;

export interface DeleteLocationScheduledMessageResponseDto {
  deleted: boolean;
}

// Tool schemas that combine params and body for MCP tools
const LocationScheduledMessageToolBaseSchema = z
  .object({
    locationId: z.coerce.bigint(),
  })
  .merge(LocationScheduledMessageBaseSchema);

export const CreateLocationScheduledMessageToolSchema =
  LocationScheduledMessageToolBaseSchema.extend({
    message: z.string().max(500),
  });

export type CreateLocationScheduledMessageToolDto = z.infer<
  typeof CreateLocationScheduledMessageToolSchema
>;

export const UpdateLocationScheduledMessageToolSchema =
  LocationScheduledMessageToolBaseSchema.extend({
    messageId: z.string(),
    message: z.string().max(500).optional(),
  });

export type UpdateLocationScheduledMessageToolDto = z.infer<
  typeof UpdateLocationScheduledMessageToolSchema
>;

export const DeleteLocationScheduledMessageToolSchema = z.object({
  locationId: z.coerce.bigint(),
  messageId: z.string(),
});

export type DeleteLocationScheduledMessageToolDto = z.infer<
  typeof DeleteLocationScheduledMessageToolSchema
>;
