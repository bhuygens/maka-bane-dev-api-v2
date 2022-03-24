import { Module } from '@nestjs/common';
import { StripeController } from '../../controllers/stripe/stripe.controller';
import { StripeService } from '../../services/stripe/stripe.service';
import { StripeServiceHelper } from '../../services/_common/stripe/stripe-service-helper.service';

@Module({
  // imports: [TypeOrmModule.forFeature([Cares, CaresAvailabilities])],
  controllers: [StripeController],
  providers: [StripeService, StripeServiceHelper],
})
export class StripeModule {}
