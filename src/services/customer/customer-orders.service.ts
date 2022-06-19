import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';

@Injectable()
export class CustomerOrdersService {
  constructor(
    @InjectRepository(CustomerOrders)
    private readonly customerOrders: Repository<CustomerOrders>,
  ) {}

  async countOrders(): Promise<number> {
    return (await this.customerOrders.find()).length;
  }
}
