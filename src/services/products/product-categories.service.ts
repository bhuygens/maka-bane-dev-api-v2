import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategories } from '../../entities/products/product-categories.entity';
import { Repository } from 'typeorm';
import { Products } from '../../entities/products/products.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategories)
    private readonly productCategoriesRepository: Repository<ProductCategories>,
  ) {}

}
