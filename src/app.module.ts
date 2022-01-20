import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormationsModule } from './formations/formations.module';
import { FormationsService } from './formations/formations.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { FormationsEntity } from './formations/formations.entity';
import { Connection } from 'typeorm';
import { FormationsAvailabilitiesService } from './formations-availabilities/formations-availabilities.service';
import { FormationsAvailabilitiesModule } from './formations-availabilities/formations-availabilities.module';
import { FormationsSubscribersController } from './formations-subscribers/formations-subscribers.controller';
import { FormationsSubscribersModule } from './formations-subscribers/formations-subscribers.module';
import { PlacesService } from './places/places.service';
import { PlacesController } from './places/places.controller';
import { PlacesModule } from './places/places.module';
import { CustomersModule } from './customers/customers.module';
import { CustomerOrdersService } from './customer-orders/customer-orders.service';
import { CustomerOrdersModule } from './customer-orders/customer-orders.module';
import { CustomerPreOrdersController } from './customer-pre-orders/customer-pre-orders.controller';
import { CustomerPreOrdersService } from './customer-pre-orders/customer-pre-orders.service';
import { CustomerPreOrdersModule } from './customer-pre-orders/customer-pre-orders.module';
import { DiscountCodesModule } from './discount-codes/discount-codes.module';
import { NewsletterController } from './newsletter/newsletter.controller';
import { NewsletterService } from './newsletter/newsletter.service';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bwozsqvguehemtybe0hq-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uvqeqmhixjljedzf',
      password: 'Q2Cwt7v9Bfaed3QUAUpT',
      database: 'bwozsqvguehemtybe0hq',
      entities: [FormationsEntity],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    FormationsModule,
    FormationsAvailabilitiesModule,
    FormationsSubscribersModule,
    PlacesModule,
    CustomersModule,
    CustomerOrdersModule,
    CustomerPreOrdersModule,
    DiscountCodesModule,
    NewsletterModule,
    ProductsModule,
  ],
  providers: [FormationsAvailabilitiesService, PlacesService, CustomerOrdersService, CustomerPreOrdersService, NewsletterService],
  controllers: [FormationsSubscribersController, PlacesController, CustomerPreOrdersController, NewsletterController],
})
export class AppModule {}
