import { z } from 'zod';

import { LocationConfigSchema } from '../../models/locations/location.config';

import { LocationBasicDto } from './location';
import { LocationMessageDto } from './location.messages';
import { LocationPresetDto } from './location.preset';

export const LocationsPaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export type LocationsPaginationQueryDto = z.infer<
  typeof LocationsPaginationQuerySchema
>;

export interface LocationsPaginatedResponseDto {
  data: LocationBasicDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LocationMessagesResponseDto {
  messages: LocationMessageDto[];
  cursor?: string;
}

export const LocationPresetsPaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export type LocationPresetsPaginationQueryDto = z.infer<
  typeof LocationPresetsPaginationQuerySchema
>;

export interface LocationPresetsPaginatedResponseDto {
  data: LocationPresetDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const CreateLocationFromPresetSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type CreateLocationFromPresetDto = z.infer<
  typeof CreateLocationFromPresetSchema
>;

export interface CreateLocationFromPresetResponseDto {
  location: LocationBasicDto;
}

export const LocationUpdateConfigSchema = z.object({
  locationId: z.coerce.bigint(),
  config: LocationConfigSchema.partial(),
});

export type LocationUpdateConfigDto = z.infer<
  typeof LocationUpdateConfigSchema
>;

export const GetAgentHelperLocationSchema = z.object({
  agentId: z.coerce.bigint(),
});

export type GetAgentHelperLocationDto = z.infer<
  typeof GetAgentHelperLocationSchema
>;

export interface GetAgentHelperLocationResponseDto {
  location: LocationBasicDto;
}

export const GetLocationHelperLocationSchema = z.object({
  locationId: z.coerce.bigint(),
});

export type GetLocationHelperLocationDto = z.infer<
  typeof GetLocationHelperLocationSchema
>;

export interface GetLocationHelperLocationResponseDto {
  location: LocationBasicDto;
}
