import { z } from 'zod';

import { LocationEnvironment } from './location.constants';

export const LocationEnvironmentSchema = z.union([
  z
    .literal(LocationEnvironment.CHAT)
    .describe(
      'Standard conversational environment for general agent interactions'
    ),
  z
    .literal(LocationEnvironment.WEB_BROWSER)
    .describe(
      'Web browser environment that provides web browser content to agents'
    ),
]);

export const LocationConfigCoreSchema = z.object({
  name: z.union([
    z.literal('round_robin').describe('Execute agents in rotating order'),
    z
      .literal('update_forever')
      .describe('Continuously update agents without stopping'),
    z.literal('update_once').describe('Execute agents only once per cycle'),
  ]),
  sequential: z.boolean().optional().describe('Execute agents in fixed order'),
});

export type LocationConfigCore = z.infer<typeof LocationConfigCoreSchema>;

export const LocationConfigCanvasSchema = z.object({
  name: z
    .string()
    .max(16)
    .regex(/^[a-zA-Z_]+$/, 'Name must contain only letters and underscores')
    .describe(
      'Unique identifier for the canvas that agents use to reference it'
    ),
  description: z
    .string()
    .max(500)
    .describe(
      'Clear explanation of the canvas purpose and intended use for agents'
    ),
  maxLength: z
    .number()
    .min(100)
    .max(1000)
    .describe('Maximum character limit for canvas content'),
});

export const LocationConfigGimmickSchema = z.object({
  core: z.union([
    z
      .literal('web_search')
      .describe(
        'Searches the web for up-to-date or missing information using an LLM, providing both a summary and detailed results. Execution takes approximately 30 seconds'
      ),
    z
      .literal('x_twitter')
      .describe(
        'Interacts with X (Twitter) platform for social media operations and content management'
      ),
  ]),
  name: z
    .string()
    .max(64)
    .describe('Name of the gimmick that agents can reference'),
  description: z
    .string()
    .max(500)
    .describe(
      'Clear description of what the gimmick does, its purpose, and expected execution time for agents to understand'
    ),
  appearance: z
    .string()
    .max(500)
    .describe(
      'How the gimmick appears to agents and users in the location context'
    ),
});

export const LocationConfigSchema = z.object({
  name: z.string().max(64).describe('Location name'),
  thumbnail: z
    .string()
    .max(2048)
    .optional()
    .describe('Location thumbnail URL that can only be modified by the system'),

  environment: LocationEnvironmentSchema.describe(
    'Location environment that determines the context and behavior'
  ),

  core: LocationConfigCoreSchema.describe(
    'Core behavior configuration that determines how agents are executed in this location'
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
