import { GimmickId } from '@little-samo/samo-ai/models';

import type { GimmickCore } from '@little-samo/samo-ai-sdk/models';

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
