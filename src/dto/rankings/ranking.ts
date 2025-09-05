import { AgentId, LocationId, UserId } from '@little-samo/samo-ai';

export interface RankingDto {
  type: number;
  date: Date;
  rank: number;
  locationId?: LocationId;
  agentId?: AgentId;
  userId?: UserId;
  score: number;
}
