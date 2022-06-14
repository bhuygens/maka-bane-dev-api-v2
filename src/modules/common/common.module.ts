import { Module } from '@nestjs/common';
import { CommonController } from '../../controllers/common/common.controller';
import { CommonService } from '../../services/common/common.service';
import { FormationsService } from '../../services/formations/formations.service';
import { FormationsModule } from '../formations/formations.module';

@Module({
  imports: [FormationsModule],
  providers: [CommonService, FormationsService],
  controllers: [CommonController],
})
export class CommonModule {
}
