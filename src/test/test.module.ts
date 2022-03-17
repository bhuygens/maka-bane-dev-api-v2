import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { StripeService } from '../services/_common/stripe/stripe.service';

@Module({
  controllers: [TestController],
  providers: [TestService, StripeService],
})
export class TestModule {}
