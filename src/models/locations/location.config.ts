import { z } from 'zod';

import { GimmickCoreSchema } from '../../dto/entities/gimmicks';

import { LocationEnvironment } from './location.constants';

export const LocationEnvironmentSchema = z.union([
  z
    .literal(LocationEnvironment.CHAT)
    .describe('Standard chat environment for general conversations'),
  z
    .literal(LocationEnvironment.NOVEL)
    .describe('Novel writing environment with specialized UI'),
]);

export const LocationConfigCoreSchema = z.object({
  name: z.union([
    z.literal('round_robin').describe('Agents take turns in rotation'),
    z.literal('update_forever').describe('Agents update continuously'),
    z.literal('update_once').describe('Agents execute once per cycle'),
    z
      .literal('update_until_idle')
      .describe('Agents update until no more actions'),
  ]),
  sequential: z.boolean().optional().describe('Execute in fixed order'),
  interval: z
    .number()
    .min(0)
    .max(60 * 60 * 1000) // 1 hour
    .optional()
    .describe(
      'Milliseconds between agent executions. Uses default if unspecified'
    ),
  maxAgentExecutions: z
    .number()
    .min(1)
    .max(10)
    .nullable()
    .optional()
    .describe('Max agent executions per cycle'),
});

export type LocationConfigCore = z.infer<typeof LocationConfigCoreSchema>;

export const LocationConfigCanvasSchema = z.object({
  name: z
    .string()
    .max(32)
    .regex(/^[a-zA-Z_]+$/, 'Name must contain only letters and underscores')
    .describe('Unique identifier agents use to reference this canvas'),
  description: z
    .string()
    .max(1000)
    .describe('Purpose and usage guide for agents'),
  maxLength: z
    .number()
    .min(100)
    .max(5000)
    .describe('Character limit for canvas content'),
});

export type LocationConfigCanvas = z.infer<typeof LocationConfigCanvasSchema>;

export const LocationConfigGimmickImageSchema = z.object({
  url: z.union([
    z
      .string()
      .max(2048)
      .regex(/^https?:\/\/.+/)
      .optional()
      .describe('Official CDN URL (webp only)'),
    z.string().max(32).describe('Location message image key'),
  ]),
  name: z.string().max(64).optional().describe('Name for this reference image'),
  description: z
    .string()
    .max(500)
    .describe('Stable Diffusion prompt describing the image'),
});

export type LocationConfigGimmickImage = z.infer<
  typeof LocationConfigGimmickImageSchema
>;

export const LocationConfigGimmickSchema = z.object({
  core: GimmickCoreSchema.describe('Gimmick type determining behavior'),
  name: z.string().max(64).describe('Display name'),
  appearance: z
    .string()
    .max(500)
    .describe(
      'For character_image_generator: base appearance prompt. For others: how it appears in the location'
    ),
  images: z
    .array(LocationConfigGimmickImageSchema)
    .max(6)
    .optional()
    .describe(
      'Reference images for image_generator and character_image_generator'
    ),
});

export type LocationConfigGimmick = z.infer<typeof LocationConfigGimmickSchema>;

export const LocationConfigSchema = z.object({
  name: z.string().max(64).describe('Location name'),
  thumbnail: z
    .union([
      z
        .string()
        .max(2048)
        .regex(/^https?:\/\/.+/)
        .describe('Official CDN URL (webp only)'),
      z.string().max(32).describe('Location message image key'),
    ])
    .nullable()
    .describe('Location thumbnail. Supports CDN URLs and image keys'),

  environment: LocationEnvironmentSchema.describe(
    'Environment determining context and behavior'
  ),

  core: LocationConfigCoreSchema.describe(
    'Agent execution behavior. Use defaults unless needed'
  ),
  description: z
    .string()
    .max(1000)
    .describe('Location description providing context to agents'),

  rules: z
    .array(z.string().max(200))
    .max(20)
    .describe(
      'Strict constraints all agents must enforce. Cannot be violated. Override agent preferences'
    ),

  canvases: z
    .array(LocationConfigCanvasSchema)
    .max(4)
    .describe('Shared canvases accessible to all entities'),
  agentCanvases: z
    .array(LocationConfigCanvasSchema)
    .max(4)
    .describe('Private canvases for individual agents'),

  gimmicks: z
    .array(LocationConfigGimmickSchema)
    .max(4)
    .describe('Tools agents can execute (e.g., web search, social media)'),
});

export type LocationConfig = z.infer<typeof LocationConfigSchema>;
