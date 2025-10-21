import { z } from 'zod';

// ================================
// HTTP API DTOs
// ================================

// POST /images/avatar - Generate avatar image
export const GenerateAvatarImageBodySchema = z.object({
  image: z.string().max(2048).optional(),
  prompt: z.string().max(500).optional(),
});

export type GenerateAvatarImageBodyDto = z.infer<
  typeof GenerateAvatarImageBodySchema
>;

export interface GenerateAvatarImageResponseDto {
  url: string;
  prompt: string;
}
