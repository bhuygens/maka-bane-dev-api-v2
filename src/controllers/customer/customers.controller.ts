import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from '../../services/customer/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  registerCustomer(@Body() customer: [email: string, password: string]) {
    this.customerService.registerCustomer(customer);
  }


}
