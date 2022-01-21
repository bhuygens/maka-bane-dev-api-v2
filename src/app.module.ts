import { Module } from '@nestjs/common';
import { FormationsModule } from './formations/formations.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { CaresAvailabilitiesService } from './cares-availabilities/cares-availabilities.service';
import { CaresAvailabilitiesController } from './cares-availabilities/cares-availabilities.controller';
import { CaresAvailabilitiesModule } from './cares-availabilities/cares-availabilities.module';
import { CaresModule } from './cares/cares.module';
import { ProductStockController } from './product-stock/product-stock.controller';
import { ProductStockService } from './product-stock/product-stock.service';
import { ProductStockModule } from './product-stock/product-stock.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsModule } from './reviews/reviews.module';
import { BlogArticlesModule } from './blog-articles/blog-articles.module';
import { BlogCategoriesController } from './blog-categories/blog-categories.controller';
import { BlogCategoriesModule } from './blog-categories/blog-categories.module';
import { CarouselService } from './carousel/carousel.service';
import { CarouselModule } from './carousel/carousel.module';
import { CustomerOrdersAbortController } from './customer-orders-abort/customer-orders-abort.controller';
import { CustomerOrdersAbortModule } from './customer-orders-abort/customer-orders-abort.module';
import { CaresCategoriesService } from './cares-categories/cares-categories.service';
import { CaresCategoriesController } from './cares-categories/cares-categories.controller';
import { CaresCategoriesModule } from './cares-categories/cares-categories.module';
import { FormationsCategoriesModule } from './formations-categories/formations-categories.module';
import { FormationsAvailabilitiesController } from './formations-availabilities/formations-availabilities.controller';
import { BlogArticles } from './blog-articles/blog-articles.entity';
import { BlogCategories } from './blog-categories/blog-categories.entity';
import { Cares } from './cares/cares.entity';
import { CaresAvailabilities } from './cares-availabilities/cares-availabilities.entity';
import { CaresCategories } from './cares-categories/cares-categories.entity';
import { Carousel } from './carousel/carousel.entity';
import { CustomerOrders } from './customer-orders/customer-orders.entity';
import { CustomerOrdersAbort } from './customer-orders-abort/customer-orders-abort.entity';
import { CustomerPreOrders } from './customer-pre-orders/customer-pre-orders.entity';
import { Customers } from './customers/customers.entity';
import { DiscountCodes } from './discount-codes/discount-codes.entity';
import { Formations } from './formations/formations.entity';
import { FormationsAvailabilities } from './formations-availabilities/formations-availabilities.entity';
import { FormationsCategories } from './formations-categories/formations-categories.entity';
import { FormationsSubscribers } from './formations-subscribers/formations-subscribers.entity';
import { Newsletter } from './newsletter/newsletter.entity';
import { Places } from './places/places.entity';
import { ProductCategories } from './product-categories/product-categories.entity';
import { ProductStock } from './product-stock/product-stock.entity';
import { Products } from './products/products.entity';
import { Reviews } from './reviews/reviews.entity';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(process.env.NODE_ENV), {}),
    }),
    TypeOrmModule.forFeature([
      BlogArticles,
      BlogCategories,
      Cares,
      CaresAvailabilities,
      CaresCategories,
      Carousel,
      CustomerOrders,
      CustomerOrdersAbort,
      CustomerPreOrders,
      Customers,
      DiscountCodes,
      Formations,
      FormationsAvailabilities,
      FormationsCategories,
      FormationsSubscribers,
      Newsletter,
      Places,
      ProductCategories,
      ProductStock,
      Products,
      Reviews,
    ]),
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
    CaresAvailabilitiesModule,
    CaresModule,
    ProductStockModule,
    ProductCategoriesModule,
    ReviewsModule,
    BlogArticlesModule,
    BlogCategoriesModule,
    CarouselModule,
    CustomerOrdersAbortModule,
    CaresCategoriesModule,
    FormationsCategoriesModule,
  ],
  providers: [
    FormationsAvailabilitiesService,
    PlacesService,
    CustomerOrdersService,
    CustomerPreOrdersService,
    NewsletterService,
    CaresAvailabilitiesService,
    ProductStockService,
    ReviewsService,
    CarouselService,
    CaresCategoriesService,
  ],
  controllers: [
    FormationsAvailabilitiesController,
    FormationsSubscribersController,
    PlacesController,
    CustomerPreOrdersController,
    NewsletterController,
    CaresAvailabilitiesController,
    ProductStockController,
    ReviewsController,
    BlogCategoriesController,
    CustomerOrdersAbortController,
    CaresCategoriesController,
  ],
})
export class AppModule {}
