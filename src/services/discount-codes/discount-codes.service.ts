import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountCodes } from '../../entities/discount-codes/discount-codes.entity';
import { Repository } from 'typeorm';
import ErrorManager from '../../_shared/utils/ErrorManager';

@Injectable()
export class DiscountCodesService {
  constructor(
    @InjectRepository(DiscountCodes)
    private readonly discountCodesRepository: Repository<DiscountCodes>,
  ) {}

  async checkPromoCodeValidity(
    promoCode: string,
  ): Promise<{ discount: DiscountCodes; success: boolean }> {
    const discount = await this.discountCodesRepository.findOne({
      select: [
        'id',
        'code',
        'type',
        'percentCode',
        'directCode',
      ],
      where: { code: promoCode },
    });
    if (discount) {
      await this.discountCodesRepository.save(discount);
      return {
        discount,
        success: true,
      };
    } else {
      ErrorManager.notFoundException(`promoCodeNotFound`);
    }
  }
}
