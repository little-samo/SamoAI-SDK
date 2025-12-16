import { z } from 'zod';

import { RankingDto } from './ranking';

// ================================
// HTTP API DTOs
// ================================

// GET /rankings - Get rankings by type
export const GetRankingsQuerySchema = z.object({
  type: z.coerce.number().int().min(0),
  limit: z.coerce.number().int().min(1).max(100).optional().default(100),
});

export type GetRankingsQueryDto = z.infer<typeof GetRankingsQuerySchema>;

export interface GetRankingsResponseDto {
  rankings: RankingDto[];
  myRanking: RankingDto | null;
}
