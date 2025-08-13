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
