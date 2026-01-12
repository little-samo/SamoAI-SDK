import { z } from 'zod';

export const ImageStyleSchema = z.enum([
  'realistic',
  'webtoon',
  'webtoon2',
  'illustration',
  'anime',
  'korean',
]);

export type ImageStyle = z.infer<typeof ImageStyleSchema>;
