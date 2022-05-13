import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FormationsAvailabilities } from './formations-availabilities.entity';
import { FormationsSubscribers } from './formations-subscribers.entity';

@Entity('formations')
export class Formations {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 200 })
  name: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('varchar', { name: 'benefit', length: 2000 })
  benefit: string;

  @Column('int', { name: 'duration' })
  duration: number;

  @Column('text', { name: 'images_url', array: true, nullable: true})
  imagesUrl: string;

  @Column('text', { name: 'tags', nullable: true, array: true })
  tags: string[];

  @Column({
    name: 'vat_price',
    type: 'decimal',
    precision: 5,
    default: 0.0,
    nullable: false,
  })
  vatPrice: number;

  @Column({
    name: 'vat_amount',
    type: 'decimal',
    precision: 2,
    default: 0.0,
    nullable: false,
  })
  vatAmount: number;

  @Column('varchar', { name: 'duration_text', nullable: true, length: 1000 })
  durationText: string;

  @Column('boolean', { name: 'is_active', default: true })
  isActive: number;

  @OneToMany(
    () => FormationsAvailabilities,
    (formationsAvailabilities) => formationsAvailabilities.formation,
    { eager: true },
  )
  availabilities: FormationsAvailabilities[];

  @OneToMany(
    () => FormationsSubscribers,
    (formationsSubscribers) => formationsSubscribers.formation,
    { eager: true },
  )
  subscribers: FormationsSubscribers[];
}
