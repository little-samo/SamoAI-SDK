import { DayOfWeek } from '@little-samo/samo-ai/common';
import { LocationId } from '@little-samo/samo-ai/models';
import { LocationPlatform } from '@little-samo/samo-ai-sdk/models';
import { z } from 'zod';

import {
  LocationConfig,
  LocationConfigSchema,
} from '../../models/locations/location.config';

import {
  LocationContentDto,
  LocationCostDto,
  LocationListItemDto,
  LocationPrivateDto,
} from './location';
import { LocationMessageDto } from './location.message';
import { LocationPresetDto } from './location.preset';
import { LocationScheduledMessageDto } from './location.scheduled-message';
import { LocationSnapshotDto } from './location.snapshot';

import type { AgentPrivateDto } from '../entities';

// ================================
// HTTP API DTOs
// ================================

// GET /locations - User locations list
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

// GET /locations/published - Get published locations
export const PublishedLocationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(25).optional().default(1),
  limit: z.coerce.number().min(1).max(10).default(10),
});

export type PublishedLocationsQueryDto = z.infer<
  typeof PublishedLocationsQuerySchema
>;

export interface PublishedLocationsResponseDto {
  locations: LocationListItemDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /locations/trending - Get trending locations
export const TrendingLocationsQuerySchema = z.object({});

export type TrendingLocationsQueryDto = z.infer<
  typeof TrendingLocationsQuerySchema
>;

export interface TrendingLocationsResponseDto {
  locations: LocationListItemDto[];
}

// GET /locations/unread-counts - Multiple locations unread count
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
  locationId: LocationId;
  unreadCount: number;
  lastMessage: LocationMessageDto | null;
}

export interface LocationsUnreadCountResponseDto {
  data: LocationUnreadCountItemDto[];
}

// PATCH /locations/config - Update location configuration
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

// PATCH /locations/credential - Update location credential
export const LocationUpdateCredentialSchema = z.object({
  locationId: z.coerce.bigint(),
  credential: z.union([
    z.object({
      type: z.literal('notion'),
      token: z.string().max(255),
    }),
    z.object({
      type: z.literal('notion'),
      token: z.string().max(255),
    }),
  ]),
});

export type LocationUpdateCredentialDto = z.infer<
  typeof LocationUpdateCredentialSchema
>;

export interface LocationUpdateCredentialResponseDto {
  success: boolean;
  error?: string;
}

// DELETE /locations/credential - Delete location credential
export const LocationDeleteCredentialSchema = z.object({
  locationId: z.coerce.bigint(),
  credentialType: z.string(),
});

export type LocationDeleteCredentialDto = z.infer<
  typeof LocationDeleteCredentialSchema
>;

export interface LocationDeleteCredentialResponseDto {
  success: boolean;
  error?: string;
}

// GET /locations/presets - Get location presets with pagination
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

// POST /locations/preset - Create location preset
export const CreateLocationPresetSchema = z.object({
  presetId: z.coerce.bigint(),
  isAllowImport: z.boolean().optional().default(false),
});

export type CreateLocationPresetDto = z.infer<
  typeof CreateLocationPresetSchema
>;

export interface CreateLocationPresetResponseDto {
  preset: LocationPresetDto;
}

// POST /locations - Create location
export const CreateLocationSchema = z.object({
  config: LocationConfigSchema.partial()
    .strict()
    .describe('Location configuration settings (e.g., name, description)'),
  platform: z
    .nativeEnum(LocationPlatform)
    .optional()
    .default(LocationPlatform.API),
});

export type CreateLocationDto = z.infer<typeof CreateLocationSchema>;

export interface CreateLocationResponseDto {
  location: LocationPrivateDto;
}

// POST /locations/from-preset - Create location from preset
export const CreateLocationFromPresetSchema = z.object({
  presetId: z.coerce.bigint(),
  platform: z
    .nativeEnum(LocationPlatform)
    .optional()
    .default(LocationPlatform.API),
  import: z.boolean().optional().default(false),
});

export type CreateLocationFromPresetDto = z.infer<
  typeof CreateLocationFromPresetSchema
>;

export interface CreateLocationFromPresetResponseDto {
  location: LocationPrivateDto;
  agents: AgentPrivateDto[];
}

// GET /locations/helper - Get or create helper location
export const GetHelperLocationQuerySchema = z.object({
  platform: z
    .nativeEnum(LocationPlatform)
    .optional()
    .default(LocationPlatform.API),
});

export type GetHelperLocationDto = z.infer<typeof GetHelperLocationQuerySchema>;

export interface GetHelperLocationResponseDto {
  location: LocationPrivateDto;
}

// GET /locations/agent-helper - Get or create agent helper location
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

// GET /locations/location-helper - Get or create location helper location
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

// GET /locations/agent-dm - Get or create agent DM location
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

// GET /locations/:locationId - Get single location
export const GetLocationParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationParamsDto = z.infer<typeof GetLocationParamsSchema>;

export interface GetLocationResponseDto {
  location: LocationListItemDto;
}

// DELETE /locations/:locationId - Delete location
export const DeleteLocationParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type DeleteLocationParamsDto = z.infer<
  typeof DeleteLocationParamsSchema
>;

export interface DeleteLocationResponseDto {
  success: boolean;
  error?: string;
}

// GET /locations/:locationId/private - Get location private details
export const GetLocationPrivateParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationPrivateParamsDto = z.infer<
  typeof GetLocationPrivateParamsSchema
>;

export interface GetLocationPrivateResponseDto {
  location: LocationPrivateDto;
}

// GET /locations/:locationId/cost - Get location cost
export const GetLocationCostParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationCostParamsDto = z.infer<
  typeof GetLocationCostParamsSchema
>;

export interface GetLocationCostResponseDto {
  cost: LocationCostDto;
}

// POST /locations/:locationId/upload-thumbnail - Upload location thumbnail
export const UploadLocationThumbnailParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type UploadLocationThumbnailParamsDto = z.infer<
  typeof UploadLocationThumbnailParamsSchema
>;

export interface UploadLocationThumbnailResponseDto {
  thumbnailUrl: string;
}

// GET /locations/:locationId/content - Get location content
export const GetLocationContentParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationContentParamsDto = z.infer<
  typeof GetLocationContentParamsSchema
>;

export interface GetLocationContentResponseDto {
  content: LocationContentDto;
}

// POST /locations/:locationId/deposit-credits - Deposit credits to location
export const DepositCreditsParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type DepositCreditsParamsDto = z.infer<
  typeof DepositCreditsParamsSchema
>;

export const DepositCreditsBodySchema = z.object({
  amount: z.number().int().positive(),
});

export type DepositCreditsBodyDto = z.infer<typeof DepositCreditsBodySchema>;

export interface DepositCreditsResponseDto {
  success: boolean;
  error?: string;
}

// POST /locations/:locationId/withdraw-credits - Withdraw credits from location
export const WithdrawCreditsParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type WithdrawCreditsParamsDto = z.infer<
  typeof WithdrawCreditsParamsSchema
>;

export const WithdrawCreditsBodySchema = z.object({
  amount: z.number().int().positive(),
});

export type WithdrawCreditsBodyDto = z.infer<typeof WithdrawCreditsBodySchema>;

export interface WithdrawCreditsResponseDto {
  success: boolean;
  error?: string;
}

// POST /locations/:locationId/create-snapshot - Create message snapshot for sharing
export const CreateLocationSnapshotParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type CreateLocationSnapshotParamsDto = z.infer<
  typeof CreateLocationSnapshotParamsSchema
>;

export const CreateLocationSnapshotBodySchema = z.object({
  maxMessages: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .optional()
    .default(30),
});

export type CreateLocationSnapshotBodyDto = z.infer<
  typeof CreateLocationSnapshotBodySchema
>;

export interface CreateLocationSnapshotResponseDto {
  snapshotKey: string;
}

// GET /locations/snapshots/:snapshotKey - Get snapshot by key
export const GetLocationSnapshotParamsSchema = z.object({
  snapshotKey: z.string().max(128),
});

export type GetLocationSnapshotParamsDto = z.infer<
  typeof GetLocationSnapshotParamsSchema
>;

export interface GetLocationSnapshotResponseDto {
  snapshot: LocationSnapshotDto;
}

// POST /locations/:locationId/mark-read - Mark location messages as read
export const MarkLocationAsReadParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type MarkLocationAsReadParamsDto = z.infer<
  typeof MarkLocationAsReadParamsSchema
>;

// GET /locations/:locationId/unread-count - Get location unread message count
export const LocationUnreadCountParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type LocationUnreadCountParamsDto = z.infer<
  typeof LocationUnreadCountParamsSchema
>;

export interface LocationUnreadCountResponseDto {
  unreadCount: number;
}

// POST /locations/:locationId/join-agent - Join agent to location
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

// Tool schema for MCP (combines params and body)
export const JoinAgentToLocationToolSchema = z.object({
  locationId: z.coerce.bigint(),
  agentId: z.coerce.bigint(),
});

export type JoinAgentToLocationToolDto = z.infer<
  typeof JoinAgentToLocationToolSchema
>;

// POST /locations/:locationId/remove-agent - Remove agent from location
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

// Tool schema for MCP (combines params and body)
export const RemoveAgentFromLocationToolSchema = z.object({
  locationId: z.coerce.bigint(),
  agentId: z.coerce.bigint(),
});

export type RemoveAgentFromLocationToolDto = z.infer<
  typeof RemoveAgentFromLocationToolSchema
>;

// PUT /locations/:locationId - Update location settings
export const UpdateLocationParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type UpdateLocationParamsDto = z.infer<
  typeof UpdateLocationParamsSchema
>;

export const UpdateLocationBodySchema = z.object({
  visibility: z.enum(['private', 'public', 'publish']).optional(),
  maxUsers: z.number().int().min(1).max(99).optional(),
  publishDescription: z.string().max(500).optional(),
  hashtags: z.array(z.string().max(16)).max(3).optional(),

  useLocationCreditOnly: z.boolean().optional(),
  creditCostPerChat: z.number().int().min(0).max(1000).optional(),
  chatRequiresPaidCredit: z.boolean().optional(),

  isAdminChat: z.boolean().optional(),
  isSensitive: z.boolean().optional(),
});

export type UpdateLocationBodyDto = z.infer<typeof UpdateLocationBodySchema>;

export interface UpdateLocationResponseDto {
  success: boolean;
  error?: string;
}

// GET /locations/:locationId/scheduled-messages - Get scheduled messages
export const GetLocationScheduledMessagesParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationScheduledMessagesParamsDto = z.infer<
  typeof GetLocationScheduledMessagesParamsSchema
>;

export interface GetLocationScheduledMessagesResponseDto {
  scheduledMessages: LocationScheduledMessageDto[];
}

// POST /locations/:locationId/scheduled-messages - Create scheduled message
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

// Tool schema for MCP (combines params and body)
export const CreateLocationScheduledMessageToolSchema =
  LocationScheduledMessageBaseSchema.extend({
    locationId: z.coerce.bigint(),
    message: z.string().max(500),
  });

export type CreateLocationScheduledMessageToolDto = z.infer<
  typeof CreateLocationScheduledMessageToolSchema
>;

// PUT /locations/:locationId/scheduled-messages/:messageId - Update scheduled message
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

// Tool schema for MCP (combines params and body)
export const UpdateLocationScheduledMessageToolSchema =
  LocationScheduledMessageBaseSchema.extend({
    locationId: z.coerce.bigint(),
    messageId: z.string(),
    message: z.string().max(500).optional(),
  });

export type UpdateLocationScheduledMessageToolDto = z.infer<
  typeof UpdateLocationScheduledMessageToolSchema
>;

// DELETE /locations/:locationId/scheduled-messages/:messageId - Delete scheduled message
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

// Tool schema for MCP (combines params and body)
export const DeleteLocationScheduledMessageToolSchema = z.object({
  locationId: z.coerce.bigint(),
  messageId: z.string(),
});

export type DeleteLocationScheduledMessageToolDto = z.infer<
  typeof DeleteLocationScheduledMessageToolSchema
>;

// ================================
// WebSocket DTOs
// ================================

// WS: joinLocation - Join a location room
export const JoinLocationSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type JoinLocationDto = z.infer<typeof JoinLocationSchema>;

export interface JoinLocationResponseDto {
  joined: boolean;
}

// WS: leaveLocation - Leave a location room
export const LeaveLocationSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type LeaveLocationDto = z.infer<typeof LeaveLocationSchema>;

export interface LeaveLocationResponseDto {
  left: boolean;
}

// WS: subscribeLocation - Subscribe to location updates
export const SubscribeLocationSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type SubscribeLocationDto = z.infer<typeof SubscribeLocationSchema>;

export interface SubscribeLocationResponseDto {
  subscribed: boolean;
}

// WS: unsubscribeLocation - Unsubscribe from location updates
export const UnsubscribeLocationSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type UnsubscribeLocationDto = z.infer<typeof UnsubscribeLocationSchema>;

export interface UnsubscribeLocationResponseDto {
  unsubscribed: boolean;
}

// WS: banUserFromLocation - Ban user from location
export const BanUserFromLocationSchema = z.object({
  locationId: z.coerce.bigint(),
  userId: z.coerce.bigint(),
  durationMs: z
    .number()
    .int()
    .min(60 * 1000) // 1 minute
    .max(30 * 24 * 60 * 60 * 1000) // 30 days
    .optional(), // omit for permanent ban
});

export type BanUserFromLocationDto = z.infer<typeof BanUserFromLocationSchema>;

export interface BanUserFromLocationResponseDto {
  bannedUntil: Date;
}

// WS: getLocationMessages - Get location messages with pagination
export const GetLocationMessagesSchema = z.object({
  locationId: z.coerce.bigint(),
  cursor: z.string().optional(),
});

export type GetLocationMessagesDto = z.infer<typeof GetLocationMessagesSchema>;

export interface LocationMessagesResponseDto {
  messages: LocationMessageDto[];
  nextCursor?: string;
}

// WS: sendMessage - Send message to location
export const SendLocationMessageSchema = z.object({
  locationId: z.coerce.bigint(),
  message: z.string().max(2000).optional(),
  action: z.string().max(2000).optional(),
  image: z
    .string()
    .max(4 * 1024 * 1024)
    .optional(), // base64 encoded image, original max 3MB (encoded ~4MB)

  creditAmount: z.number().int().positive().optional(),
  paidCreditOnly: z.boolean().optional(),
});

export type SendLocationMessageDto = z.infer<typeof SendLocationMessageSchema>;

export interface SendMessageResponseDto {}

// WS: sendSystemMessage - Send system message to location
export const SendSystemMessageSchema = z.object({
  locationId: z.coerce.bigint(),
  message: z.string().max(2000),
  resumeUpdate: z.boolean().optional(),
});

export type SendSystemMessageDto = z.infer<typeof SendSystemMessageSchema>;

export interface SendSystemMessageResponseDto {}

// WS: updateLocationImage - Update location image
export const UpdateLocationImageSchema = z.object({
  locationId: z.coerce.bigint(),
  image: z.string().max(4 * 1024 * 1024),
  index: z.number().int().min(0).max(2).optional(),
});

export type UpdateLocationImageDto = z.infer<typeof UpdateLocationImageSchema>;

export interface UpdateLocationImageResponseDto {
  imageUrl?: string;
}

// WS: updateLocationRendering - Update location rendering
export const UpdateLocationRenderingSchema = z.object({
  locationId: z.coerce.bigint(),
  rendering: z.string().max(5000).nullable(),
});

export type UpdateLocationRenderingDto = z.infer<
  typeof UpdateLocationRenderingSchema
>;

export interface UpdateLocationRenderingResponseDto {}

// WS: updateLocationAgentIsActive - Update agent active status
export const UpdateLocationAgentIsActiveSchema = z.object({
  locationId: z.coerce.bigint(),
  agentId: z.coerce.bigint(),
  isActive: z.boolean(),
});

export type UpdateLocationAgentIsActiveDto = z.infer<
  typeof UpdateLocationAgentIsActiveSchema
>;

export interface UpdateLocationAgentIsActiveResponseDto {}

// WS: pauseLocationUpdate - Pause location updates
export const PauseLocationUpdateSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type PauseLocationUpdateDto = z.infer<typeof PauseLocationUpdateSchema>;

export interface PauseLocationUpdateResponseDto {}

// WS: resumeLocationUpdate - Resume location updates with optional delay
export const ResumeLocationUpdateSchema = z.object({
  locationId: z.coerce.bigint(),
  delayMs: z.number().int().min(0).max(60000).optional().default(0),
});

export type ResumeLocationUpdateDto = z.infer<
  typeof ResumeLocationUpdateSchema
>;

export interface ResumeLocationUpdateResponseDto {
  resumeAt: string; // ISO date string
}
