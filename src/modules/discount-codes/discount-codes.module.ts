import { Module } from '@nestjs/common';
import { DiscountCodesService } from '../../services/discount-codes/discount-codes.service';
import { DiscountCodesController } from '../../controllers/discount-codes/discount-codes.controller';

@Module({
  providers: [DiscountCodesService],
  controllers: [DiscountCodesController],
})
export class DiscountCodesModule {}
