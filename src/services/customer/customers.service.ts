import { Injectable } from '@nestjs/common';
import firebase from 'firebase';
import { StripeService } from '../_common/stripe/stripe.service';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../../entities/customer/customers.entity';
import { Connection, getRepository, Repository } from 'typeorm';
import { Stripe } from 'stripe';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';
import UpdateCustomerDto from '../../dto/customers/update-customer.dto';
import {
  OrderBillingModel,
  OrderDeliveryModel,
} from '../../interfaces/orders/order-infos.model';

@Injectable()
export class CustomersService {
  constructor(
    private readonly stripeService: StripeService,
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
    @InjectRepository(FormationsSubscribers)
    private readonly formationsSubscribersRepository: Repository<FormationsSubscribers>,
    @InjectRepository(CustomerOrders)
    private readonly ordersRepository: Repository<CustomerOrders>,
    private connection: Connection,
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
      const newCustomer = this.customersRepository.create({
        email: customer.email,
        stripeCustomerId: stripeAccount.id,
      });
      dbUser = await this.customersRepository.save(newCustomer);
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

  async getCustomerDetails(email: string) {
    return await this.customersRepository.findOne({ email: email });
  }

  async getCustomerFormations(id: number): Promise<FormationsSubscribers[]> {
    return await getRepository(FormationsSubscribers)
      .createQueryBuilder('fs')
      .where('fs.customer_id = :id', { id })
      .leftJoinAndSelect('fs.formation', 'formation')
      .leftJoinAndSelect('fs.formationAvailability', 'availability')
      .getMany();
  }

  async getCustomerOrders(customerId: number): Promise<CustomerOrders[]> {
    const customer = await this.customersRepository.findOne(customerId);
    return await this.ordersRepository.find({ customer });
  }

  async updateCustomerInfos(
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customers> {
    const customer = await this.customersRepository.preload({
      id: updateCustomerDto.id,
      ...updateCustomerDto,
    });
    if (!customer) {
      ErrorManager.notFoundException(
        `Customer ${updateCustomerDto.id} not found`,
      );
    }
    return this.customersRepository.save(customer);
  }

  userAuthentication(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((r) => {
        return r;
      });
  }

  async updateCustomerInfosAfterOrder(
    customerId: number,
    deliveryInfos: OrderDeliveryModel,
    billingInfos: OrderBillingModel,
  ) {
    const customer = await this.customersRepository.findOne({
      id: customerId,
    });
    console.log(customer);
    if (customer) {
      // update billing Infos
      customer.billingAddress = billingInfos.address;
      customer.billingCity = billingInfos.city;
      customer.billingCountry = billingInfos.country;
      customer.billingZipcode = billingInfos.zipcode;

      // update delivery infos
      customer.deliveryAddress = deliveryInfos.address;
      customer.deliveryCity = deliveryInfos.city;
      customer.deliveryCountry = deliveryInfos.country;
      customer.deliveryZipcode = deliveryInfos.zipcode;

      return await this.customersRepository.save(customer);
    }
  }
}
