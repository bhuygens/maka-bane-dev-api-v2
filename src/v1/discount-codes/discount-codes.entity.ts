import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customers } from '../customers/customers.entity';
import { Products } from '../products/products.entity';

@Entity('discount_codes')
export class DiscountCodes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'code', unique: true, length: 10 })
  code: string;

  @Column('int', { name: 'remaining_use' })
  remainingUse: number;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number;

  @Column('int', { name: 'product_id', nullable: true })
  productId: number;

  @Column({
    name: 'direct_code',
    type: 'decimal',
    precision: 2,
    default: 0.0,
    nullable: false,
  })
  directCode: number;

  @Column('int', { name: 'percent_code', nullable: true })
  percentCode: number;

  @Column('varchar', { name: 'type', length: 10 })
  type: string;

  @ManyToOne(() => Customers, (customers) => customers.discountCodes)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;

  @ManyToOne(() => Products, (products) => products.discountCodes)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;
}
