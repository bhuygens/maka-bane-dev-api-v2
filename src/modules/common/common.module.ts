import { Module } from '@nestjs/common';
import { CommonController } from '../../controllers/common/common.controller';
import { CommonService } from '../../services/_common/common.service';
import { FormationsService } from '../../services/formations/formations.service';
import { FormationsModule } from '../formations/formations.module';
import { FormationsSubscribersModule } from '../formations/formations-subscribers.module';
import { FormationsSubscribersService } from '../../services/formations/formations-subscribers.service';
import { CustomerOrdersModule } from '../customer/customer-orders.module';
import { CustomerOrdersService } from '../../services/customer/customer-orders.service';
import { ProductsService } from '../../services/products/products.service';
import { CustomersService } from '../../services/customer/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';
import { Products } from '../../entities/products/products.entity';
import { ProductCategoriesService } from '../../services/products/product-categories.service';
import { ProductCategories } from '../../entities/products/product-categories.entity';
import { StripeServiceHelper } from '../../services/_common/stripe/stripe-service-helper.service';
import { Customers } from '../../entities/customer/customers.entity';
import { Newsletter } from '../../entities/newsletter/newsletter.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    FormationsModule,
    FormationsSubscribersModule,
    CustomerOrdersModule,
    ProductsModule,
    TypeOrmModule.forFeature([
      CustomerOrders,
      Products,
      ProductCategories,
      Customers,
      Newsletter,
    ]),
  ],
  providers: [
    CommonService,
    FormationsService,
    FormationsSubscribersService,
    CustomerOrdersService,
    ProductsService,
    CustomersService,
    StripeServiceHelper,
  ],
  controllers: [CommonController],
})
export class CommonModule {}
