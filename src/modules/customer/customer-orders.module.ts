import { Module } from '@nestjs/common';
import { CustomerOrdersController } from '../../controllers/customer/customer-orders.controller';

@Module({
  controllers: [CustomerOrdersController],
})
export class CustomerOrdersModule {}
