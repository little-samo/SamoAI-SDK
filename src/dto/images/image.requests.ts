import { z } from 'zod';

// ================================
// HTTP API DTOs
// ================================

// POST /images/avatar - Generate avatar image
export const GenerateAvatarImageBodySchema = z.object({
  type: z.enum(['avatar', 'reference']).optional().default('avatar'),
  style: z
    .enum(['realistic', 'webtoon', 'webtoon2', 'illustration', 'anime'])
    .optional()
    .default('webtoon'),
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
  style: z
    .enum(['realistic', 'webtoon', 'webtoon2', 'illustration', 'anime'])
    .optional()
    .default('webtoon'),
  image: z.string().max(2048).optional(),
  prompt: z.string().max(500).optional(),
});

export type GenerateThumbnailImageBodyDto = z.infer<
  typeof GenerateThumbnailImageBodySchema
>;

export interface GenerateThumbnailImageResponseDto {
  imageUrl: string;
}
