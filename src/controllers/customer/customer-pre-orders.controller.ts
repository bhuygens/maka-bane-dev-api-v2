import { Body, Controller, Post } from '@nestjs/common';
import { CustomerPreOrdersService } from '../../services/customer/customer-pre-orders.service';
import CustomerPreOrderDto from '../../dto/customers/customer-pre-order.dto';

@Controller('customer-pre-orders')
export class CustomerPreOrdersController {
  constructor(
    private readonly customerPreOrdersService: CustomerPreOrdersService,
  ) {}

  @Post('pre-order')
  async storeCustomerPreOrder(
    @Body() customerPreOrderDto: CustomerPreOrderDto,
  ): Promise<{ success: boolean; uuid: string }> {
    return this.customerPreOrdersService.storeCustomerPreOrder(
      customerPreOrderDto,
    );
  }

  @Post('/paid')
  async moveOrderToPaid(
    @Body() body: { paymentIntentId: string; cardOwner: string },
  ): Promise<any> {
    return await this.customerPreOrdersService.moveOrderToPaid(
      body.paymentIntentId,
      body.cardOwner,
    );
  }
}
