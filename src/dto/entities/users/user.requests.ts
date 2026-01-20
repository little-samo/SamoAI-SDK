import { UserId } from '@little-samo/samo-ai';
import { z } from 'zod';

import { ImageStyleSchema } from '../../images';

import {
  UserApiKeyTypeSchema,
  UserAvatarDto,
  UserCommentDto,
  UserPrivateDto,
  UserPublicDto,
} from './user';
import { NoticeDto } from './user.notice';
import { UserNotificationDto } from './user.notification';

// ================================
// HTTP API DTOs
// ================================

// GET /users/me - Get current user
export const GetCurrentUserQuerySchema = z.object({});

export type GetCurrentUserQueryDto = z.infer<typeof GetCurrentUserQuerySchema>;

export interface GetCurrentUserResponseDto {
  user: UserPrivateDto;
}

// PATCH /users/me - Update current user
export const UpdateCurrentUserBodySchema = z.object({
  username: z
    .string()
    .min(4)
    .max(16)
    .regex(/^[a-z0-9_]+$/)
    .optional(),
  nickname: z.string().min(4).max(32).optional(),
  birthDate: z.coerce.date().optional(),
  profilePicture: z.string().max(2048).optional(),
  role: z.string().max(200).optional(),
  avatarName: z.string().max(64).optional(),
  avatar: z.string().max(2048).optional(),
  referenceAvatar: z.string().max(2048).optional(),
  appearance: z.string().max(500).optional(),
  bio: z.string().max(500).optional(),

  isAllowSensitive: z.boolean().optional(),
});

export type UpdateCurrentUserBodyDto = z.infer<
  typeof UpdateCurrentUserBodySchema
>;

export interface UpdateCurrentUserResponseDto {
  success: boolean;
  error?: string;
}

// DELETE /users/me - Delete current user (withdrawal)
export const DeleteCurrentUserBodySchema = z.object({
  reason: z.string().min(1).max(500),
});

export type DeleteCurrentUserBodyDto = z.infer<
  typeof DeleteCurrentUserBodySchema
>;

export interface DeleteCurrentUserResponseDto {}

// GET /users/me/avatars - Get user's saved avatars
export const GetUserAvatarsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type GetUserAvatarsQueryDto = z.infer<typeof GetUserAvatarsQuerySchema>;

export interface GetUserAvatarsResponseDto {
  data: UserAvatarDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// POST /users/me/avatars - Create user's avatar
export const CreateUserAvatarBodySchema = z.object({
  name: z.string().max(64),
  role: z.string().max(200).optional(),
  avatar: z.string().max(2048),
  referenceAvatar: z.string().max(2048).optional(),
  examplePoses: z.array(z.string().max(2048)).optional(),
  appearance: z.string().max(500),
  style: ImageStyleSchema.optional(),
  isPublic: z.boolean().optional().default(false),
});

export type CreateUserAvatarBodyDto = z.infer<
  typeof CreateUserAvatarBodySchema
>;

export interface CreateUserAvatarResponseDto {
  avatar: UserAvatarDto;
}

// PATCH /users/me/avatars/:id - Update user's avatar
export const UpdateUserAvatarParamsSchema = z.object({
  id: z.coerce.bigint(),
});

export type UpdateUserAvatarParamsDto = z.infer<
  typeof UpdateUserAvatarParamsSchema
>;

export const UpdateUserAvatarBodySchema = z.object({
  examplePoses: z.array(z.string().max(2048)).optional(),
  isPublic: z.boolean().optional(),
});

export type UpdateUserAvatarBodyDto = z.infer<
  typeof UpdateUserAvatarBodySchema
>;

export interface UpdateUserAvatarResponseDto {
  avatar: UserAvatarDto;
}

// DELETE /users/me/avatars/:id - Delete user's avatar
export const DeleteUserAvatarParamsSchema = z.object({
  id: z.coerce.bigint(),
});

export type DeleteUserAvatarParamsDto = z.infer<
  typeof DeleteUserAvatarParamsSchema
>;

export const DeleteUserAvatarBodySchema = z.object({});

export type DeleteUserAvatarBodyDto = z.infer<
  typeof DeleteUserAvatarBodySchema
>;

export interface DeleteUserAvatarResponseDto {}

// GET /users/me/avatars/liked - Get liked avatars
export const GetLikedUserAvatarsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type GetLikedUserAvatarsQueryDto = z.infer<
  typeof GetLikedUserAvatarsQuerySchema
>;

export interface GetLikedUserAvatarsResponseDto {
  avatars: UserAvatarDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /users/me/attendance - Get attendance records
export const GetAttendanceQuerySchema = z.object({});

export type GetAttendanceQueryDto = z.infer<typeof GetAttendanceQuerySchema>;

export interface GetAttendanceResponseDto {
  lastAttendanceAt: Date | null;
  attendanceStreak: number;
  rewards: number[];
  intervals: number[];
  minRewardCredits: number;
  maxRewardCredits: number;
  cycleDays: number;
  bonusInterval: number;
  bonusMultiplier: number;
  finalDayMultiplier: number;
  maxSkipDays: number;
}

// POST /users/me/attendance - Check attendance
export const CheckAttendanceBodySchema = z.object({});

export type CheckAttendanceBodyDto = z.infer<typeof CheckAttendanceBodySchema>;

export interface CheckAttendanceResponseDto {
  rewardCredits: number;
}

// POST /users/validate - Validate username or nickname before update
export const ValidateUserFieldBodySchema = z.object({
  username: z
    .string()
    .min(4)
    .max(16)
    .regex(/^[a-z0-9_]+$/)
    .optional(),
  nickname: z.string().min(4).max(32).optional(),
});

export type ValidateUserFieldBodyDto = z.infer<
  typeof ValidateUserFieldBodySchema
>;

export interface ValidateUserFieldResponseDto {
  isValid: boolean;
  message?: string;
}

// GET /users/publics - Get multiple users by IDs
export const GetUsersByIdsQuerySchema = z.object({
  userIds: z
    .string()
    .transform((val) => val.split(',').map((id) => BigInt(id.trim())))
    .refine((arr) => arr.length > 0 && arr.length <= 25, {
      message: 'userIds must contain 1-25 user IDs',
    }),
  locationId: z.coerce.bigint().optional(),
});

export type GetUsersByIdsQueryDto = z.infer<typeof GetUsersByIdsQuerySchema>;

export interface GetUserPublicsByIdsResponseDto {
  users: UserPublicDto[];
}

// GET /users/avatars - Get public avatars
export const GetPublicAvatarsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type GetPublicAvatarsQueryDto = z.infer<
  typeof GetPublicAvatarsQuerySchema
>;

export interface GetPublicAvatarsResponseDto {
  avatars: UserAvatarDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /users/avatars/search - Search public avatars
export const SearchPublicAvatarsQuerySchema = z.object({
  query: z.string().min(1).max(100),
  page: z.coerce.number().int().min(1).max(10).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type SearchPublicAvatarsQueryDto = z.infer<
  typeof SearchPublicAvatarsQuerySchema
>;

export interface SearchPublicAvatarsResponseDto {
  avatars: UserAvatarDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /users/avatars/:id - Get user's avatar by ID
export const GetUserAvatarParamsSchema = z.object({
  id: z.coerce.bigint(),
});

export type GetUserAvatarParamsDto = z.infer<typeof GetUserAvatarParamsSchema>;

export interface GetUserAvatarResponseDto {
  avatar: UserAvatarDto;
}

// GET /users/:userId/avatars - Get specific user's public avatars
export const GetUserPublicAvatarsParamsSchema = z.object({
  userId: z.coerce.bigint(),
});

export type GetUserPublicAvatarsParamsDto = z.infer<
  typeof GetUserPublicAvatarsParamsSchema
>;

export const GetUserPublicAvatarsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type GetUserPublicAvatarsQueryDto = z.infer<
  typeof GetUserPublicAvatarsQuerySchema
>;

export interface GetUserPublicAvatarsResponseDto {
  avatars: UserAvatarDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// POST /users/avatars/:avatarId/like - Like an avatar
export const LikeUserAvatarParamsSchema = z.object({
  avatarId: z.coerce.bigint(),
});

export type LikeUserAvatarParamsDto = z.infer<
  typeof LikeUserAvatarParamsSchema
>;

export interface LikeUserAvatarResponseDto {
  likeCount: number;
  isLiked: boolean;
}

// DELETE /users/avatars/:avatarId/like - Unlike an avatar
export const UnlikeUserAvatarParamsSchema = z.object({
  avatarId: z.coerce.bigint(),
});

export type UnlikeUserAvatarParamsDto = z.infer<
  typeof UnlikeUserAvatarParamsSchema
>;

export interface UnlikeUserAvatarResponseDto {
  likeCount: number;
  isLiked: boolean;
}

// POST /users/:userId/follow - Follow a user
export const FollowUserParamsSchema = z.object({
  userId: z.coerce.bigint(),
});

export type FollowUserParamsDto = z.infer<typeof FollowUserParamsSchema>;

export interface FollowUserResponseDto {}

// DELETE /users/:userId/follow - Unfollow a user
export const UnfollowUserParamsSchema = z.object({
  userId: z.coerce.bigint(),
});

export type UnfollowUserParamsDto = z.infer<typeof UnfollowUserParamsSchema>;

export interface UnfollowUserResponseDto {}

// GET /users/:userId/followers - Get user's followers
export const GetUserFollowersParamsSchema = z.object({
  userId: z.coerce.bigint(),
});

export type GetUserFollowersParamsDto = z.infer<
  typeof GetUserFollowersParamsSchema
>;

export const GetUserFollowersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type GetUserFollowersQueryDto = z.infer<
  typeof GetUserFollowersQuerySchema
>;

export interface GetUserFollowersResponseDto {
  userIds: UserId[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /users/:userId/following - Get users that a user is following
export const GetUserFollowingParamsSchema = z.object({
  userId: z.coerce.bigint(),
});

export type GetUserFollowingParamsDto = z.infer<
  typeof GetUserFollowingParamsSchema
>;

export const GetUserFollowingQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type GetUserFollowingQueryDto = z.infer<
  typeof GetUserFollowingQuerySchema
>;

export interface GetUserFollowingResponseDto {
  userIds: UserId[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /users/:userId/comments - Get comments for user
export const GetUserCommentsParamsSchema = z.object({
  userId: z.coerce.bigint(),
});

export type GetUserCommentsParamsDto = z.infer<
  typeof GetUserCommentsParamsSchema
>;

export const GetUserCommentsQuerySchema = z.object({
  sortBy: z.enum(['latest', 'recommended']).optional().default('latest'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

export type GetUserCommentsQueryDto = z.infer<
  typeof GetUserCommentsQuerySchema
>;

export interface GetUserCommentsResponseDto {
  data: UserCommentDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /users/:userId/comments/:commentId/replies - Get replies for comment
export const GetUserCommentRepliesParamsSchema = z.object({
  commentId: z.coerce.bigint(),
});

export type GetUserCommentRepliesParamsDto = z.infer<
  typeof GetUserCommentRepliesParamsSchema
>;

export const GetUserCommentRepliesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

export type GetUserCommentRepliesQueryDto = z.infer<
  typeof GetUserCommentRepliesQuerySchema
>;

export interface GetUserCommentRepliesResponseDto {
  data: UserCommentDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// POST /users/:userId/comments - Create comment
export const CreateUserCommentParamsSchema = z.object({
  userId: z.coerce.bigint(),
});

export type CreateUserCommentParamsDto = z.infer<
  typeof CreateUserCommentParamsSchema
>;

export const CreateUserCommentBodySchema = z.object({
  parentCommentId: z.coerce.bigint().optional(),
  content: z.string().min(1).max(2000),
  contentImageUrl: z.string().url().optional(),
  isSecret: z.boolean().optional().default(false),
});

export type CreateUserCommentBodyDto = z.infer<
  typeof CreateUserCommentBodySchema
>;

export interface CreateUserCommentResponseDto {
  comment: UserCommentDto;
}

// PATCH /users/:userId/comments/:commentId/reaction - Update comment reaction
export const UpdateUserCommentReactionParamsSchema = z.object({
  commentId: z.coerce.bigint(),
});

export type UpdateUserCommentReactionParamsDto = z.infer<
  typeof UpdateUserCommentReactionParamsSchema
>;

export const UpdateUserCommentReactionBodySchema = z.object({
  reactionType: z.enum(['LIKE', 'DISLIKE']).nullable(),
});

export type UpdateUserCommentReactionBodyDto = z.infer<
  typeof UpdateUserCommentReactionBodySchema
>;

export interface UpdateUserCommentReactionResponseDto {
  success: boolean;
  error?: string;
}

// POST /users/:userId/comments/:commentId/report - Report comment
export const ReportUserCommentParamsSchema = z.object({
  userId: z.coerce.bigint(),
  commentId: z.coerce.bigint(),
});

export type ReportUserCommentParamsDto = z.infer<
  typeof ReportUserCommentParamsSchema
>;

export interface ReportUserCommentResponseDto {
  success: boolean;
  error?: string;
}

// DELETE /users/:userId/comments/:commentId - Delete comment
export const DeleteUserCommentParamsSchema = z.object({
  userId: z.coerce.bigint(),
  commentId: z.coerce.bigint(),
});

export type DeleteUserCommentParamsDto = z.infer<
  typeof DeleteUserCommentParamsSchema
>;

export interface DeleteUserCommentResponseDto {
  success: boolean;
  error?: string;
}

// GET /users/me/referral - Get current user's referral info
export const GetUserReferralQuerySchema = z.object({});

export type GetUserReferralQueryDto = z.infer<
  typeof GetUserReferralQuerySchema
>;

export interface GetUserReferralResponseDto {
  referralCode: string;
  referrerId: bigint | null;
  referrerCode: string | null;
  totalRewardCredits: number;
  referralCount: number;
  rewardCreditsPerReferral: number;
}

// POST /users/me/referral - Set referrer code
export const SetUserReferrerBodySchema = z.object({
  referralCode: z
    .string()
    .length(6)
    .regex(/^[A-Z0-9]+$/),
});

export type SetUserReferrerBodyDto = z.infer<typeof SetUserReferrerBodySchema>;

export interface SetUserReferrerResponseDto {
  rewardCredits: number;
}

// GET /users/me/notices - Get published notices for current user (auth optional)
export const GetNoticesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type GetNoticesQueryDto = z.infer<typeof GetNoticesQuerySchema>;

export interface GetNoticesResponseDto {
  data: NoticeDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  unacknowledgedCount: number;
}

// POST /users/me/notices/acknowledge - acknowledge all notices
export const AcknowledgeNoticesBodySchema = z.object({});

export type AcknowledgeNoticesBodyDto = z.infer<
  typeof AcknowledgeNoticesBodySchema
>;

export interface AcknowledgeNoticesResponseDto {}

// POST /users/me/notices/read - read all notices
export const ReadAllNoticesBodySchema = z.object({});

export type ReadAllNoticesBodyDto = z.infer<typeof ReadAllNoticesBodySchema>;

export interface ReadAllNoticesResponseDto {}

// POST /users/me/notices/:noticeId/read
export const ReadNoticeParamsSchema = z.object({
  noticeId: z.coerce.bigint(),
});

export type ReadNoticeParamsDto = z.infer<typeof ReadNoticeParamsSchema>;

export interface ReadNoticeResponseDto {}

// GET /users/me/notifications - Get notifications for current user
export const GetUserNotificationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(20),
});

export type GetUserNotificationsQueryDto = z.infer<
  typeof GetUserNotificationsQuerySchema
>;

export interface GetUserNotificationsResponseDto {
  data: UserNotificationDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  unacknowledgedCount: number;
}

// POST /users/me/notifications/acknowledge - acknowledge all
export const AcknowledgeUserNotificationsBodySchema = z.object({});

export type AcknowledgeUserNotificationsBodyDto = z.infer<
  typeof AcknowledgeUserNotificationsBodySchema
>;

export interface AcknowledgeUserNotificationsResponseDto {}

// POST /users/me/notifications/read - read all notifications
export const ReadAllUserNotificationsBodySchema = z.object({});

export type ReadAllUserNotificationsBodyDto = z.infer<
  typeof ReadAllUserNotificationsBodySchema
>;

export interface ReadAllUserNotificationsResponseDto {}

// POST /users/me/notifications/:notificationId/read
export const ReadUserNotificationParamsSchema = z.object({
  notificationId: z.coerce.bigint().optional(),
});

export type ReadUserNotificationParamsDto = z.infer<
  typeof ReadUserNotificationParamsSchema
>;

export interface ReadUserNotificationResponseDto {}

// GET /users/me/settings - Get user settings/constants by keys
export const GetUserSettingsQuerySchema = z.object({
  keys: z
    .string()
    .transform((val) => val.split(',').map((key) => key.trim()))
    .refine((arr) => arr.length > 0, {
      message: 'At least one key must be provided',
    }),
});

export type GetUserSettingsQueryDto = z.infer<
  typeof GetUserSettingsQuerySchema
>;

export interface GetUserSettingsResponseDto {
  settings: Record<string, string | number | boolean | object | null>;
}

// GET /users/me/api-keys - Get API key for specific type
export const GetUserApiKeyQuerySchema = z.object({
  type: UserApiKeyTypeSchema,
});

export type GetUserApiKeyQueryDto = z.infer<typeof GetUserApiKeyQuerySchema>;

export interface GetUserApiKeyResponseDto {
  apiKey: string;
}

// POST /users/me/api-keys/regenerate - Regenerate API key for specific type
export const RegenerateUserApiKeyBodySchema = z.object({
  type: UserApiKeyTypeSchema,
});

export type RegenerateUserApiKeyBodyDto = z.infer<
  typeof RegenerateUserApiKeyBodySchema
>;

export interface RegenerateUserApiKeyResponseDto {
  apiKey: string;
}

// ================================
// WebSocket DTOs
// ================================

// WS: me - Get current user
export const GetCurrentUserSchema = z.object({});

export type GetCurrentUserDto = z.infer<typeof GetCurrentUserSchema>;

export interface GetCurrentUserResponseDto {
  user: UserPrivateDto;
}
