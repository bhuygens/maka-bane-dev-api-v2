import { Module } from '@nestjs/common';
import { CustomerOrdersAbortService } from './customer-orders-abort.service';

@Module({
  providers: [CustomerOrdersAbortService],
})
export class CustomerOrdersAbortModule {}
