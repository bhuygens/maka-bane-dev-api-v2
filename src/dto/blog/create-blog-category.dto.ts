import { IsString } from 'class-validator';

export default class CreateBlogCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
