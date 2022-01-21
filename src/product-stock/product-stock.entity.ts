import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from '../products/products.entity';

@Entity('product_stock')
export class ProductStock {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'product_id' })
  productId: number;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @Column('timestamptz', { name: 'date', nullable: true })
  date: Date ;

  @Column('text', { name: 'seller', nullable: true })
  seller: string ;

  @Column('text', { name: 'orderId', nullable: true })
  orderId: string ;

  @ManyToOne(() => Products, (products) => products.productStocks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;
}
