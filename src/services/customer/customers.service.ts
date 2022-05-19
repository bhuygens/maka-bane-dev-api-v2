import { Injectable } from '@nestjs/common';
import firebase from 'firebase';
import { StripeServiceHelper } from '../_common/stripe/stripe-service-helper.service';
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
import { Newsletter } from '../../entities/newsletter/newsletter.entity';
import { RequestSuccess } from '../../_shared/interfaces/RequestSuccess';
import { PaginationQueryDto } from '../../dto/_common/pagination-query.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly stripeService: StripeServiceHelper,
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
    @InjectRepository(FormationsSubscribers)
    private readonly formationsSubscribersRepository: Repository<FormationsSubscribers>,
    @InjectRepository(CustomerOrders)
    private readonly ordersRepository: Repository<CustomerOrders>,
    @InjectRepository(Newsletter)
    private readonly newsletterRepository: Repository<Newsletter>,
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
    const customer = await this.customersRepository.findOne({ email: email });
    const isInNewsletter = await this.newsletterRepository.findOne({ email });
    return {
      ...customer,
      isInNewsletter: isInNewsletter ? 1 : 0,
    };
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
  ): Promise<RequestSuccess> {
    const customer = await this.customersRepository.preload({
      id: updateCustomerDto.id,
      ...updateCustomerDto,
    });
    if (!customer) {
      ErrorManager.notFoundException(
        `Customer ${updateCustomerDto.id} not found`,
      );
    }
    await this.customersRepository.save(customer);
    return {
      success: true,
      message: 'clientUpdated',
    };
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

  async subscribeToNewsletter(email): Promise<RequestSuccess> {
    const isExist = await this.newsletterRepository.findOne({ email });
    if (!isExist) {
      // Check if email is used in client table
      const isCustomerExist = await this.customersRepository.findOne({ email });

      // If customer exist -> link newsletter status to client
      if (isCustomerExist) {
        const customerToSave = this.newsletterRepository.create({
          email: email,
          customerId: isCustomerExist.id,
        });
        return await this.newsletterRepository.save(customerToSave).then(() => {
          return {
            success: true,
            message: 'clientInserted',
          };
        });
      } else {
        // Else create new line in newsletter table
        const customerToSave = this.newsletterRepository.create({ email });
        return await this.newsletterRepository.save(customerToSave).then(() => {
          return {
            message: 'clientInserted',
            success: true,
          };
        });
      }
    } else {
      return {
        success: false,
        message: 'clientAlreadyExist',
      };
    }
  }

  async unsubscribeToNewsletter(email: string): Promise<RequestSuccess> {
    const isExist = await this.newsletterRepository.findOne({ email });
    try {
      if (isExist) {
        return await this.newsletterRepository.remove(isExist).then(() => {
          return {
            success: true,
            message: 'customerDeleted',
          };
        });
      } else {
        return {
          success: false,
          message: 'customerNotFound',
        };
      }
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  getCustomers(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.customersRepository.find({
      order: {
        email: 'ASC',
      },
      skip: offset,
      take: limit,
    });
  }

  async getCustomerById(id: number) {
    const customer = await this.customersRepository.findOne({ id });
    if (customer) {
      const isInNewsletter = await this.newsletterRepository.findOne({
        customerId: customer.id,
      });
      return {
        ...customer,
        isInNewsletter: isInNewsletter ? 1 : 0,
      };
    }

  }
}
