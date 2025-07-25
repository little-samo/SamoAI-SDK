import {
  AgentConfig,
  AgentConfigSchema,
  AgentHelperType,
} from '@little-samo/samo-ai-sdk/models';
import { z } from 'zod';

import { AgentPrivateDto, AgentPublicDto } from './agent';
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

export const GetAgentsByIdsQuerySchema = z.object({
  agentIds: z
    .string()
    .transform((val) =>
      val.split(',').map((id) => z.coerce.bigint().parse(id.trim()))
    )
    .refine((arr) => arr.length > 0 && arr.length <= 25, {
      message: 'agentIds must contain 1-25 agent IDs',
    }),
});

export type GetAgentsByIdsQueryDto = z.infer<typeof GetAgentsByIdsQuerySchema>;

export interface GetAgentPublicsByIdsResponseDto {
  agents: AgentPublicDto[];
}

export interface GetAgentPrivatesByIdsResponseDto {
  agents: AgentPrivateDto[];
}

export const AgentUpdateConfigSchema = z.object({
  agentId: z.coerce.bigint().describe('ID of the agent to update'),
  config: AgentConfigSchema.partial()
    .strict()
    .describe(
      'Only the specific configuration fields that need to be updated (name, avatar, core, etc.). ' +
        'For the character field: properties are merged at the individual level rather than replacing entire categories. ' +
        'Empty string values ("") will delete the corresponding property. If a category becomes empty after deletions, the category itself is removed.'
    ),
});

export type AgentUpdateConfigDto = z.infer<typeof AgentUpdateConfigSchema>;

export type AgentUpdateConfigResponseDto = Partial<AgentConfig>;

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
  presetId: z.coerce.bigint(),
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
