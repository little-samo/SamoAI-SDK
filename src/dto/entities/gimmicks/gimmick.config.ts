import { z } from 'zod';

export const GimmickCoreDescriptions = {
  web_search:
    'Searches the web for up-to-date or missing information using an LLM, providing both a summary and detailed results. Execution takes approximately 30 seconds',
  image_generator:
    'Generates an image using an LLM based on text prompts and optional reference images. Execution takes approximately 30 seconds',
  character_image_generator:
    'Generates consistent anime-style character images using Stable Diffusion with gimmick appearance configuration as base prompt for maintaining character identity and physical traits, combined with additional custom prompts for image generation while preserving visual consistency',
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
