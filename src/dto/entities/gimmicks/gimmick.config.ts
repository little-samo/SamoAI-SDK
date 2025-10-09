import { z } from 'zod';

export const GimmickCoreDescriptions = {
  web_search:
    'Searches the web for up-to-date or missing information using an LLM, providing both a summary and detailed results. Execution takes approximately 30 seconds',
  image_generator:
    'Generates an image using an LLM based on text prompts and optional reference images. Can also modify or edit existing images within the current context based on text instructions. Execution takes approximately 30 seconds',
  character_image_generator:
    'Generates consistent character images by using the gimmick\'s appearance configuration as a common prompt, which helps maintain character identity and physical traits. The style, defaulting to "anime style", can be customized in the appearance settings with comma-separated values. Supported values include "realistic" for a photorealistic style. Can optionally select one description from the images array to combine with the common prompt for enhanced image generation.',
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
