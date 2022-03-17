import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly categoryId: number;

  @IsString()
  readonly contentHeader: string;

  @IsString()
  readonly imagesUrl: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsArray()
  readonly tags: [];
}
