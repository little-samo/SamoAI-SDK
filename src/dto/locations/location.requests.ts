import { z } from 'zod';

import {
  LocationConfig,
  LocationConfigSchema,
} from '../../models/locations/location.config';

import {
  LocationListItemDto,
  LocationPrivateDto,
  LocationPublicDto,
} from './location';
import { LocationMessageDto } from './location.message';
import { LocationPresetDto } from './location.preset';

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
  locationId: z.string().transform((val) => BigInt(val)),
});

export type GetLocationParamsDto = z.infer<typeof GetLocationParamsSchema>;

export interface GetLocationResponseDto {
  location: LocationPublicDto | LocationPrivateDto;
}

// Get Location Private DTOs
export const GetLocationPrivateParamsSchema = z.object({
  locationId: z.string().transform((val) => BigInt(val)),
});

export type GetLocationPrivateParamsDto = z.infer<
  typeof GetLocationPrivateParamsSchema
>;

export interface GetLocationPrivateResponseDto {
  location: LocationPrivateDto;
}

// Mark location as read DTOs
export const MarkLocationAsReadParamsSchema = z.object({
  locationId: z.string().transform((val) => BigInt(val)),
});

export type MarkLocationAsReadParamsDto = z.infer<
  typeof MarkLocationAsReadParamsSchema
>;

// Location unread count DTOs
export const LocationUnreadCountParamsSchema = z.object({
  locationId: z.string().transform((val) => BigInt(val)),
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
    .transform((val) => val.split(',').map((id) => BigInt(id.trim())))
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
  locationId: z.string().transform((val) => BigInt(val)),
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
});

export type GetAgentHelperLocationDto = z.infer<
  typeof GetAgentHelperLocationQuerySchema
>;

export interface GetAgentHelperLocationResponseDto {
  location: LocationPrivateDto;
}

export const GetLocationHelperLocationQuerySchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationHelperLocationDto = z.infer<
  typeof GetLocationHelperLocationQuerySchema
>;

export interface GetLocationHelperLocationResponseDto {
  location: LocationPrivateDto;
}

export const GetAgentDmLocationQuerySchema = z.object({
  agentId: z.coerce.bigint(),
});

export type GetAgentDmLocationDto = z.infer<
  typeof GetAgentDmLocationQuerySchema
>;

export interface GetAgentDmLocationResponseDto {
  location: LocationPrivateDto;
}
