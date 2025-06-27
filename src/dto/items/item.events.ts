import { ItemDto, ItemUpdateDto } from './item';

export const ItemEventType = {
  Created: 'Created',
  Updated: 'Updated',
} as const;

export type ItemEventType = (typeof ItemEventType)[keyof typeof ItemEventType];

export interface ItemEventDtoBase {
  itemId: number;
  type: ItemEventType;
}

export interface ItemCreatedEventDto extends ItemEventDtoBase {
  type: typeof ItemEventType.Created;
  item: ItemDto;
}

export interface ItemUpdatedEventDto extends ItemEventDtoBase {
  type: typeof ItemEventType.Updated;
  item: ItemUpdateDto;
}

export type ItemEventDto = ItemCreatedEventDto | ItemUpdatedEventDto;
