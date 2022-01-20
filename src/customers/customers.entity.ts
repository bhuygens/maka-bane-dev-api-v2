import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerOrders } from '../customer-orders/customer-orders.entity';
import { CustomerPreOrders } from '../customer-pre-orders/customer-pre-orders.entity';
import { DiscountCodes } from '../discount-codes/discount-codes.entity';
import { FormationsSubscribers } from '../formations-subscribers/formations-subscribers.entity';
import { Newsletter } from '../newsletter/newsletter.entity';

@Index('customers_id_uindex', ['id'], { unique: true })
@Index('customers_pseudo_uindex', ['pseudo'], { unique: true })
@Entity('customers', { schema: 'bwozsqvguehemtybe0hq' })
export class Customers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 60 })
  email: string;

  @Column('varchar', { name: 'last_name', nullable: true, length: 50 })
  lastName: string | null;

  @Column('varchar', { name: 'first_name', nullable: true, length: 50 })
  firstName: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 15 })
  phone: string | null;

  @Column('varchar', { name: 'stripe_customer_id', nullable: true, length: 50 })
  stripeCustomerId: string | null;

  @Column('varchar', { name: 'delivery_address', nullable: true, length: 100 })
  deliveryAddress: string | null;

  @Column('varchar', { name: 'delivery_city', nullable: true, length: 100 })
  deliveryCity: string | null;

  @Column('varchar', { name: 'delivery_zipcode', nullable: true, length: 7 })
  deliveryZipcode: string | null;

  @Column('varchar', { name: 'delivery_country', nullable: true, length: 50 })
  deliveryCountry: string | null;

  @Column('varchar', { name: 'billing_address', nullable: true, length: 100 })
  billingAddress: string | null;

  @Column('varchar', { name: 'billing_city', nullable: true, length: 100 })
  billingCity: string | null;

  @Column('varchar', { name: 'billing_zipcode', nullable: true, length: 7 })
  billingZipcode: string | null;

  @Column('varchar', { name: 'billing_country', nullable: true, length: 50 })
  billingCountry: string | null;

  @Column('varchar', {
    name: 'pseudo',
    nullable: true,
    unique: true,
    length: 10,
  })
  pseudo: string | null;

  @OneToMany(() => CustomerOrders, (customerOrders) => customerOrders.customer)
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
  )
  formationsSubscribers: FormationsSubscribers[];

  @OneToMany(() => Newsletter, (newsletter) => newsletter.customer)
  newsletters: Newsletter[];
}
