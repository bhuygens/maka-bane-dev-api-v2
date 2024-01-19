import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer_orders_abort')
export class CustomerOrdersAbort {
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

  @Column('text', { name: 'errorMessage', nullable: true })
  errorMessage: string;
}
