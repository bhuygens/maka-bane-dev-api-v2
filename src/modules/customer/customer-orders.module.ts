import { Module } from '@nestjs/common';
import { CustomerOrdersController } from '../../controllers/customer/customer-orders.controller';
import { CustomerOrdersService } from '../../services/customer/customer-orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrders])],
  providers: [CustomerOrdersService],
  controllers: [CustomerOrdersController],
})
export class CustomerOrdersModule {
}
