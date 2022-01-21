import { Module } from '@nestjs/common';
import { BlogArticlesService } from './blog-articles.service';
import { BlogArticlesController } from './blog-articles.controller';

@Module({
  providers: [BlogArticlesService],
  controllers: [BlogArticlesController]
})
export class BlogArticlesModule {}
