import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly categoryId: number;

  @IsString()
  readonly contentHeader: string;

  @IsOptional()
  @IsString()
  readonly imagesUrl: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsArray()
  readonly tags: [];

  @IsBoolean()
  isMainArticle: boolean;
}
