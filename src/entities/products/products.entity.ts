import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountCodes } from '../discount-codes/discount-codes.entity';
import { ProductStock } from './product-stock.entity';
import { ProductCategories } from './product-categories.entity';
import { Reviews } from '../reviews/reviews.entity';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 250 })
  name: string;

  @Column({
    name: 'buying_price',
    type: 'decimal',
    precision: 2,
    default: 0.0,
    nullable: false,
  })
  buyingPrice: number;

  @Column({
    name: 'retail_price',
    type: 'decimal',
    precision: 2,
    default: 0.0,
    nullable: false,
  })
  retailPrice: number;

  @Column({
    name: 'vat_class',
    type: 'decimal',
    precision: 2,
    default: 0.0,
    nullable: false,
  })
  vatClass: number;

  @Column('int', { name: 'category_id', nullable: false })
  categoryId: number;

  @Column('int', { name: 'current_stock', nullable: true })
  currentStock: number;

  @Column('text', { name: 'short_resume' })
  shortResume: string;

  @Column('text', { name: 'benefit', nullable: true })
  benefit: string;

  @Column('varchar', { name: 'tags', nullable: true, length: 250 })
  tags: string;

  @Column('boolean', { name: 'is_best_product', default: false })
  isBestProduct: number;

  @Column('varchar', { name: 'images_url', array: true })
  imagesUrl: string[];

  @Column('boolean', {
    name: 'has_product_declination',
    nullable: true,
    default: false,
  })
  hasProductDeclination: number;

  @Column('boolean', { name: 'is_declination_product', default: false })
  isDeclinationProduct: number;

  @Column('int', { name: 'main_product_id', nullable: true })
  mainProductId: number;

  @Column('text', { name: 'subType', nullable: true })
  subType: string;

  @OneToMany(() => DiscountCodes, (discountCodes) => discountCodes.product)
  discountCodes: DiscountCodes[];

  @OneToMany(() => ProductStock, (productStock) => productStock.product)
  productStocks: ProductStock[];

  @ManyToOne(
    () => ProductCategories,
    (productCategories) => productCategories.products,
  )
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: ProductCategories;

  @OneToMany(() => Reviews, (reviews) => reviews.product)
  reviews: Reviews[];
}
