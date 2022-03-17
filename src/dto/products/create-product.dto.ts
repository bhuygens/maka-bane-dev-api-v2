import { IsArray, IsNumber, IsString } from 'class-validator';

export default class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  retailPrice: number;

  @IsNumber()
  vatClass: number;

  @IsNumber()
  categoryId: number;

  @IsString()
  shortResume: string;

  @IsString()
  benefit: string;

  @IsNumber()
  buyingPrice: number;

  @IsArray()
  imagesUrl: string[];
}
