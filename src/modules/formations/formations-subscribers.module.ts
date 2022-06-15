import { Module } from '@nestjs/common';
import { FormationsSubscribersService } from '../../services/formations/formations-subscribers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormationsSubscribers])],
  providers: [FormationsSubscribersService],
  exports: [FormationsSubscribersService],
})
export class FormationsSubscribersModule {}
