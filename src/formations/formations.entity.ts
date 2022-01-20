import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FormationsAvailabilities } from '../formations-availabilities/formationsAvailabilities.entity';
import { FormationsSubscribers } from '../formations-subscribers/formations-subscribers.entity';

@Index('formations_id_uindex', ['id'], { unique: true })
@Entity('formations', { schema: 'bwozsqvguehemtybe0hq' })
export class FormationsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 200 })
  name: string;

  @Column('longtext', { name: 'description' })
  description: string;

  @Column('varchar', { name: 'benefit', length: 2000 })
  benefit: string;

  @Column('int', { name: 'duration' })
  duration: number;

  @Column('varchar', { name: 'images_url_stringified', length: 1000 })
  imagesUrlStringified: string;

  @Column('varchar', { name: 'tags', length: 1000 })
  tags: string;

  @Column('float', { name: 'vat_price', precision: 12 })
  vatPrice: number;

  @Column('float', { name: 'vat_amount', precision: 12 })
  vatAmount: number;

  @Column('varchar', { name: 'duration_text', nullable: true, length: 1000 })
  durationText: string | null;

  @Column('tinyint', { name: 'is_active', default: () => '1' })
  isActive: boolean;

  @OneToMany(
    () => FormationsAvailabilities,
    (formationsAvailabilities) => formationsAvailabilities.formation,
  )
  formationsAvailabilities: FormationsAvailabilities[];

  @OneToMany(
    () => FormationsSubscribers,
    (formationsSubscribers) => formationsSubscribers.formation,
  )
  formationsSubscribers: FormationsSubscribers[];
}
