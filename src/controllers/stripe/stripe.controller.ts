import { Body, Controller, Post } from '@nestjs/common';
import { StripeServiceHelper } from '../../services/_common/stripe/stripe-service-helper.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeServiceHelper) {}

  @Post('/intent')
  async createPaymentIntent(
    @Body() body: { amount: number; stripeCustomerId: string; method?: string },
  ) {
    return await this.stripeService.createPaymentIntent(
      body.amount,
      body.stripeCustomerId,
      body.method,
    );
  }

  @Post('/updateIntent')
  async updatePaymentIntent(
    @Body() body: { paymentIntentId: string; amount: number },
  ) {
    return await this.stripeService.updatePaymentIntent(
      body.paymentIntentId,
      body.amount,
    );
  }
}
