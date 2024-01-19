import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from '../products/products.entity';
import { Cares } from '../cares/cares.entity';

@Entity('reviews')
export class Reviews {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'client_id' })
  clientId: number;

  @Column('int', { name: 'product_id', nullable: true })
  productId: number;

  @Column('int', { name: 'care_id', nullable: true })
  careId: number;

  @Column('int', { name: 'formation_id', nullable: true })
  formationId: number;

  @Column({
    name: 'note',
    type: 'decimal',
    precision: 12,
    default: 0.0,
  })
  note: number;

  @Column('timestamptz', { name: 'date' })
  date: Date;

  @Column('varchar', { name: 'description', length: 300 })
  description: string;

  @ManyToOne(() => Products, (products) => products.reviews)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;

  @ManyToOne(() => Cares, (cares) => cares.reviews)
  @JoinColumn([{ name: 'care_id', referencedColumnName: 'id' }])
  care: Cares;
}
