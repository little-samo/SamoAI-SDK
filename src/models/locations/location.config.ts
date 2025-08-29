import { z } from 'zod';

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
    .max(5000)
    .describe(
      'Clear explanation of the canvas purpose and intended use for agents'
    ),
  maxLength: z
    .number()
    .min(100)
    .max(5000)
    .describe('Maximum character limit for canvas content'),
});

export const GimmickCoreDescriptions = {
  web_search:
    'Searches the web for up-to-date or missing information using an LLM, providing both a summary and detailed results. Execution takes approximately 30 seconds',
  image_generator:
    'Generates a image using an LLM. Execution takes approximately 30 seconds',
  notion:
    'Interacts with Notion platform for content management and collaboration',
} as const;

export type GimmickCore = keyof typeof GimmickCoreDescriptions;

export const GimmickCoreSchema = z.union(
  Object.keys(GimmickCoreDescriptions).map((key) =>
    z.literal(key).describe(GimmickCoreDescriptions[key as GimmickCore])
  ) as [
    z.ZodLiteral<GimmickCore>,
    z.ZodLiteral<GimmickCore>,
    ...z.ZodLiteral<GimmickCore>[],
  ]
);

export const LocationConfigGimmickSchema = z.object({
  core: GimmickCoreSchema.describe(
    'Core gimmick behavior that determines how the gimmick is executed'
  ),
  name: z
    .string()
    .max(64)
    .describe('Name of the gimmick that agents can reference'),
  appearance: z
    .string()
    .max(500)
    .describe(
      'How the gimmick appears to agents and users in the location context'
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
        .regex(/^https?:\/\/.+\.(png|jpe?g)$/i)
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
    .max(500)
    .describe(
      'Description of the location that provides context to agents about where they are'
    ),

  rules: z
    .array(z.string().max(200))
    .max(20)
    .describe(
      'Location-specific rules that agents must follow in addition to their core rules'
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
