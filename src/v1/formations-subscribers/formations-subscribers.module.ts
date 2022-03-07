import { Module } from '@nestjs/common';
import { FormationsSubscribersService } from './formations-subscribers.service';

@Module({
  providers: [FormationsSubscribersService]
})
export class FormationsSubscribersModule {}
