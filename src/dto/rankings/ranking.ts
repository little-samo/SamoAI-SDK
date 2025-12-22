import { AgentId, LocationId, UserId } from '@little-samo/samo-ai';

export interface RankingEntity {
  locationId?: LocationId;
  locationPresetId?: bigint;
  agentId?: AgentId;
  userId?: UserId;
}

export interface RankingReward {
  rankUpTo: number;
  credits: number;
}

export interface RankingDto {
  type: number;
  date: Date | null;
  rank: number;
  entity: RankingEntity;
  score: number;
  rewards: RankingReward[] | null;
}
