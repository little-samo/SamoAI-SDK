import { z } from 'zod';

export const GimmickCoreDescriptions = {
  web_search:
    'Searches the web for real-time or missing information using an LLM. Returns both summary and detailed results. Takes ~30 seconds to execute',
  image_generator:
    'Generates images from text prompts with optional reference images. Can modify existing images in context using text instructions. Takes ~30 seconds to execute',
  character_image_generator:
    'Generates consistent character images using the gimmick\'s appearance as a base prompt to maintain character identity. Style defaults to "anime style" but can be customized (e.g., "realistic" for photorealistic). Optionally combines one image description from the images array with the base prompt',
  scene_image_generator:
    'Generates scene images with one or more characters using reference images and appearance prompts. Each image in the images array includes a reference image and its Stable Diffusion-style appearance prompt for scene composition',
  notion: 'Interacts with Notion for content management and collaboration',
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
