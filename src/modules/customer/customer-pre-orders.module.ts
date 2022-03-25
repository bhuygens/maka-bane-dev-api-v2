import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from '../../entities/customer/customers.entity';
import { StripeServiceHelper } from '../../services/_common/stripe/stripe-service-helper.service';
import { CustomerPreOrders } from '../../entities/customer/customer-pre-orders.entity';
import { CustomerPreOrdersController } from '../../controllers/customer/customer-pre-orders.controller';
import { CustomerPreOrdersService } from '../../services/customer/customer-pre-orders.service';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';
import { CustomersService } from '../../services/customer/customers.service';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { Newsletter } from '../../entities/newsletter/newsletter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerPreOrders,
      Customers,
      CustomerOrders,
      FormationsSubscribers,
      Newsletter,
    ]),
  ],
  controllers: [CustomerPreOrdersController],
  providers: [
    CustomerPreOrdersService,
    StripeServiceHelper,
    CustomersService,
  ],
})
export class CustomerPreOrdersModule {}
