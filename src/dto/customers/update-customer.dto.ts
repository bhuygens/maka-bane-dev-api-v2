import { IsNumber, IsString } from 'class-validator';

export default class UpdateCustomerDto {
  @IsNumber()
  id: number;

  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsString()
  phone: string;

  @IsString()
  deliveryAddress: string;

  @IsString()
  deliveryCity: string;

  @IsString()
  deliveryZipcode: string;

  @IsString()
  deliveryCountry: string;

  @IsString()
  billingAddress: string;

  @IsString()
  billingCity: string;

  @IsString()
  billingZipcode: string;

  @IsString()
  billingCountry: string;

  @IsString()
  email: string;
}
