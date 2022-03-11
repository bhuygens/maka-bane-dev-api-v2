import { Module } from '@nestjs/common';
import { FormationsModule } from './v1/formations/formations.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsAvailabilitiesService } from './v1/formations-availabilities/formations-availabilities.service';
import { FormationsAvailabilitiesModule } from './v1/formations-availabilities/formations-availabilities.module';
import { FormationsSubscribersController } from './v1/formations-subscribers/formations-subscribers.controller';
import { FormationsSubscribersModule } from './v1/formations-subscribers/formations-subscribers.module';
import { PlacesService } from './v1/places/places.service';
import { PlacesController } from './v1/places/places.controller';
import { PlacesModule } from './v1/places/places.module';
import { CustomersModule } from './v1/customers/customers.module';
import { CustomerOrdersService } from './v1/customer-orders/customer-orders.service';
import { CustomerOrdersModule } from './v1/customer-orders/customer-orders.module';
import { CustomerPreOrdersController } from './v1/customer-pre-orders/customer-pre-orders.controller';
import { CustomerPreOrdersService } from './v1/customer-pre-orders/customer-pre-orders.service';
import { CustomerPreOrdersModule } from './v1/customer-pre-orders/customer-pre-orders.module';
import { DiscountCodesModule } from './v1/discount-codes/discount-codes.module';
import { NewsletterController } from './v1/newsletter/newsletter.controller';
import { NewsletterService } from './v1/newsletter/newsletter.service';
import { NewsletterModule } from './v1/newsletter/newsletter.module';
import { ProductsModule } from './v1/products/products.module';
import { CaresAvailabilitiesService } from './v1/cares-availabilities/cares-availabilities.service';
import { CaresAvailabilitiesController } from './v1/cares-availabilities/cares-availabilities.controller';
import { CaresAvailabilitiesModule } from './v1/cares-availabilities/cares-availabilities.module';
import { CaresModule } from './v1/cares/cares.module';
import { ProductStockController } from './v1/product-stock/product-stock.controller';
import { ProductStockService } from './v1/product-stock/product-stock.service';
import { ProductStockModule } from './v1/product-stock/product-stock.module';
import { ProductCategoriesModule } from './v1/product-categories/product-categories.module';
import { ReviewsController } from './v1/reviews/reviews.controller';
import { ReviewsService } from './v1/reviews/reviews.service';
import { ReviewsModule } from './v1/reviews/reviews.module';
import { BlogArticlesModule } from './v1/blog-articles/blog-articles.module';
import { BlogCategoriesController } from './v1/blog-categories/blog-categories.controller';
import { BlogCategoriesModule } from './v1/blog-categories/blog-categories.module';
import { CarouselService } from './v1/carousel/carousel.service';
import { CarouselModule } from './v1/carousel/carousel.module';
import { CustomerOrdersAbortController } from './v1/customer-orders-abort/customer-orders-abort.controller';
import { CustomerOrdersAbortModule } from './v1/customer-orders-abort/customer-orders-abort.module';
import { CaresCategoriesService } from './v1/cares-categories/cares-categories.service';
import { CaresCategoriesController } from './v1/cares-categories/cares-categories.controller';
import { CaresCategoriesModule } from './v1/cares-categories/cares-categories.module';
import { FormationsCategoriesModule } from './v1/formations-categories/formations-categories.module';
import {
  FormationsAvailabilitiesController,
} from './v1/formations-availabilities/formations-availabilities.controller';
import { BlogArticle } from './v1/blog-articles/blog-articles.entity';
import { BlogCategory } from './v1/blog-categories/blog-category.entity';
import { Cares } from './v1/cares/cares.entity';
import { CaresAvailabilities } from './v1/cares-availabilities/cares-availabilities.entity';
import { CaresCategories } from './v1/cares-categories/cares-categories.entity';
import { Carousel } from './v1/carousel/carousel.entity';
import { CustomerOrders } from './v1/customer-orders/customer-orders.entity';
import { CustomerOrdersAbort } from './v1/customer-orders-abort/customer-orders-abort.entity';
import { CustomerPreOrders } from './v1/customer-pre-orders/customer-pre-orders.entity';
import { Customers } from './v1/customers/customers.entity';
import { DiscountCodes } from './v1/discount-codes/discount-codes.entity';
import { Formations } from './v1/formations/formations.entity';
import { FormationsAvailabilities } from './v1/formations-availabilities/formations-availabilities.entity';
import { FormationsCategories } from './v1/formations-categories/formations-categories.entity';
import { FormationsSubscribers } from './v1/formations-subscribers/formations-subscribers.entity';
import { Newsletter } from './v1/newsletter/newsletter.entity';
import { Places } from './v1/places/places.entity';
import { ProductCategories } from './v1/product-categories/product-categories.entity';
import { ProductStock } from './v1/product-stock/product-stock.entity';
import { Products } from './v1/products/products.entity';
import { Reviews } from './v1/reviews/reviews.entity';
import { BlogCategoriesService } from './v1/blog-categories/blog-categories.service';
import { Connection, getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), {}),
    }),
    TypeOrmModule.forFeature([
      BlogArticle,
      BlogCategory,
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
    BlogCategoriesService,
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
