import { Injectable } from '@nestjs/common';

import fb from 'firebase';

@Injectable()
export class TestService {

  userAuthentication(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    console.log('userData', userData);
    return fb
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((r) => {
        return r;
      });
  }
}
