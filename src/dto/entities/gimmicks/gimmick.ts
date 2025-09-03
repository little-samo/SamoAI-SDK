import { GimmickId } from '@little-samo/samo-ai/models';

import type { GimmickCore } from './gimmick.config';

export interface GimmickPublicDto {
  id: GimmickId;
  name: string;
  core: GimmickCore;
  appearance: string;
}

export interface GimmickCostDto {
  core: GimmickCore;
  executionCost: number;
  canvasMaxLength: number;
}
