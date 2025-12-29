import { z } from 'zod';

export const ImageStyleSchema = z.enum([
  'realistic',
  'webtoon',
  'webtoon2',
  'illustration',
  'anime',
]);

export type ImageStyle = z.infer<typeof ImageStyleSchema>;
