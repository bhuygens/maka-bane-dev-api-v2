import { Injectable } from '@nestjs/common';
import firebase from 'firebase';

@Injectable()
export class CustomersService {

  constructor() {}

  registerCustomer(customer: [email: string, password: string]) {
    // STIRPE REGISTER
    /*
    try {
      const stripeName = customer.email;
      const account = await stripe.customers.create({
        email: stripeName,
        name: stripeName,
      });
      customer.stripeCustomerId = account.id;
    } catch (e) {
      ErrorManager.customException(e);
    }
  */
  }

  userAuthentication(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    console.log('userData', userData);
    return firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((r) => {
        return r;
      });
  }
}
