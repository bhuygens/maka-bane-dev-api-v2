import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';

export default class CreateCarouselDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  image_url: string[];

  @IsString()
  article_url: string;

  @IsBoolean()
  isOnline: boolean;

  @IsDate()
  publication_date: Date;
}
