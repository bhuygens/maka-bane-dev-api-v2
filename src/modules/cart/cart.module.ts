import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../../entities/products/products.entity';
import { CartController } from '../../controllers/cart/cart.controller';
import { CartService } from '../../services/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
