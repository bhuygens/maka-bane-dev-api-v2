import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import ErrorManager from '../../../_shared/utils/ErrorManager';

@Injectable()
export class StripeServiceHelper {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  public async createCustomer(email: string): Promise<Stripe.Customer> {
    return await this.stripe.customers.create({
      email,
      name: email,
    });
  }

  async createPaymentIntent(
    amount: number,
    stripeCustomerId: string,
    method = 'card',
  ): Promise<Stripe.PaymentIntent> {
    try {
      console.log('createPaymentIntent', amount, stripeCustomerId, method);
      const paymentIntentData = {
        customer: stripeCustomerId,
        amount: amount,
        currency: 'eur',
        payment_method_types: [method],
      };

      return await this.stripe.paymentIntents.create(paymentIntentData);
    } catch (err) {
      ErrorManager.customException(err);
    }
  }

  async updatePaymentIntent(paymentIntentId: string, amount: number) {
    try {
      return await this.stripe.paymentIntents.update(paymentIntentId, {
        amount,
      });
    } catch (e) {
      ErrorManager.customException(e);
    }
  }
}
