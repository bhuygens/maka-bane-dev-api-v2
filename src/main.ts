import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Process from 'process';

import { json } from 'express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/cares', json({ limit: '50mb' }));
  app.use(json({ limit: '100kb' }));
  await app.listen(Process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
