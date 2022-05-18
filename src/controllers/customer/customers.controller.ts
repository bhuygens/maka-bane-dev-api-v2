import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomersService } from '../../services/customer/customers.service';
import { Customers } from '../../entities/customer/customers.entity';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';
import UpdateCustomerDto from '../../dto/customers/update-customer.dto';
import { RequestSuccess } from '../../_shared/interfaces/RequestSuccess';
import { PaginationQueryDto } from '../../dto/_common/pagination-query.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  async getCustomers(
    @Body() paginationQuery: PaginationQueryDto,
  ): Promise<Customers[]> {
    return this.customerService.getCustomers(paginationQuery);
  }

  @Post('/register')
  async registerCustomer(
    @Body() customer: { email: string },
  ): Promise<{ success: boolean; customer: Customers }> {
    return await this.customerService.registerCustomer(customer);
  }

  @Patch()
  async updateCustomerInfos(
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<RequestSuccess> {
    return await this.customerService.updateCustomerInfos(updateCustomerDto);
  }

  @Post('/detail')
  async getCustomerDetail(@Body() body: { email: string }): Promise<Customers> {
    return await this.customerService.getCustomerDetails(body.email);
  }

  @Get('/formations/:customerId')
  async getCustomerFormations(
    @Param('customerId') customerId: number,
  ): Promise<FormationsSubscribers[]> {
    return await this.customerService.getCustomerFormations(customerId);
  }

  @Get('/orders/:customerId')
  async getCustomerOrders(
    @Query('customerId') customerId: number,
  ): Promise<CustomerOrders[]> {
    return await this.customerService.getCustomerOrders(customerId);
  }

  @Get('/subscribeNewsletter/:email')
  async subscribeToNewsletter(@Param('email') email: string) {
    return await this.customerService.subscribeToNewsletter(email);
  }

  @Get('/unsubscribeNewsletter/:email')
  async unsubscribeToNewsletter(@Param('email') email: string) {
    return await this.customerService.unsubscribeToNewsletter(email);
  }
}
