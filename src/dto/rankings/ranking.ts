import { AgentId, LocationId, UserId } from '@little-samo/samo-ai';

export interface RankingEntity {
  locationId?: LocationId;
  locationPresetId?: bigint;
  agentId?: AgentId;
  userId?: UserId;
}

export interface RankingDto {
  type: number;
  date: Date;
  rank: number;
  entity: RankingEntity;
  score: number;
}
