import { z } from 'zod';

import { ItemDto, ItemStackSchema } from './item';

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

// POST /items/exchange - Exchange items
export const ExchangeItemsBodySchema = z.object({
  requiredItems: z.array(ItemStackSchema).min(1).max(10),
  receivedItems: z.array(ItemStackSchema).min(1).max(10),
});

export type ExchangeItemsBodyDto = z.infer<typeof ExchangeItemsBodySchema>;

export interface ExchangeItemsResponseDto {
  items: ItemDto[];
}
