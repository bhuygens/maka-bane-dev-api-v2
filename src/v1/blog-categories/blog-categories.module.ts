import { Module } from '@nestjs/common';
import { BlogCategoriesService } from './blog-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory } from './blog-category.entity';
import { BlogArticle } from '../blog-articles/blog-articles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategory, BlogArticle])],
  providers: [BlogCategoriesService],
  exports: [BlogCategoriesModule],
})
export class BlogCategoriesModule {}
