import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../../entities/products/products.entity';
import { Repository } from 'typeorm';
import CartItemsDto from '../../dto/cart/cart-items.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async getItemsData(cartItems: CartItemsDto[]) {
    try {
      const items: Products[] = [];
      for (const item of cartItems) {
        const product = await this.productsRepository.findOne({
          select: [
            'id',
            'name',
            'categoryId',
            'imagesUrl',
            'retailPrice',
            'currentStock',
          ],
          where: { id: item.id },
        });
        // insert customer quantity in product object
        const updatedProduct = { ...product, quantity: item.quantity };
        product
          ? items.push(updatedProduct)
          : ErrorManager.notFoundException(`Product #${item.id} not found !`);
      }
      return items;
    } catch (e) {
      ErrorManager.customException(`Error during fetching products: ${e}`);
    }
  }
}
