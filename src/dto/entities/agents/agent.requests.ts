import {
  AgentConfig,
  AgentConfigSchema,
  AgentHelperType,
  PREDEFINED_AVATARS,
} from '@little-samo/samo-ai-sdk/models';
import { z } from 'zod';

import { AgentPrivateDto, AgentPublicDto } from './agent';
import { AgentPresetDto } from './agent.preset';

// ================================
// HTTP API DTOs
// ================================

// GET /agents - User agents list with pagination
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

// GET /agents/publics - Get public agents by IDs
// GET /agents/privates - Get private agents by IDs
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

// PATCH /agents/config - Update agent configuration
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

// PATCH /agents/credential - Update agent credential
export const AgentUpdateCredentialSchema = z.object({
  agentId: z.coerce.bigint(),
  credential: z.union([
    z.object({
      type: z.literal('x_twitter'),
      email: z.string().max(255),
      password: z.string().max(255),
      username: z.string().max(255),
    }),
    z.object({
      type: z.literal('notion'),
      token: z.string().max(255),
    }),
  ]),
});

export type AgentUpdateCredentialDto = z.infer<
  typeof AgentUpdateCredentialSchema
>;

export interface AgentUpdateCredentialResponseDto {
  success: boolean;
  error?: string;
}

// DELETE /agents/credential - Delete agent credential
export const AgentDeleteCredentialSchema = z.object({
  agentId: z.coerce.bigint(),
  credentialType: z.string(),
});

export type AgentDeleteCredentialDto = z.infer<
  typeof AgentDeleteCredentialSchema
>;

export interface AgentDeleteCredentialResponseDto {
  success: boolean;
  error?: string;
}

// GET /agents/presets - Get agent presets with pagination
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

// POST /agents - Create agent
export const CreateAgentSchema = z.object({
  name: z.string().max(64),
  role: z.string().max(500),
  avatar: z
    .union([
      ...(Object.entries(PREDEFINED_AVATARS).map(([key, description]) =>
        z.literal(key).describe(description)
      ) as [
        z.ZodLiteral<string>,
        z.ZodLiteral<string>,
        ...z.ZodLiteral<string>[],
      ]),
    ])
    .describe('Visual representation identifier for the agent.'),
});

export type CreateAgentDto = z.infer<typeof CreateAgentSchema>;

export interface CreateAgentResponseDto {
  agent: AgentPrivateDto;
}

// POST /agents/from-preset - Create agent from preset
export const CreateAgentFromPresetSchema = z.object({
  presetId: z.coerce.bigint(),
});

export type CreateAgentFromPresetDto = z.infer<
  typeof CreateAgentFromPresetSchema
>;

export interface CreateAgentFromPresetResponseDto {
  agent: AgentPrivateDto;
}

// GET /agents/helper - Get or create helper agent
export const GetHelperAgentSchema = z.object({
  helperType: z.nativeEnum(AgentHelperType),
});

export type GetHelperAgentDto = z.infer<typeof GetHelperAgentSchema>;

export interface GetHelperAgentResponseDto {
  agent: AgentPrivateDto;
}

// POST /agents/:agentId/upload-avatar - Upload agent avatar
export const UploadAgentAvatarParamsSchema = z.object({
  agentId: z.coerce.bigint(),
});

export type UploadAgentAvatarParamsDto = z.infer<
  typeof UploadAgentAvatarParamsSchema
>;

export interface UploadAgentAvatarResponseDto {
  avatarUrl: string;
}

// DELETE /agents/:agentId - Delete agent
export const DeleteAgentParamsSchema = z.object({
  agentId: z.coerce.bigint(),
});

export type DeleteAgentParamsDto = z.infer<typeof DeleteAgentParamsSchema>;

export interface DeleteAgentResponseDto {
  success: boolean;
  error?: string;
}
