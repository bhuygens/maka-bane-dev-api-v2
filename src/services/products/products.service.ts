import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../../entities/products/products.entity';
import { Repository } from 'typeorm';
import CreateProductDto from '../../dto/products/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Products> {
    const isExist = await this.productsRepository.findOne({
      name: createProductDto.name,
    });

    if (!isExist) {
      const product = this.productsRepository.create(createProductDto);
      return await this.productsRepository.save(product);
    }
  }
}
