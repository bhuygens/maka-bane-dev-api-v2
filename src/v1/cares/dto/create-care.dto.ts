import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

// DTO used before upload tempImages
export default class CreateCareDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  benefit: string;

  @IsNumber()
  duration: number;

  @IsArray()
  @IsOptional()
  imagesUrl: string[];

  @IsArray()
  tags: string[];

  @IsNumber()
  @IsOptional()
  vatAmount: number;

  @IsNumber()
  vatPrice: number;

  @IsString()
  durationText: string;

  @IsArray()
  @IsOptional()
  tempImages: string[];
}
