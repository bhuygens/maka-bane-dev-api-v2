import { Module } from '@nestjs/common';
import { CustomersController } from '../../controllers/customer/customers.controller';
import { CustomersService } from '../../services/customer/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
