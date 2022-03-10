import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from '../products/products.entity';

@Entity('product_categories')
export class ProductCategories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 250 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 1000 })
  description: string;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}
