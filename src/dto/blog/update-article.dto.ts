import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateArticleDto {
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsBoolean()
  readonly isBestArticle: boolean;

  @IsOptional()
  @IsArray()
  imagesUrl: string[];

  @IsOptional()
  @IsArray()
  readonly tags: [];

  @IsOptional()
  @IsString()
  readonly contentHeader: string;

  @IsArray()
  updatedImages: string[];
}
