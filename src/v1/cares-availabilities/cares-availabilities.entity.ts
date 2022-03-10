import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cares } from '../cares/cares.entity';
import { Places } from '../places/places.entity';

@Entity('cares_availabilities')
export class CaresAvailabilities {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'care_id', nullable: true })
  careId: number;

  @Column('int', { name: 'place' })
  place: number;

  @Column('timestamptz', { name: 'date' })
  date: Date;

  @Column('int', { name: 'left_places' })
  leftPlaces: number;

  @Column('varchar', { name: 'progenda_link', nullable: true, length: 500 })
  progendaLink: string;

  @ManyToOne(() => Cares, (cares) => cares.caresAvailabilities)
  @JoinColumn([{ name: 'care_id', referencedColumnName: 'id' }])
  care: Cares;

  @ManyToOne(() => Places, (places) => places.caresAvailabilities)
  @JoinColumn([{ name: 'place', referencedColumnName: 'id' }])
  place2: Places;
}
