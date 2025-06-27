import { Transform } from 'class-transformer';
import { IsOptional, IsArray, IsNumber } from 'class-validator';

export class ItemQueryDto {
  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) => {
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id));
    }
    if (Array.isArray(value)) {
      return value.map((id) => parseInt(id)).filter((id) => !isNaN(id));
    }
    return [];
  })
  @IsArray()
  @IsNumber({}, { each: true })
  public itemDataIds?: number[];
}
