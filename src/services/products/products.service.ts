import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../../entities/products/products.entity';
import { Repository } from 'typeorm';
import CreateProductDto from '../../dto/products/create-product.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { ProductCategories } from '../../entities/products/product-categories.entity';
import UpdateProductDto from '../../dto/products/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(ProductCategories)
    private readonly productsCategoriesRepository: Repository<ProductCategories>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Products> {
    try {
      // Check if product name isn't already used
      const isProductExist = await this.productsRepository.findOne({
        name: createProductDto.name,
      });

      const isCategoryExist = await this.productsCategoriesRepository.findOne(
        createProductDto.categoryId,
      );

      if (!isProductExist && isCategoryExist) {
        const product = this.productsRepository.create(createProductDto);
        return await this.productsRepository.save(product);
      } else {
        ErrorManager.customException(`Impossible to add care`);
      }
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async getProductById(id: number): Promise<Products | void> {
    const product = await this.productsRepository.findOne(id);
    if (!product) {
      ErrorManager.customException(`Product ${id} not found`, 404);
    } else {
      return product;
    }
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.preload({
      id: +updateProductDto.id,
      ...updateProductDto,
    });

    if (!product) {
      ErrorManager.notFoundException(`product ${product.id} not found`);
    }
    return this.productsRepository.save(product);
  }

  async getProductByCategoryId(id: number): Promise<Products[]> {
    const category = await this.productsCategoriesRepository.findOne(id);
    return await this.productsRepository.find({ category });
  }
}
