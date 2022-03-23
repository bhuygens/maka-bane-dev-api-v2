import {
  IsDate,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderInfosModel } from '../../interfaces/orders/order-infos.model';

export default class CustomerPreOrderDto {
  @IsNumber()
  customerId: number;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsString()
  tokenId: string;

  @IsJSON()
  orderData: OrderInfosModel;

  @IsNumber()
  price: number;

  @IsNumber()
  productCount: number;

  @IsString()
  paymentIntentId: string;
}
