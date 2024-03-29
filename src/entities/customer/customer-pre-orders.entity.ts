import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from './customers.entity';
import { OrderInfosModel } from '../../interfaces/orders/order-infos.model';

@Entity('customer_pre_orders')
export class CustomerPreOrders {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('timestamptz', { name: 'orderDate', nullable: true })
  orderDate: Date;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number;

  @Column('jsonb', { name: 'order_data', nullable: true })
  orderData: OrderInfosModel;

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

  @ManyToOne(() => Customers, (customers) => customers.customerPreOrders)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;
}
