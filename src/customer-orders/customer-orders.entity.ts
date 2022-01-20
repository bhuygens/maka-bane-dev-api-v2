import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';

@Index('customer_orders_customers_id_fk', ['customerId'], {})
@Index('customer_orders_id_uindex', ['id'], { unique: true })
@Entity('customer_orders', { schema: 'bwozsqvguehemtybe0hq' })
export class CustomerOrders {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('date', { name: 'orderDate', nullable: true })
  orderDate: string | null;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number | null;

  @Column('longtext', { name: 'order_data', nullable: true })
  orderData: string | null;

  @Column('int', { name: 'product_count', nullable: true })
  productCount: number | null;

  @Column('float', {
    name: 'vat_included_price',
    nullable: true,
    precision: 12,
  })
  vatIncludedPrice: number | null;

  @Column('longtext', { name: 'uuid', nullable: true })
  uuid: string | null;

  @Column('longtext', { name: 'tokenId', nullable: true })
  tokenId: string | null;

  @Column('longtext', { name: 'paymentIntentId', nullable: true })
  paymentIntentId: string | null;

  @Column('longtext', { name: 'invoice_url', nullable: true })
  invoiceUrl: string | null;

  @Column('mediumtext', { name: 'cardOwner', nullable: true })
  cardOwner: string | null;

  @ManyToOne(() => Customers, (customers) => customers.customerOrders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;
}
