import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateProductDto from '../../dto/products/create-product.dto';
import { ProductsService } from '../../services/products/products.service';
import { Products } from '../../entities/products/products.entity';

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
}
