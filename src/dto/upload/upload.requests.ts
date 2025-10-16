import { z } from 'zod';

// ================================
// HTTP API DTOs
// ================================

// POST /upload/image - Get presigned upload URL and form fields for R2 image upload
export const GetImageUploadUrlBodySchema = z.object({});

export type GetImageUploadUrlBodyDto = z.infer<
  typeof GetImageUploadUrlBodySchema
>;

export interface GetImageUploadUrlResponseDto {
  url: string;
  fields: Record<string, string>;
  path: string;
}
