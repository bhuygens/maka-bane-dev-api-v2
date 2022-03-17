import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import CreateProductDto from '../../dto/products/create-product.dto';
import { ProductsService } from '../../services/products/products.service';
import { Products } from '../../entities/products/products.entity';
import UpdateProductDto from '../../dto/products/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.createProduct(createProductDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Products | void> {
    return await this.productsService.getProductById(id);
  }

  @Get('/category/:id')
  async getProductByCategoryId(@Param('id') id: number) {
    return await this.productsService.getProductByCategoryId(id);
  }

  @Patch()
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.updateProduct(updateProductDto);
  }
}
