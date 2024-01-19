import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import CreateProductDto from '../../dto/products/create-product.dto';
import { ProductsService } from '../../services/products/products.service';
import { Products } from '../../entities/products/products.entity';
import UpdateProductDto from '../../dto/products/update-product.dto';
import { ProductCategories } from '../../entities/products/product-categories.entity';
import { CategoryPaginationDto } from '../../dto/products/category-pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.createProduct(createProductDto);
  }

  @Get('/category')
  async getProductByCategoryId(
    @Query() categoryPaginationDto: CategoryPaginationDto,
  ): Promise<{ products: Products[]; length: number }> {
    return await this.productsService.getProductByCategoryId(
      categoryPaginationDto,
    );
  }

  @Get('/best')
  async getBestProducts() {
    return await this.productsService.getBestProducts();
  }

  @Get('/categories')
  async getProductCategories(): Promise<ProductCategories[]> {
    return await this.productsService.getProductCategories();
  }

  @Patch()
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    return await this.productsService.updateProduct(updateProductDto);
  }

  @Get('/canLoad/:id')
  async canLoadProduct(
    @Param('id') id: number,
  ): Promise<{ hasDeclinedProduct: boolean; mainProductId: number }> {
    return this.productsService.canLoadProduct(id);
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: number,
  ): Promise<{ product: Products; declinedProducts: Products[] } | void> {
    return await this.productsService.getProductById(id);
  }
}
