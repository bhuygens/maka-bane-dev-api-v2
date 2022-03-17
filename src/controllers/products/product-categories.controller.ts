import { Controller, Get, Param } from '@nestjs/common';
import { ProductCategories } from '../../entities/products/product-categories.entity';
import { ProductCategoriesService } from '../../services/products/product-categories.service';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Get(':id')
  async getProductByCategoryId(@Param('id') id: number): Promise<ProductCategories[]> {
    return await this.productCategoriesService.getProductByCategoryId(id);
  }
}
