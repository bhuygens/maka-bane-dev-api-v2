import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Process from 'process';
import { json } from 'express';
import * as admin from 'firebase-admin';
import firebase from 'firebase';
import adminConfig from './_config/firebase-admin-config';
import firebaseConfig from './_config/firebase-config';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Initialize FIREBASE
  firebase.initializeApp(firebaseConfig);
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  // Update request size for cares (for temp img base 64)
  app.use('/cares', json({ limit: '50mb' }));
  app.use('/blog-articles', json({ limit: '50mb' }));
  app.use(json({ limit: '20mb' }));

  app.enableCors();

  await app.listen(Process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
