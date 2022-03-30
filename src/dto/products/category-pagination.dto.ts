import { PaginationQueryDto } from '../_common/pagination-query.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class CategoryPaginationDto extends PaginationQueryDto {
  @IsNumber()
  @IsPositive()
  categoryId: number;
}
