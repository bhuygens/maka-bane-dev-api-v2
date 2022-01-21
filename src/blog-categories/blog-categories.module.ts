import { Module } from '@nestjs/common';
import { BlogCategoriesService } from './blog-categories.service';

@Module({
  providers: [BlogCategoriesService]
})
export class BlogCategoriesModule {}
