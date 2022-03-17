import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
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
}
