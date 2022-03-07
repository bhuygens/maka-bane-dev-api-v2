import { Module } from '@nestjs/common';
import { BlogArticlesService } from './blog-articles.service';
import { BlogArticlesController } from './blog-articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory } from '../blog-categories/blog-category.entity';
import { BlogArticle } from './blog-articles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogArticle, BlogCategory])],
  providers: [BlogArticlesService],
  controllers: [BlogArticlesController],
})
export class BlogArticlesModule {}
