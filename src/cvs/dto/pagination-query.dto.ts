import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;
}
