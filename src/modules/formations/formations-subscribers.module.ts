import { Module } from '@nestjs/common';
import { FormationsSubscribersService } from '../../services/formations/formations-subscribers.service';

@Module({
  providers: [FormationsSubscribersService],
})
export class FormationsSubscribersModule {}
