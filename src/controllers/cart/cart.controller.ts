import { Body, Controller, Post } from '@nestjs/common';
import CartItemsDto from '../../dto/cart/cart-items.dto';
import { CartService } from '../../services/cart/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/getItemsData')
  getCartItems(@Body() cartItems: CartItemsDto[]) {
    return this.cartService.getItemsData(cartItems);
  }
}
