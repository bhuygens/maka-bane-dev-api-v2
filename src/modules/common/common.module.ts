import { Module } from '@nestjs/common';
import { CommonController } from '../../controllers/common/common.controller';
import { CommonService } from '../../services/common/common.service';

@Module({
  providers: [CommonService],
  controllers: [CommonController],
})
export class CommonModule {}
