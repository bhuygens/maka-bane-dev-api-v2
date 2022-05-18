import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerOrders } from './customer-orders.entity';
import { CustomerPreOrders } from './customer-pre-orders.entity';
import { DiscountCodes } from '../discount-codes/discount-codes.entity';
import { FormationsSubscribers } from '../formations/formations-subscribers.entity';
import { Newsletter } from '../newsletter/newsletter.entity';

@Entity('customers')
export class Customers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 60 })
  email: string;

  @Column('varchar', { name: 'last_name', nullable: true, length: 50 })
  lastName: string;

  @Column('varchar', { name: 'first_name', nullable: true, length: 50 })
  firstName: string;

  @Column('varchar', { name: 'phone', nullable: true, length: 15 })
  phone: string;

  @Column('varchar', { name: 'stripe_customer_id', nullable: true, length: 50 })
  stripeCustomerId: string;

  @Column('varchar', { name: 'delivery_address', nullable: true, length: 100 })
  deliveryAddress: string;

  @Column('varchar', { name: 'delivery_city', nullable: true, length: 100 })
  deliveryCity: string;

  @Column('varchar', { name: 'delivery_zipcode', nullable: true, length: 7 })
  deliveryZipcode: string;

  @Column('varchar', { name: 'delivery_country', nullable: true, length: 50 })
  deliveryCountry: string;

  @Column('varchar', { name: 'billing_address', nullable: true, length: 100 })
  billingAddress: string;

  @Column('varchar', { name: 'billing_city', nullable: true, length: 100 })
  billingCity: string;

  @Column('varchar', { name: 'billing_zipcode', nullable: true, length: 7 })
  billingZipcode: string;

  @Column('varchar', { name: 'billing_country', nullable: true, length: 50 })
  billingCountry: string;

  @Column('varchar', {
    name: 'pseudo',
    nullable: true,
    unique: true,
    length: 10,
  })
  pseudo: string;

  @OneToMany(
    () => CustomerOrders,
    (customerOrders) => customerOrders.customer,
    { eager: true },
  )
  customerOrders: CustomerOrders[];

  @OneToMany(
    () => CustomerPreOrders,
    (customerPreOrders) => customerPreOrders.customer,
  )
  customerPreOrders: CustomerPreOrders[];

  @OneToMany(() => DiscountCodes, (discountCodes) => discountCodes.customer)
  discountCodes: DiscountCodes[];

  @OneToMany(
    () => FormationsSubscribers,
    (formationsSubscribers) => formationsSubscribers.customer,
    { eager: true },
  )
  formationsSubscribers: FormationsSubscribers[];

  @OneToMany(() => Newsletter, (newsletter) => newsletter.customer, {
    eager: true,
  })
  newsletters: Newsletter[];
}
