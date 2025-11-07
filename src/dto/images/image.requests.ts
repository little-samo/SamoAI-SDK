import { z } from 'zod';

// ================================
// HTTP API DTOs
// ================================

// POST /images/avatar - Generate avatar image
export const GenerateAvatarImageBodySchema = z.object({
  style: z
    .enum(['realistic', 'webtoon', 'cartoon', 'anime'])
    .optional()
    .default('webtoon'),
  image: z.string().max(2048).optional(),
  prompt: z.string().max(500).optional(),
});

export type GenerateAvatarImageBodyDto = z.infer<
  typeof GenerateAvatarImageBodySchema
>;

export interface GenerateAvatarImageResponseDto {
  avatarUrl: string;
  referenceAvatarUrl: string;
  prompt: string;
}
