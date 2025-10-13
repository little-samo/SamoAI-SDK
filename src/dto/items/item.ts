export interface ItemDto {
  id: number;
  itemDataId: number;
  name: string;
  description: string | null;
  count: number;
  param1: number;
  param2: number;
  param3: number;
  param4: number;
  updatedAt: Date;
}

export interface ItemUpdateDto {
  count: number;
  param1: number;
  param2: number;
  param3: number;
  param4: number;
  updatedAt: Date;
}
