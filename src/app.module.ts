import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FormationsModule } from './modules/formations/formations.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsAvailabilitiesService } from './services/formations/formations-availabilities.service';
import { FormationsAvailabilitiesModule } from './modules/formations/formations-availabilities.module';
import { FormationsSubscribersController } from './controllers/formations/formations-subscribers.controller';
import { FormationsSubscribersModule } from './modules/formations/formations-subscribers.module';
import { PlacesService } from './services/places/places.service';
import { PlacesController } from './controllers/places/places.controller';
import { PlacesModule } from './modules/places/places.module';
import { CustomersModule } from './modules/customer/customers.module';
import { CustomerOrdersService } from './services/customer/customer-orders.service';
import { CustomerOrdersModule } from './modules/customer/customer-orders.module';
import { CustomerPreOrdersController } from './controllers/customer/customer-pre-orders.controller';
import { CustomerPreOrdersService } from './services/customer/customer-pre-orders.service';
import { CustomerPreOrdersModule } from './modules/customer/customer-pre-orders.module';
import { DiscountCodesModule } from './modules/discount-codes/discount-codes.module';
import { NewsletterController } from './controllers/newsletter/newsletter.controller';
import { NewsletterService } from './services/newsletter/newsletter.service';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { ProductsModule } from './modules/products/products.module';
import { CaresAvailabilitiesService } from './services/cares/cares-availabilities.service';
import { CaresAvailabilitiesController } from './controllers/cares/cares-availabilities.controller';
import { CaresAvailabilitiesModule } from './modules/cares/cares-availabilities.module';
import { CaresModule } from './modules/cares/cares.module';
import { ProductStockController } from './controllers/products/product-stock.controller';
import { ProductStockService } from './services/products/product-stock.service';
import { ProductStockModule } from './modules/products/product-stock.module';
import { ProductCategoriesModule } from './modules/products/product-categories.module';
import { ReviewsController } from './controllers/reviews/reviews.controller';
import { ReviewsService } from './services/reviews/reviews.service';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { BlogArticlesModule } from './modules/blog/blog-articles.module';
import { BlogCategoriesController } from './controllers/blog/blog-categories.controller';
import { BlogCategoriesModule } from './modules/blog/blog-categories.module';
import { CarouselService } from './services/carousel/carousel.service';
import { CarouselModule } from './modules/carousel/carousel.module';
import { CustomerOrdersAbortController } from './controllers/customer/customer-orders-abort.controller';
import { CustomerOrdersAbortModule } from './modules/customer/customer-orders-abort.module';
import { CaresCategoriesService } from './services/cares/cares-categories.service';
import { CaresCategoriesController } from './controllers/cares/cares-categories.controller';
import { CaresCategoriesModule } from './modules/cares/cares-categories.module';
import { FormationsAvailabilitiesController } from './controllers/formations/formations-availabilities.controller';
import { BlogArticle } from './entities/blog/blog-articles.entity';
import { BlogCategory } from './entities/blog/blog-category.entity';
import { Cares } from './entities/cares/cares.entity';
import { CaresAvailabilities } from './entities/cares/cares-availabilities.entity';
import { CaresCategories } from './entities/cares/cares-categories.entity';
import { Carousel } from './entities/carousel/carousel.entity';
import { CustomerOrders } from './entities/customer/customer-orders.entity';
import { CustomerOrdersAbort } from './entities/customer/customer-orders-abort.entity';
import { CustomerPreOrders } from './entities/customer/customer-pre-orders.entity';
import { Customers } from './entities/customer/customers.entity';
import { DiscountCodes } from './entities/discount-codes/discount-codes.entity';
import { Formations } from './entities/formations/formations.entity';
import { FormationsAvailabilities } from './entities/formations/formations-availabilities.entity';
import { FormationsCategories } from './entities/formations/formations-categories.entity';
import { FormationsSubscribers } from './entities/formations/formations-subscribers.entity';
import { Newsletter } from './entities/newsletter/newsletter.entity';
import { Places } from './entities/places/places.entity';
import { ProductCategories } from './entities/products/product-categories.entity';
import { ProductStock } from './entities/products/product-stock.entity';
import { Products } from './entities/products/products.entity';
import { Reviews } from './entities/reviews/reviews.entity';
import { BlogCategoriesService } from './services/blog/blog-categories.service';
import { getConnectionOptions } from 'typeorm';
import { TestModule } from './test/test.module';
import { PreauthMiddleware } from './_shared/middlewares/auth/preauth.middleware';
import { StripeServiceHelper } from './services/_common/stripe/stripe-service-helper.service';
import { CustomersService } from './services/customer/customers.service';
import { StripeModule } from './modules/stripe/stripe.module';
import { StripeController } from './controllers/stripe/stripe.controller';
import { StripeService } from './services/stripe/stripe.service';

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
    TestModule,
    StripeModule,
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
    StripeService,
    CustomersService,
    StripeServiceHelper,
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
    StripeController,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreauthMiddleware)
      .exclude(
        { path: 'test', method: RequestMethod.ALL },
        { path: 'formations', method: RequestMethod.ALL },
        { path: 'cares', method: RequestMethod.ALL },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.POST,
      });
  }
}
