import { Module } from '@nestjs/common';
import { CommonController } from '../../controllers/common/common.controller';
import { CommonService } from '../../services/_common/common.service';
import { FormationsService } from '../../services/formations/formations.service';
import { FormationsModule } from '../formations/formations.module';
import { FormationsSubscribersModule } from '../formations/formations-subscribers.module';
import { FormationsSubscribersService } from '../../services/formations/formations-subscribers.service';

@Module({
  imports: [FormationsModule, FormationsSubscribersModule],
  providers: [CommonService, FormationsService, FormationsSubscribersService],
  controllers: [CommonController],
})
export class CommonModule {
}
