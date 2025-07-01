import { AgentPublicDto, UserPublicDto } from '../entities';

export interface ItemRankingDto {
  rank: number;
  ownerAgent?: AgentPublicDto;
  ownerUser?: UserPublicDto;
  count: number;
}
