import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../../entities/products/products.entity';
import { MoreThan, Repository } from 'typeorm';
import CreateProductDto from '../../dto/products/create-product.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { ProductCategories } from '../../entities/products/product-categories.entity';
import UpdateProductDto from '../../dto/products/update-product.dto';
import { CategoryPaginationDto } from '../../dto/products/category-pagination.dto';

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

  async getProductById(
    id: number,
  ): Promise<{ product: Products; declinedProducts: Products[] } | void> {
    const product = await this.productsRepository.findOne(id);
    const declinedProducts = await this.productsRepository.find({
      where: { isDeclinationProduct: true, mainProductId: id },
    });
    if (!product) {
      ErrorManager.customException(`Product ${id} not found`, 404);
    } else {
      return {
        product,
        declinedProducts,
      };
    }
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<Products> {
    const product = await this.productsRepository.preload({
      id: +updateProductDto.id,
      ...updateProductDto,
    });

    if (!product) {
      ErrorManager.notFoundException(`product ${product.id} not found`);
    }
    return this.productsRepository.save(product);
  }

  async getProductByCategoryId(
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<{ products: Products[]; length: number }> {
    try {
      const category = await this.productsCategoriesRepository.findOne({
        id: categoryPaginationDto.categoryId,
      });
      const products = await this.productsRepository.find({
        select: [
          'id',
          'name',
          'categoryId',
          'buyingPrice',
          'retailPrice',
          'vatClass',
          'shortResume',
          'benefit',
          'tags',
          'imagesUrl',
        ],
        where: {
          category,
          currentStock: MoreThan(0),
          isDeclinationProduct: false,
        },
        skip: categoryPaginationDto.offset,
        take: categoryPaginationDto.limit,
        order: {
          name: 'ASC',
        },
      });

      const productLength = await this.productsRepository.find({
        select: ['id'],
        where: {
          category,
          currentStock: MoreThan(0),
          isDeclinationProduct: false,
        },
      });
      return {
        products,
        length: productLength.length,
      };
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async getBestProducts(): Promise<Products[]> {
    try {
      return await this.productsRepository
        .createQueryBuilder('products')
        .where('products.isBestProduct = :name', { name: 'true' })
        .leftJoinAndSelect('products.category', 'categories')
        .getMany();
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async getProductCategories(): Promise<ProductCategories[]> {
    try {
      const categories = await this.productsCategoriesRepository.find({
        select: ['id', 'name'],
        order: { name: 'ASC' },
      });
      return categories.filter((category) => category.products.length > 0);
    } catch (e) {
      ErrorManager.customException(`categories unavailable`);
    }
  }

  async canLoadProduct(id: number) {
    const product = await this.productsRepository.findOne({ id });
    if (!product) {
      ErrorManager.notFoundException(`Product #${product.id} not found !`);
    } else {
      if (product.isDeclinationProduct) {
        return {
          mainProductId: product.mainProductId,
          hasDeclinedProduct: true,
        };
      } else {
        return {
          mainProductId: product.id,
          hasDeclinedProduct: false,
        };
      }
    }
  }

  async countProducts(): Promise<number> {
    return (await this.productsRepository.find()).length;
  }
}
