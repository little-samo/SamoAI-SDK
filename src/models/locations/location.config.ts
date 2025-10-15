import { z } from 'zod';

import { GimmickCoreSchema } from '../../dto/entities/gimmicks';

import { LocationEnvironment } from './location.constants';

export const LocationEnvironmentSchema = z.union([
  z
    .literal(LocationEnvironment.CHAT)
    .describe(
      'Standard conversational environment for general agent interactions'
    ),
  z
    .literal(LocationEnvironment.NOVEL)
    .describe('Novel environment with UI designed for novel writing'),
]);

export const LocationConfigCoreSchema = z.object({
  name: z.union([
    z.literal('round_robin').describe('Execute agents in rotating order'),
    z
      .literal('update_forever')
      .describe('Continuously update agents without stopping'),
    z.literal('update_once').describe('Execute agents only once per cycle'),
    z
      .literal('update_until_idle')
      .describe('Update agents continuously until no actions are available'),
  ]),
  sequential: z.boolean().optional().describe('Execute agents in fixed order'),
  interval: z
    .number()
    .min(0)
    .max(60 * 60 * 1000) // 1 hour
    .optional()
    .describe(
      'Interval in milliseconds between agent executions. Use default value if not specified'
    ),
  maxAgentExecutions: z
    .number()
    .min(1)
    .max(10)
    .nullable()
    .optional()
    .describe('Maximum number of agent executions per cycle'),
});

export type LocationConfigCore = z.infer<typeof LocationConfigCoreSchema>;

export const LocationConfigCanvasSchema = z.object({
  name: z
    .string()
    .max(32)
    .regex(/^[a-zA-Z_]+$/, 'Name must contain only letters and underscores')
    .describe(
      'Unique identifier for the canvas that agents use to reference it'
    ),
  description: z
    .string()
    .max(1000)
    .describe(
      'Clear explanation of the canvas purpose and intended use for agents'
    ),
  maxLength: z
    .number()
    .min(100)
    .max(5000)
    .describe('Maximum character limit for canvas content'),
});

export type LocationConfigCanvas = z.infer<typeof LocationConfigCanvasSchema>;

export const LocationConfigGimmickImageSchema = z.object({
  url: z.union([
    z
      .string()
      .max(2048)
      .regex(/^https?:\/\/.+/)
      .optional()
      .describe(
        'Reference image URL (http/https pointing to png, jpeg, jpg, webp under 3MB). Will be replaced with CDN URL after upload'
      ),
    z.string().max(32).describe('Message image key for API usage'),
  ]),
  name: z
    .string()
    .max(64)
    .optional()
    .describe('Optional name identifying this reference image'),
  description: z
    .string()
    .max(500)
    .describe(
      'Stable Diffusion-style prompt describing the image for AI generation'
    ),
});

export type LocationConfigGimmickImage = z.infer<
  typeof LocationConfigGimmickImageSchema
>;

export const LocationConfigGimmickSchema = z.object({
  core: GimmickCoreSchema.describe(
    'Core gimmick type determining execution behavior'
  ),
  name: z
    .string()
    .max(64)
    .describe('Gimmick display name for identification purposes'),
  appearance: z
    .string()
    .max(500)
    .describe(
      'Base appearance prompt for character_image_generator. For other gimmicks, describes how the gimmick appears in the location'
    ),
  images: z
    .array(LocationConfigGimmickImageSchema)
    .max(6)
    .optional()
    .describe(
      'Reference images for image generation gimmicks. For image_generator: uses url and description for reference images. For character_image_generator: uses only name and description (Stable Diffusion prompts) without url. For scene_image_generator: uses url, name, and description for character references in scene composition'
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
        .describe(
          'Location thumbnail URL (http/https URL pointing to png, jpeg, jpg, webp files under 3MB). This will be replaced by the URL of the file uploaded to a CDN, not the original address.'
        ),
      z.string().max(32).describe('Location message image key for API usage'),
    ])
    .nullable()
    .describe(
      'Location thumbnail image. Supports HTTP/HTTPS URLs for png, jpeg, jpg, webp images and location message image keys for API usage. When provided, images will be replaced by CDN URLs when processed.'
    ),

  environment: LocationEnvironmentSchema.describe(
    'Location environment that determines the context and behavior'
  ),

  core: LocationConfigCoreSchema.describe(
    'Core behavior configuration that determines how agents are executed in this location. Use default values unless specifically needed.'
  ),
  description: z
    .string()
    .max(1000)
    .describe(
      'Description of the location that provides context to agents about where they are'
    ),

  rules: z
    .array(z.string().max(200))
    .max(20)
    .describe(
      'Critical location-specific constraints that all agents in this location must strictly enforce. These are mandatory restrictions that override agent preferences and cannot be violated under any circumstances.'
    ),

  canvases: z
    .array(LocationConfigCanvasSchema)
    .max(4)
    .describe(
      'Shared canvases that all entities in the location can access and collaborate on'
    ),
  agentCanvases: z
    .array(LocationConfigCanvasSchema)
    .max(4)
    .describe(
      'Private agent canvases for individual agent use, separate per location context'
    ),

  gimmicks: z
    .array(LocationConfigGimmickSchema)
    .max(4)
    .describe(
      'Interactive tools that agents can execute to perform specific tasks (e.g., web search, social media).'
    ),
});

export type LocationConfig = z.infer<typeof LocationConfigSchema>;
