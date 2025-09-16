import { UserId } from '@little-samo/samo-ai';

import { GimmickPublicDto } from '../entities';

export interface LocationPresetDto {
  id: bigint;
  name: string;
  presetDescription: string;

  thumbnail: string | null;
  ownerUserId: UserId | null;
  gimmicks: GimmickPublicDto[];

  isPublished: boolean;
  publishedAt: Date | null;
  hashtags: string[];

  isPublic: boolean;
  isSensitive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
