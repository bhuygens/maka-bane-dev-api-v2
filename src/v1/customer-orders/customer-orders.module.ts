import { Module } from '@nestjs/common';
import { CustomerOrdersController } from './customer-orders.controller';

@Module({
  controllers: [CustomerOrdersController],
})
export class CustomerOrdersModule {}
