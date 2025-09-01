export interface ItemDto {
  id: number;
  itemDataId: number;
  name: string;
  description?: string;
  count: number;
  param1: number;
  param2: number;
  updatedAt: Date;
}

export interface ItemUpdateDto {
  count: number;
  param1: number;
  param2: number;
  updatedAt: Date;
}
