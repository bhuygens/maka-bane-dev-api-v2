import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CaresAvailabilities } from '../cares-availabilities/cares-availabilities.entity';
import { Reviews } from '../reviews/reviews.entity';
import { IsOptional } from 'class-validator';

@Entity('cares')
export class Cares {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 200 })
  name: string;

  @Column('int', { name: 'note', nullable: true })
  note: number;

  @Column('varchar', { name: 'description', length: 1000 })
  description: string;

  @Column('varchar', { name: 'benefit', length: 2000 })
  benefit: string;

  @Column('int', { name: 'duration' })
  duration: number;

  @Column('varchar', { name: 'images_url_stringified', array: true })
  imagesUrl: string[];

  @Column('varchar', { name: 'tags', length: 1000, array: true })
  tags: string[];

  @Column({
    name: 'vat_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  vatPrice: number;

  @Column({
    name: 'vat_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
    default: 0.2,
  })
  vatAmount: number;

  @Column('varchar', { name: 'duration_text', length: 1000 })
  durationText: string;

  @OneToMany(
    () => CaresAvailabilities,
    (caresAvailabilities) => caresAvailabilities.care,
  )
  caresAvailabilities: CaresAvailabilities[];

  @OneToMany(() => Reviews, (reviews) => reviews.care)
  reviews: Reviews[];
}
