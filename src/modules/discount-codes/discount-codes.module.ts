import { Module } from '@nestjs/common';
import { DiscountCodesService } from '../../services/discount-codes/discount-codes.service';
import { DiscountCodesController } from '../../controllers/discount-codes/discount-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCodes } from '../../entities/discount-codes/discount-codes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCodes])],
  providers: [DiscountCodesService],
  controllers: [DiscountCodesController],
})
export class DiscountCodesModule {}
