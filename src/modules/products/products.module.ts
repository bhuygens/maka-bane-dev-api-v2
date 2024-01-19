import { Module } from '@nestjs/common';
import { ProductsController } from '../../controllers/products/products.controller';
import { ProductsService } from '../../services/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../../entities/products/products.entity';
import { ProductCategories } from '../../entities/products/product-categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductCategories])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
