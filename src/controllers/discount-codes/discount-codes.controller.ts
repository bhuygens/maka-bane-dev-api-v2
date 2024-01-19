import { Controller, Get, Param } from '@nestjs/common';
import { DiscountCodesService } from '../../services/discount-codes/discount-codes.service';

@Controller('discount-codes')
export class DiscountCodesController {
  constructor(private readonly discountCodesServices: DiscountCodesService) {}

  @Get('/checkPromoCodeValidity/:promoCode')
  async checkPromoCodeValidity(@Param('promoCode') promoCode: string) {
    return await this.discountCodesServices.checkPromoCodeValidity(promoCode);
  }
}
