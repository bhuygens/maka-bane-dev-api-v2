import { Injectable } from '@nestjs/common';
import { StripeServiceHelper } from '../services/_common/stripe/stripe-service-helper.service';
import firebase from 'firebase';

@Injectable()
export class TestService {
  constructor(private readonly stripeService: StripeServiceHelper) {}

  userAuthentication(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((r) => {
        return r;
      });
  }

  async createStripeAccount(userData: {
    name: string;
    email: string;
  }): Promise<any> {
    return await this.stripeService.createCustomer(
      userData.name);
  }
}
