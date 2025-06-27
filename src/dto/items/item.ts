export interface ItemDto {
  id: number;
  itemDataId: number;
  name: string;
  description?: string;
  count: number;
  updatedAt: Date;
}

export interface ItemUpdateDto {
  count: number;
  updatedAt: Date;
}
