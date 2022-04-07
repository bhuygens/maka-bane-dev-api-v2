import { IsNumber, IsPositive } from 'class-validator';

export default class CartItemsDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNumber()
  quantity: number;
}