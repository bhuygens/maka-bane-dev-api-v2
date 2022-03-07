import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import CreateBlogCategoryDto from './dto/create-blog-category.dto';
import { BlogCategoriesService } from './blog-categories.service';

@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(private readonly blogCategoryService: BlogCategoriesService) {}

  @Post()
  async createCategory(@Body() blogCategory: CreateBlogCategoryDto) {
    return this.blogCategoryService.create(blogCategory);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.blogCategoryService.delete(+id);
  }

  @Get()
  async getArticlesByCategoryId(@Query('category') category: string) {
    return this.blogCategoryService.getArticlesByCategoryId(+category);
  }
}
