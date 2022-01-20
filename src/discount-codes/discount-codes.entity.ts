import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';
import { Products } from '../products/products.entity';

@Index('discount_codes_code_uindex', ['code'], { unique: true })
@Index('discount_codes_customers_id_fk', ['customerId'], {})
@Index('discount_codes_id_uindex', ['id'], { unique: true })
@Index('discount_codes_products_id_fk', ['productId'], {})
@Entity('discount_codes', { schema: 'bwozsqvguehemtybe0hq' })
export class DiscountCodes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'code', unique: true, length: 10 })
  code: string;

  @Column('int', { name: 'remaining_use' })
  remainingUse: number;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number | null;

  @Column('int', { name: 'product_id', nullable: true })
  productId: number | null;

  @Column('float', { name: 'direct_code', nullable: true, precision: 12 })
  directCode: number | null;

  @Column('int', { name: 'percent_code', nullable: true })
  percentCode: number | null;

  @Column('varchar', { name: 'type', length: 10 })
  type: string;

  @ManyToOne(() => Customers, (customers) => customers.discountCodes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;

  @ManyToOne(() => Products, (products) => products.discountCodes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;
}
