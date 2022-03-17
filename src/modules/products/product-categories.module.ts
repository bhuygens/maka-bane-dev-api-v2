import { Module } from '@nestjs/common';
import { ProductCategoriesService } from '../../services/products/product-categories.service';
import { ProductCategoriesController } from '../../controllers/products/product-categories.controller';

@Module({
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
})
export class ProductCategoriesModule {}
