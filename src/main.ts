import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Process from 'process';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
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
  const configService: ConfigService = app.get(ConfigService);
  // Set the config options
  const adminConfig: ServiceAccount = {
    projectId: 'maka-bane-dev',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDsMR5vDxq9cwEl\n5dvLD72mKF5DPzFQJzhP6ETkm2I0mpUufmmxjZwwQulxOm6BKIT8zrfnfj93jyoR\nIPoISNcL+J6uGcvNBznloG1S9qcpBU36Hiq3XyL0zHIz4ZuuMNBjRnYAPYoHDqQD\n9XpiWF2spVLJVbzMpDw+zjZKcC3NYtsyNzFKwDhLSvnxZnooUO/6QNutlKSlAJZY\nsm/s48PKhkDuWFsfpdnkzjDdekcxdXvp6o8Cb64QxBO0+WdRmBUC/xonjN7vDMoU\nuY7c8hPuCrWtUJtMG2CmGyu7Mp9HssLy50+SzTcDexqk4l0eeGBq+iDRXsUaT2JT\nowGQ5k1HAgMBAAECggEAMGCpMqc922MEb65ClDePqUpocE6vu5Kk8p0JC2gWN98X\nwlOrM25leO8joIkO3E6f2qY+veA6gLMmsyZ1gB/nSDDu04s+FqstvS5cZhtWRs0q\n2Rm3tyJ55vk/RQgnWojuDf9/KPJx5JsnlhYAMMeXvEaKi+mPR702B8k2Do4mm4QI\nzSmrCPExcS6u6RH3nZX3cREPd4T4D7Zs0nakcS8O7TuEIPLV04UYvSwrPGYHburw\n7+Uoe2alkoMe9Jc1MARG/CiVXYPalSjpf9qDvwdSrODRKz9oZJKSIOVmIPDErHlf\nfRhBY7cRXTAhElxpqgZ6xAJXz4ycjoT8zChPtTmYtQKBgQD8HF2Z01payH/m0ebB\n3vuIWzo9tMGmuIO8eD8zSqDEksPN2nNAJDFtv1ig3FDLuxexf0OlVU5B1VL6ZXnk\nNbpMIicoTx6tf9w4e6imoe4wcPPvKx5VC0dBrmzJsQ9nHfJCsPKEekD1SUOUJKZ9\nW378YDFiK0/0G5nhOPuCXc3ADQKBgQDv1eLlAdIWB8ENFQzhTqciFmuFcfIOm4Mp\ntdFJlh0LIbR7jjK6kkeNi0pvZEw5LphNqqSd+QMBR2BnHcbccVzJxp6bcTa+AbP5\ngspyg4WdjSMrsr/w32LHKkQ+H1PUSwLNWlfqU0S107SZCcPSSgNviFr0yxrWsdel\nG4Kp6wLZowKBgQChIQf5rolLCGYmgfT356nfZl783S//fGJF7JyIDaRevmaChKGw\nVvF4cRkWBnllHHhyKyJy4uiXTt4vxvd2kZg13IYmTxsOTG/VccNCbLAtKaPeMjK6\nq/Co2/APoCh2AT+6vBjj7rbhjiew4RO/fuDUMC6fzYrWO2XH+oFUutsraQKBgDl7\n7nItSYl2OlNEZF3sWCrXbNYDRZ0ysPFiXtNgY32zimrC3m3Recz3QdQJGivqex7C\nc8pZUNsRnI2amXtkwHSsYn+nVxObnOOE8bkYxQHKPk/O/CpjoG1UOB8bqyALCpTl\nvoSviJx8LaEwsfrJOqGU8RgTRk+HOMSeH2dSqNA5AoGBANvGXfp1RcCT4zxW/NAI\n3rCvKyldeoPctbsvsS/SjKsS6VsXzBYn7c5dRBeXRwAKCQndeT+m+r/kQp/gMPVS\nGBIq/KkQaUtYGguXRpigORQC9WNu2q6aK4k64f5VfEYvJgRewa87Bemil0V4yEv/\ngu6j9NYAoeA4DDypwWp6xybC\n-----END PRIVATE KEY-----\n'.replace(
        /\\n/g,
        '\n',
      ),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
}

bootstrap();
