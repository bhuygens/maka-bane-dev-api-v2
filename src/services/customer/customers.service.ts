import { Injectable } from '@nestjs/common';
import firebase from 'firebase';
import { StripeService } from '../_common/stripe/stripe.service';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../../entities/customer/customers.entity';
import { Repository } from 'typeorm';
import { Stripe } from 'stripe';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';
import UpdateCustomerDto from '../../dto/customers/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly stripeService: StripeService,
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    @InjectRepository(FormationsSubscribers)
    private readonly formationsSubscribersRepository: Repository<FormationsSubscribers>,
    @InjectRepository(CustomerOrders)
    private readonly ordersRepository: Repository<CustomerOrders>,
  ) {}

  async registerCustomer(customer: {
    email: string;
  }): Promise<{ success: boolean; customer: Customers }> {
    let stripeAccount: Stripe.Customer;
    let dbUser: Customers;

    // Stripe register
    try {
      stripeAccount = await this.stripeService.createCustomer(customer.email);
    } catch (e) {
      ErrorManager.customException(e);
      // TODO : remove stripe register
    }

    // Store user in DB
    try {
      const newCustomer = this.customerRepository.create({
        email: customer.email,
        stripeCustomerId: stripeAccount.id,
      });
      dbUser = await this.customerRepository.save(newCustomer);
    } catch (e) {
      console.error(e);
      ErrorManager.customException(`Error while adding user to DB, ${e}`);
      // TODO : delete user from stripe and db
    }

    return {
      success: true,
      customer: dbUser,
    };
  }

  async getCustomerDetails(id: number) {
    return await this.customerRepository.findOne(id);
  }

  async getCustomerFormations(
    customerId: number,
  ): Promise<FormationsSubscribers[]> {
    const customer = await this.customerRepository.findOne(customerId);
    return await this.formationsSubscribersRepository.find({ customer });
  }

  async getCustomerOrders(customerId: number): Promise<CustomerOrders[]> {
    const customer = await this.customerRepository.findOne(customerId);
    return await this.ordersRepository.find({ customer });
  }

  async updateCustomerInfos(
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customers> {
    const customer = await this.customerRepository.preload({
      id: +updateCustomerDto.customerId,
      ...updateCustomerDto,
    });
    if (!customer) {
      ErrorManager.notFoundException(
        `Customer ${updateCustomerDto.customerId} not found`,
      );
    }
    return this.customerRepository.save(customer);
  }

  userAuthentication(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    console.log('userData', userData);
    return firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((r) => {
        return r;
      });
  }
}
