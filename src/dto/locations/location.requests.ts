import { DayOfWeek } from '@little-samo/samo-ai/common';
import { LocationId } from '@little-samo/samo-ai/models';
import {
  AgentConfigSchema,
  LocationPlatform,
} from '@little-samo/samo-ai-sdk/models';
import { z } from 'zod';

import {
  LocationConfig,
  LocationConfigSchema,
} from '../../models/locations/location.config';
import { type AgentPrivateDto } from '../entities';
import { UserAvatarSchema } from '../entities/users/user';

import {
  LocationContentDto,
  LocationCostDto,
  LocationListItemDto,
  LocationPrivateDto,
} from './location';
import { LocationMessageDto } from './location.message';
import {
  LocationPresetCanvasSchema,
  LocationPresetCommentDto,
  LocationPresetDetailDto,
  LocationPresetDto,
  LocationPresetMessageSchema,
  LocationPresetMissionSchema,
  LocationPresetPrivateDto,
} from './location.preset';
import { LocationScheduledMessageDto } from './location.scheduled-message';
import { LocationSnapshotDto } from './location.snapshot';

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
  page: z.coerce.number().int().min(1).optional().default(1),
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
  visibility: z
    .enum(['edited', 'private', 'public', 'publish'])
    .optional()
    .default('publish'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export type LocationPresetsPaginationQueryDto = z.infer<
  typeof LocationPresetsPaginationQuerySchema
>;

export interface LocationPresetsPaginatedResponseDto {
  data: LocationPresetDetailDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /locations/presets/published - Get published location presets
export const PublishedLocationPresetsQuerySchema = z.object({
  type: z.enum(['NOVEL']),
  gender: z.enum(['all', 'male', 'female']).optional().default('all'),
  tag: z.string().max(32).optional(),
  sortBy: z.enum(['popular', 'latest']).optional().default('popular'),
  ownerUserId: z.coerce.bigint().optional(),
  page: z.coerce.number().int().min(1).max(25).optional().default(1),
  limit: z.coerce.number().min(1).max(10).default(10),
});
export type PublishedLocationPresetsQueryDto = z.infer<
  typeof PublishedLocationPresetsQuerySchema
>;

export interface PublishedLocationPresetsResponseDto {
  data: LocationPresetDetailDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /locations/presets/following - Get published location presets from followed users
export const FollowingLocationPresetsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(10).optional().default(1),
  limit: z.coerce.number().min(1).max(10).default(10),
});

export type FollowingLocationPresetsQueryDto = z.infer<
  typeof FollowingLocationPresetsQuerySchema
>;

export interface FollowingLocationPresetsResponseDto {
  data: LocationPresetDetailDto[];
  meta: {
    page: number;
    limit: number;
  };
}

// GET /locations/presets/search - Search location presets
export const SearchLocationPresetsQuerySchema = z.object({
  query: z.string().min(1).max(100),
  type: z.enum(['NOVEL']),
  gender: z.enum(['all', 'male', 'female']).optional().default('all'),
  sortBy: z.enum(['popular', 'latest']).optional().default('popular'),
  page: z.coerce.number().int().min(1).max(10).optional().default(1),
  limit: z.coerce.number().min(1).max(10).default(10),
});

export type SearchLocationPresetsQueryDto = z.infer<
  typeof SearchLocationPresetsQuerySchema
>;

export interface SearchLocationPresetsResponseDto {
  data: LocationPresetDetailDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /locations/presets/search/rankings - Get search query rankings
export const SearchQueryRankingsQuerySchema = z.object({});

export type SearchQueryRankingsQueryDto = z.infer<
  typeof SearchQueryRankingsQuerySchema
>;

export interface SearchQueryRankingsResponseDto {
  queries: string[];
}

// GET /locations/presets/trending - Get trending location presets
export const TrendingLocationPresetsQuerySchema = z.object({
  type: z.enum(['NOVEL']),
  gender: z.enum(['all', 'male', 'female']).optional().default('all'),
});
export type TrendingLocationPresetsQueryDto = z.infer<
  typeof TrendingLocationPresetsQuerySchema
>;

export interface TrendingLocationPresetsResponseDto {
  data: LocationPresetDetailDto[];
}

// POST /locations/preset - Create location preset
export const CreateLocationPresetSchema = z.object({
  locationId: z.coerce.bigint().optional(),

  visibility: z.enum(['private', 'public', 'publish']).optional(),

  name: z.string().max(64).optional(),
  presetDescription: z.string().max(5000),
  presetShortDescription: z.string().max(80),
  hashtags: z.array(z.string().max(21)).max(10).optional(),

  isAllowImport: z.boolean().optional(),
  isSensitive: z.boolean().optional(),

  locationConfig: LocationConfigSchema.partial().optional(),
  agentConfigs: z.array(AgentConfigSchema.partial()).optional(),
});

export type CreateLocationPresetDto = z.infer<
  typeof CreateLocationPresetSchema
>;

export interface CreateLocationPresetResponseDto {
  preset: LocationPresetDto;
}

// GET /locations/preset/:presetId - Get location preset
export const GetLocationPresetParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type GetLocationPresetParamsDto = z.infer<
  typeof GetLocationPresetParamsSchema
>;

export interface GetLocationPresetResponseDto {
  preset: LocationPresetDetailDto;
}

// GET /locations/preset/:presetId/private - Get location preset private details
export const GetLocationPresetPrivateParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type GetLocationPresetPrivateParamsDto = z.infer<
  typeof GetLocationPresetPrivateParamsSchema
>;

export interface GetLocationPresetPrivateResponseDto {
  preset: LocationPresetPrivateDto;
}

// PATCH /locations/preset/:presetId - Update location preset
export const UpdateLocationPresetParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type UpdateLocationPresetParamsDto = z.infer<
  typeof UpdateLocationPresetParamsSchema
>;

export const UpdateLocationPresetBodySchema = z.object({
  name: z.string().max(64).optional(),
  presetDescription: z.string().max(5000).optional(),
  presetShortDescription: z.string().max(80).optional(),
  thumbnail: z.string().max(2048).optional(),
  thumbnails: z.array(z.string().max(2048)).max(100).optional(),
  canvases: z.array(LocationPresetCanvasSchema).max(4).optional(),
  mission: LocationPresetMissionSchema.nullable().optional(),
  messages: z.array(LocationPresetMessageSchema).max(10).optional(),
  userAvatar: UserAvatarSchema.nullable().optional(),
  tags: z.array(z.string().max(32)).max(8).optional(),
  hashtags: z.array(z.string().max(21)).max(10).optional(),

  isAllowImport: z.boolean().optional(),
  isSensitive: z.boolean().optional(),

  locationConfig: LocationConfigSchema.partial().optional(),
  agentConfigs: z.array(AgentConfigSchema.partial().nullable()).optional(),
});

export type UpdateLocationPresetBodyDto = z.infer<
  typeof UpdateLocationPresetBodySchema
>;

export interface UpdateLocationPresetResponseDto {
  preset: LocationPresetDto;
}

// POST /locations/preset/:presetId/save - Save location preset
export const SaveLocationPresetParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type SaveLocationPresetParamsDto = z.infer<
  typeof SaveLocationPresetParamsSchema
>;

export const SaveLocationPresetBodySchema = z.object({
  visibility: z.enum(['private', 'public', 'publish']).optional(),
});

export type SaveLocationPresetBodyDto = z.infer<
  typeof SaveLocationPresetBodySchema
>;

export interface SaveLocationPresetResponseDto {
  preset: LocationPresetDto;
}

// POST /locations/preset/:presetId/publish - Publish location preset
export const PublishLocationPresetParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type PublishLocationPresetParamsDto = z.infer<
  typeof PublishLocationPresetParamsSchema
>;

export const PublishLocationPresetBodySchema = z.object({
  visibility: z.enum(['private', 'public', 'publish']),
});

export type PublishLocationPresetBodyDto = z.infer<
  typeof PublishLocationPresetBodySchema
>;

export interface PublishLocationPresetResponseDto {
  preset: LocationPresetDto;
}

// POST /locations/preset/:presetId/sync - Sync location preset to source location and increase version
export const SyncLocationPresetVersionParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type SyncLocationPresetVersionParamsDto = z.infer<
  typeof SyncLocationPresetVersionParamsSchema
>;

export interface SyncLocationPresetVersionResponseDto {
  preset: LocationPresetDto;
}

// PATCH /locations/preset/:presetId/rating - Update location preset rating (like/dislike)
export const UpdateLocationPresetRatingParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type UpdateLocationPresetRatingParamsDto = z.infer<
  typeof UpdateLocationPresetRatingParamsSchema
>;

export const UpdateLocationPresetRatingBodySchema = z.object({
  rating: z.enum(['LIKE', 'DISLIKE']).nullable(),
});

export type UpdateLocationPresetRatingBodyDto = z.infer<
  typeof UpdateLocationPresetRatingBodySchema
>;

export interface UpdateLocationPresetRatingResponseDto {
  success: boolean;
  error?: string;
}

// POST /locations/preset/:presetId/report - Report location preset
export const ReportLocationPresetParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type ReportLocationPresetParamsDto = z.infer<
  typeof ReportLocationPresetParamsSchema
>;

export interface ReportLocationPresetResponseDto {
  success: boolean;
  error?: string;
}

// DELETE /locations/preset/:presetId - Delete location preset
export const DeleteLocationPresetParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type DeleteLocationPresetParamsDto = z.infer<
  typeof DeleteLocationPresetParamsSchema
>;

export interface DeleteLocationPresetResponseDto {
  success: boolean;
  error?: string;
}

// POST /locations/preset/:presetId/duplicate - Duplicate location preset
export const DuplicateLocationPresetParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type DuplicateLocationPresetParamsDto = z.infer<
  typeof DuplicateLocationPresetParamsSchema
>;

export interface DuplicateLocationPresetResponseDto {
  preset: LocationPresetDto;
}

// POST /locations/preset/:presetId/translate - Translate location preset
export const TranslateLocationPresetParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type TranslateLocationPresetParamsDto = z.infer<
  typeof TranslateLocationPresetParamsSchema
>;

export const TranslateLocationPresetBodySchema = z.object({
  targetLanguage: z.enum(['ko', 'en', 'ja']),
});

export type TranslateLocationPresetBodyDto = z.infer<
  typeof TranslateLocationPresetBodySchema
>;

export interface TranslateLocationPresetResponseDto {
  preset: LocationPresetDto;
}

// GET /locations/preset/:presetId/locations - Get locations created from preset
export const GetLocationPresetLocationsParamsSchema = z.object({
  presetId: z.coerce.bigint(),
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(10).default(10),
});

export type GetLocationPresetLocationsParamsDto = z.infer<
  typeof GetLocationPresetLocationsParamsSchema
>;

export interface GetLocationPresetLocationsResponseDto {
  locations: LocationListItemDto[];
  meta: {
    total: number;
    nextCursor?: string;
  };
}

// GET /locations/preset/:presetId/comments - Get comments for preset
export const GetLocationPresetCommentsParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type GetLocationPresetCommentsParamsDto = z.infer<
  typeof GetLocationPresetCommentsParamsSchema
>;

export const GetLocationPresetCommentsQuerySchema = z.object({
  sortBy: z.enum(['latest', 'recommended']).optional().default('latest'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

export type GetLocationPresetCommentsQueryDto = z.infer<
  typeof GetLocationPresetCommentsQuerySchema
>;

export interface GetLocationPresetCommentsResponseDto {
  data: LocationPresetCommentDto[];
  pinnedComment: LocationPresetCommentDto | null;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /locations/preset/:presetId/comments/:commentId/replies - Get replies for comment
export const GetLocationPresetCommentRepliesParamsSchema = z.object({
  commentId: z.coerce.bigint(),
});

export type GetLocationPresetCommentRepliesParamsDto = z.infer<
  typeof GetLocationPresetCommentRepliesParamsSchema
>;

export const GetLocationPresetCommentRepliesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

export type GetLocationPresetCommentRepliesQueryDto = z.infer<
  typeof GetLocationPresetCommentRepliesQuerySchema
>;

export interface GetLocationPresetCommentRepliesResponseDto {
  data: LocationPresetCommentDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// POST /locations/preset/:presetId/comments - Create comment
export const CreateLocationPresetCommentParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type CreateLocationPresetCommentParamsDto = z.infer<
  typeof CreateLocationPresetCommentParamsSchema
>;

export const CreateLocationPresetCommentBodySchema = z.object({
  parentCommentId: z.coerce.bigint().optional(),
  content: z.string().min(1).max(2000),
  contentImageUrl: z.string().url().optional(),
  isSecret: z.boolean().optional().default(false),
});

export type CreateLocationPresetCommentBodyDto = z.infer<
  typeof CreateLocationPresetCommentBodySchema
>;

export interface CreateLocationPresetCommentResponseDto {
  comment: LocationPresetCommentDto;
}

// PATCH /locations/preset/:presetId/comments/:commentId/reaction - Update comment reaction
export const UpdateLocationPresetCommentReactionParamsSchema = z.object({
  commentId: z.coerce.bigint(),
});

export type UpdateLocationPresetCommentReactionParamsDto = z.infer<
  typeof UpdateLocationPresetCommentReactionParamsSchema
>;

export const UpdateLocationPresetCommentReactionBodySchema = z.object({
  reactionType: z.enum(['LIKE', 'DISLIKE']).nullable(),
});

export type UpdateLocationPresetCommentReactionBodyDto = z.infer<
  typeof UpdateLocationPresetCommentReactionBodySchema
>;

export interface UpdateLocationPresetCommentReactionResponseDto {
  success: boolean;
  error?: string;
}

// POST /locations/preset/:presetId/comments/:commentId/report - Report comment
export const ReportLocationPresetCommentParamsSchema = z.object({
  presetId: z.coerce.bigint(),
  commentId: z.coerce.bigint(),
});

export type ReportLocationPresetCommentParamsDto = z.infer<
  typeof ReportLocationPresetCommentParamsSchema
>;

export interface ReportLocationPresetCommentResponseDto {
  success: boolean;
  error?: string;
}

// DELETE /locations/preset/:presetId/comments/:commentId - Delete comment
export const DeleteLocationPresetCommentParamsSchema = z.object({
  presetId: z.coerce.bigint(),
  commentId: z.coerce.bigint(),
});

export type DeleteLocationPresetCommentParamsDto = z.infer<
  typeof DeleteLocationPresetCommentParamsSchema
>;

export interface DeleteLocationPresetCommentResponseDto {
  success: boolean;
  error?: string;
}

// PATCH /locations/preset/:presetId/pin-comment - Pin or unpin comment
export const PinLocationPresetCommentParamsSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type PinLocationPresetCommentParamsDto = z.infer<
  typeof PinLocationPresetCommentParamsSchema
>;

export const PinLocationPresetCommentBodySchema = z.object({
  commentId: z.coerce.bigint().nullable(),
});

export type PinLocationPresetCommentBodyDto = z.infer<
  typeof PinLocationPresetCommentBodySchema
>;

export interface PinLocationPresetCommentResponseDto {
  success: boolean;
  error?: string;
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

// POST /locations/:locationId/reset - Reset location
export const ResetLocationParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type ResetLocationParamsDto = z.infer<typeof ResetLocationParamsSchema>;

export const ResetLocationBodySchema = z.object({
  resetAgents: z.boolean().optional().default(false),
});

export type ResetLocationBodyDto = z.infer<typeof ResetLocationBodySchema>;

export interface ResetLocationResponseDto {
  success: boolean;
  error?: string;
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

// PATCH /locations/:locationId - Update location settings
export const UpdateLocationParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type UpdateLocationParamsDto = z.infer<
  typeof UpdateLocationParamsSchema
>;

export const UpdateLocationBodySchema = z.object({
  overrideAgentLlmLevel: z
    .enum(['FREE', 'LOW', 'MEDIUM', 'HIGH'])
    .nullable()
    .optional(),

  visibility: z.enum(['private', 'public', 'publish']).optional(),
  maxUsers: z.number().int().min(1).max(99).optional(),
  publishDescription: z.string().max(500).optional(),
  hashtags: z.array(z.string().max(21)).max(10).optional(),

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

// PATCH /locations/:locationId/canvas - Update location canvas
export const UpdateLocationCanvasParamsSchema = z.object({
  locationId: z.coerce.bigint(),
});
export type UpdateLocationCanvasParamsDto = z.infer<
  typeof UpdateLocationCanvasParamsSchema
>;

export const UpdateLocationCanvasBodySchema = z.object({
  name: z.string().max(32),
  text: z.string().max(5000),
});
export type UpdateLocationCanvasBodyDto = z.infer<
  typeof UpdateLocationCanvasBodySchema
>;

export interface UpdateLocationCanvasResponseDto {
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

// PATCH /locations/:locationId/scheduled-messages/:messageId - Update scheduled message
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
  message: z.string().max(800).optional(),
  action: z.string().max(2000).optional(),
  image: z.string().max(2048).optional(),

  creditAmount: z.number().int().positive().optional(),
  paidCreditOnly: z.boolean().optional(),
});

export type SendLocationMessageDto = z.infer<typeof SendLocationMessageSchema>;

export interface SendMessageResponseDto {}

// WS: sendSystemMessage - Send system message to location
export const SendSystemMessageSchema = z.object({
  locationId: z.coerce.bigint(),
  message: z.string().max(800),
  resumeUpdate: z.boolean().optional(),
});

export type SendSystemMessageDto = z.infer<typeof SendSystemMessageSchema>;

export interface SendSystemMessageResponseDto {}

// WS: updateLocationImage - Update location image
export const UpdateLocationImageSchema = z.object({
  locationId: z.coerce.bigint(),
  image: z.string().max(2048),
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

// WS: updateLocationMission - Update location mission
export const UpdateLocationMissionSchema = z.object({
  locationId: z.coerce.bigint(),
  mission: LocationPresetMissionSchema.nullable(),
});

export type UpdateLocationMissionDto = z.infer<
  typeof UpdateLocationMissionSchema
>;

export interface UpdateLocationMissionResponseDto {}

// WS: generateLocationSuggestedResponses - Generate suggested responses for user
export const GenerateLocationSuggestedResponsesSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GenerateLocationSuggestedResponsesDto = z.infer<
  typeof GenerateLocationSuggestedResponsesSchema
>;

export interface GenerateLocationSuggestedResponsesResponseDto {}

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
