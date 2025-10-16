import { z } from 'zod';

// ================================
// HTTP API DTOs
// ================================

// POST /upload/image - Get presigned upload URL for R2 image upload (using PUT method)
export const GetImageUploadUrlBodySchema = z.object({
  fileSizeBytes: z
    .number()
    .int()
    .positive()
    .max(1024 * 1024), // Max 1MB
});

export type GetImageUploadUrlBodyDto = z.infer<
  typeof GetImageUploadUrlBodySchema
>;

export interface GetImageUploadUrlResponseDto {
  url: string;
  contentType: string;
  path: string;
}
