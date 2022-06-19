import { Module } from '@nestjs/common';
import { CustomersController } from '../../controllers/customer/customers.controller';
import { CustomersService } from '../../services/customer/customers.service';
import { StripeServiceHelper } from '../../services/_common/stripe/stripe-service-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from '../../entities/customer/customers.entity';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';
import { Newsletter } from '../../entities/newsletter/newsletter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customers,
      FormationsSubscribers,
      CustomerOrders,
      Newsletter,
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, StripeServiceHelper],
})
export class CustomersModule {}


/*
  imports: [TypeOrmModule.forFeature([CustomerOrders])],
  providers: [CustomerOrdersService],
  controllers: [CustomerOrdersController],
  exports: [CustomerOrdersModule],
 */
