import { Injectable } from '@nestjs/common';
import { StripeService } from '../services/_common/stripe/stripe.service';
import firebase from 'firebase';

@Injectable()
export class TestService {
  constructor(private readonly stripeService: StripeService) {}

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
      userData.name,
      userData.email,
    );
  }
}
