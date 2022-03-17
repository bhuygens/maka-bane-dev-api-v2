import { Module } from '@nestjs/common';
import { BlogCategoriesService } from '../../services/blog/blog-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory } from '../../entities/blog/blog-category.entity';
import { BlogArticle } from '../../entities/blog/blog-articles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategory, BlogArticle])],
  providers: [BlogCategoriesService],
  exports: [BlogCategoriesModule],
})
export class BlogCategoriesModule {}
