import { Module } from '@nestjs/common';
import { CustomerOrdersAbortService } from '../../services/customer/customer-orders-abort.service';

@Module({
  providers: [CustomerOrdersAbortService],
})
export class CustomerOrdersAbortModule {}
