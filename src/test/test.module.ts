import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { StripeServiceHelper } from '../services/_common/stripe/stripe-service-helper.service';

@Module({
  controllers: [TestController],
  providers: [TestService, StripeServiceHelper],
})
export class TestModule {}
