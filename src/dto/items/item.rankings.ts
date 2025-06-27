import { AgentDto, UserDto } from '../entities';

export interface ItemRankingDto {
  rank: number;
  ownerAgent?: AgentDto;
  ownerUser?: UserDto;
  count: number;
}
