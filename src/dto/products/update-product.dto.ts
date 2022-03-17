import { IsNumber } from 'class-validator';
import CreateProductDto from './create-product.dto';

export default class UpdateProductDto extends CreateProductDto {
  @IsNumber()
  id: number;
}
