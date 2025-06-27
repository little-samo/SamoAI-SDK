import {
  AgentConfigSchema,
  AgentHelperType,
} from '@little-samo/samo-ai-sdk/models';
import { z } from 'zod';

import { AgentPrivateDto } from './agent';
import { AgentPresetDto } from './agent.preset';

export const AgentsPaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export type AgentsPaginationQueryDto = z.infer<
  typeof AgentsPaginationQuerySchema
>;

export interface AgentsPaginatedResponseDto {
  data: AgentPrivateDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const AgentUpdateConfigSchema = z.object({
  agentId: z.bigint(),
  config: AgentConfigSchema.partial(),
});

export type AgentUpdateConfigDto = z.infer<typeof AgentUpdateConfigSchema>;

export const AgentPresetsPaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export type AgentPresetsPaginationQueryDto = z.infer<
  typeof AgentPresetsPaginationQuerySchema
>;

export interface AgentPresetsPaginatedResponseDto {
  data: AgentPresetDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const CreateAgentFromPresetSchema = z.object({
  presetId: z.bigint(),
});

export type CreateAgentFromPresetDto = z.infer<
  typeof CreateAgentFromPresetSchema
>;

export interface CreateAgentFromPresetResponseDto {
  agent: AgentPrivateDto;
}

export const GetHelperAgentSchema = z.object({
  helperType: z.nativeEnum(AgentHelperType),
});

export type GetHelperAgentDto = z.infer<typeof GetHelperAgentSchema>;

export interface GetHelperAgentResponseDto {
  agent: AgentPrivateDto;
}
