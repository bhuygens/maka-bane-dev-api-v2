import { Module } from '@nestjs/common';
import { BlogArticlesService } from '../../services/blog/blog-articles.service';
import { BlogArticlesController } from '../../controllers/blog/blog-articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory } from '../../entities/blog/blog-category.entity';
import { BlogArticle } from '../../entities/blog/blog-articles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogArticle, BlogCategory])],
  providers: [BlogArticlesService],
  controllers: [BlogArticlesController],
})
export class BlogArticlesModule {}
