import { z } from 'zod';

import {
  UserAvatarDto,
  UserAvatarSchema,
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

// GET /users/me/avatars - Get user's saved avatars
export const GetUserAvatarsQuerySchema = z.object({});

export type GetUserAvatarsQueryDto = z.infer<typeof GetUserAvatarsQuerySchema>;

export interface GetUserAvatarsResponseDto {
  avatars: (UserAvatarDto | null)[];
}

// PATCH /users/me/avatars - Update user's avatar
export const UpdateUserAvatarBodySchema = z
  .object({
    index: z.coerce.number().int().min(0).optional(),
    locationId: z.coerce.bigint().optional(),
    avatar: UserAvatarSchema.nullable().optional(),
  })
  .refine((data) => data.index !== undefined || data.locationId !== undefined, {
    message: 'Either index or locationId must be provided',
  });

export type UpdateUserAvatarBodyDto = z.infer<
  typeof UpdateUserAvatarBodySchema
>;

export interface UpdateUserAvatarResponseDto {
  success: boolean;
  error?: string;
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

// POST /users/me/notices/:noticeId/read
export const ReadNoticeParamsSchema = z.object({
  noticeId: z.coerce.bigint().optional(),
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

// POST /users/me/notifications/:notificationId/read
export const ReadUserNotificationParamsSchema = z.object({
  notificationId: z.coerce.bigint().optional(),
});

export type ReadUserNotificationParamsDto = z.infer<
  typeof ReadUserNotificationParamsSchema
>;

export interface ReadUserNotificationResponseDto {}

// ================================
// WebSocket DTOs
// ================================

// WS: me - Get current user
export const GetCurrentUserSchema = z.object({});

export type GetCurrentUserDto = z.infer<typeof GetCurrentUserSchema>;

export interface GetCurrentUserResponseDto {
  user: UserPrivateDto;
}
