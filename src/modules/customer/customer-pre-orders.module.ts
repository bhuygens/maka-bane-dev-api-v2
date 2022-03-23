import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from '../../entities/customer/customers.entity';
import { StripeService } from '../../services/_common/stripe/stripe.service';
import { CustomerPreOrders } from '../../entities/customer/customer-pre-orders.entity';
import { CustomerPreOrdersController } from '../../controllers/customer/customer-pre-orders.controller';
import { CustomerPreOrdersService } from '../../services/customer/customer-pre-orders.service';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerPreOrders, Customers, CustomerOrders]),
  ],
  controllers: [CustomerPreOrdersController],
  providers: [CustomerPreOrdersService, StripeService],
})
export class CustomerPreOrdersModule {}
