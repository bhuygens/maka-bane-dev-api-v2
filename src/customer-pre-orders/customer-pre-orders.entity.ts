import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';

@Index('customer_pre_orders_customers_id_fk', ['customerId'], {})
@Index('customer_pre_orders_id_uindex', ['id'], { unique: true })
@Entity('customer_pre_orders', { schema: 'bwozsqvguehemtybe0hq' })
export class CustomerPreOrders {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('date', { name: 'orderDate', nullable: true })
  orderDate: string | null;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number | null;

  @Column('mediumtext', { name: 'order_data', nullable: true })
  orderData: string | null;

  @Column('int', { name: 'product_count', nullable: true })
  productCount: number | null;

  @Column('float', {
    name: 'vat_included_price',
    nullable: true,
    precision: 12,
  })
  vatIncludedPrice: number | null;

  @Column('mediumtext', { name: 'uuid', nullable: true })
  uuid: string | null;

  @Column('mediumtext', { name: 'tokenId', nullable: true })
  tokenId: string | null;

  @Column('mediumtext', { name: 'paymentIntentId', nullable: true })
  paymentIntentId: string | null;

  @ManyToOne(() => Customers, (customers) => customers.customerPreOrders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;
}
