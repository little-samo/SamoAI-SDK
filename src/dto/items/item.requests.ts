import { z } from 'zod';

import { ItemDto } from './item';

// ================================
// HTTP API DTOs
// ================================

// GET /items - Get user owned items
export const GetUserItemsQuerySchema = z.object({
  itemDataIds: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return val
        .split(',')
        .map((id) => z.coerce.number().parse(id.trim()))
        .filter((id) => !isNaN(id));
    })
    .refine((arr) => !arr || arr.length <= 50, {
      message: 'itemDataIds must contain at most 50 item data IDs',
    }),
});

export type GetUserItemsQueryDto = z.infer<typeof GetUserItemsQuerySchema>;

export interface GetUserItemsResponseDto {
  items: ItemDto[];
}
