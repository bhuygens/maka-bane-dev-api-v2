import { Module } from '@nestjs/common';
import { ProductCategoriesService } from '../../services/products/product-categories.service';
import { ProductCategoriesController } from '../../controllers/products/product-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategories } from '../../entities/products/product-categories.entity';
import { Products } from '../../entities/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategories, Products])],
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
})
export class ProductCategoriesModule {}
