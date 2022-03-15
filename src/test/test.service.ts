import { Injectable } from '@nestjs/common';

import fb from 'firebase';

@Injectable()
export class TestService {

  constructor() {
    fb.app.initializeApp()
  }
  userAuthentication(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    return fb
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((r) => {
        return r;
      });
  }
}
