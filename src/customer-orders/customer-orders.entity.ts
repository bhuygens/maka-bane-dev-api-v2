import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';

@Entity('customer_orders')
export class CustomerOrders {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('timestamptz', { name: 'orderDate', nullable: true })
  orderDate: Date;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number;

  @Column('text', { name: 'order_data', nullable: true })
  orderData: string;

  @Column('int', { name: 'product_count', nullable: true })
  productCount: number;

  @Column('decimal', {
    name: 'vat_included_price',
    nullable: true,
  })
  vatIncludedPrice: number;

  @Column('text', { name: 'uuid', nullable: true })
  uuid: string;

  @Column('text', { name: 'tokenId', nullable: true })
  tokenId: string;

  @Column('text', { name: 'paymentIntentId', nullable: true })
  paymentIntentId: string;

  @Column('text', { name: 'invoice_url', nullable: true })
  invoiceUrl: string;

  @Column('text', { name: 'cardOwner', nullable: true })
  cardOwner: string;

  @ManyToOne(() => Customers, (customers) => customers.customerOrders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;
}
