import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountCodes } from '../discount-codes/discount-codes.entity';
import { ProductStock } from './ProductStock';
import { ProductCategories } from './ProductCategories';
import { Reviews } from './Reviews';

@Index('products__product_categories_fk', ['categoryId'], {})
@Index('products_id_uindex', ['id'], { unique: true })
@Entity('products', { schema: 'bwozsqvguehemtybe0hq' })
export class Products {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 250 })
  name: string;

  @Column('float', { name: 'buying_price', precision: 12 })
  buyingPrice: number;

  @Column('float', { name: 'retail_price', precision: 12 })
  retailPrice: number;

  @Column('float', { name: 'vat_class', precision: 12 })
  vatClass: number;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @Column('int', { name: 'current_stock', nullable: true })
  currentStock: number | null;

  @Column('longtext', { name: 'short_resume' })
  shortResume: string;

  @Column('longtext', { name: 'benefit', nullable: true })
  benefit: string | null;

  @Column('varchar', { name: 'tags', nullable: true, length: 250 })
  tags: string | null;

  @Column('tinyint', { name: 'is_best_product', default: () => '\'0\'' })
  isBestProduct: number;

  @Column('varchar', { name: 'images_url', nullable: true, length: 1000 })
  imagesUrl: string | null;

  @Column('tinyint', {
    name: 'has_product_declination',
    nullable: true,
    default: () => '\'0\'',
  })
  hasProductDeclination: number | null;

  @Column('tinyint', { name: 'is_declination_product', default: () => '\'0\'' })
  isDeclinationProduct: number;

  @Column('int', { name: 'main_product_id', nullable: true })
  mainProductId: number | null;

  @Column('mediumtext', { name: 'subType', nullable: true })
  subType: string | null;

  @OneToMany(() => DiscountCodes, (discountCodes) => discountCodes.product)
  discountCodes: DiscountCodes[];

  @OneToMany(() => ProductStock, (productStock) => productStock.product)
  productStocks: ProductStock[];

  @ManyToOne(
    () => ProductCategories,
    (productCategories) => productCategories.products,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: ProductCategories;

  @OneToMany(() => Reviews, (reviews) => reviews.product)
  reviews: Reviews[];
}
