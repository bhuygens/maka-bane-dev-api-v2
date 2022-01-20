import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'formations' })
export class FormationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  benefit: string;

  @Column()
  duration: number;

  @Column()
  images_url_stringified: string;

  @Column()
  tags: string;

  @Column()
  vat_price: number;

  @Column()
  vat_amount: number;

  @Column()
  duration_text: string;

  @Column({ default: true })
  is_active: boolean;
}
