import { EntityId } from '@little-samo/samo-ai';

export interface EntityDto {
  id: EntityId;
  handle?: string;
  name: string;
  appearance: string;
  expression?: string;
}
