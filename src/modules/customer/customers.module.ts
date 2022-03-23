import { Module } from '@nestjs/common';
import { CustomersController } from '../../controllers/customer/customers.controller';
import { CustomersService } from '../../services/customer/customers.service';
import { StripeService } from '../../services/_common/stripe/stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from '../../entities/customer/customers.entity';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customers,
      FormationsSubscribers,
      CustomerOrders,
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, StripeService],
})
export class CustomersModule {}
