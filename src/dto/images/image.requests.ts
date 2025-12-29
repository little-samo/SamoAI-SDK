import { z } from 'zod';

import { ImageStyleSchema } from './image';

// ================================
// HTTP API DTOs
// ================================

// POST /images/avatar - Generate avatar image
export const GenerateAvatarImageBodySchema = z.object({
  type: z.enum(['avatar', 'reference']).optional().default('avatar'),
  style: ImageStyleSchema.optional().default('webtoon'),
  image: z.string().max(2048).optional(),
  prompt: z.string().max(500).optional(),
});

export type GenerateAvatarImageBodyDto = z.infer<
  typeof GenerateAvatarImageBodySchema
>;

export interface GenerateAvatarImageResponseDto {
  prompt: string;
  imageUrl: string;
}

// POST /images/thumbnail - Generate thumbnail image
export const GenerateThumbnailImageBodySchema = z.object({
  style: ImageStyleSchema.optional().default('webtoon'),
  image: z.string().max(2048).optional(),
  prompt: z.string().max(500).optional(),
});

export type GenerateThumbnailImageBodyDto = z.infer<
  typeof GenerateThumbnailImageBodySchema
>;

export interface GenerateThumbnailImageResponseDto {
  imageUrl: string;
}

// GET /images/scene.webp - Get scene image (returns image file directly)
export const GetSceneImageQuerySchema = z.object({
  avatar: z.coerce.bigint(),
  scene: z.string().max(1000),
  style: ImageStyleSchema.optional().default('webtoon'),
});

export type GetSceneImageQueryDto = z.infer<typeof GetSceneImageQuerySchema>;
