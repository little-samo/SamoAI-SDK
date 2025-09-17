import { z } from 'zod';

import { UserPrivateDto, UserPublicDto } from './user';

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
  appearance: z.string().max(500).optional(),

  isAllowSensitive: z.boolean().optional(),
});

export type UpdateCurrentUserBodyDto = z.infer<
  typeof UpdateCurrentUserBodySchema
>;

export interface UpdateCurrentUserResponseDto {
  success: boolean;
  error?: string;
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
});

export type GetUsersByIdsQueryDto = z.infer<typeof GetUsersByIdsQuerySchema>;

export interface GetUserPublicsByIdsResponseDto {
  users: UserPublicDto[];
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
