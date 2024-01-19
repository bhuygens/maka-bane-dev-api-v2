import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Formations } from './formations.entity';
import { Places } from '../places/places.entity';
import { FormationsSubscribers } from './formations-subscribers.entity';

@Entity('formations_availabilities')
export class FormationsAvailabilities {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'formation_id', nullable: true })
  formationId: number;

  @Column('int', { name: 'place' })
  place: number;

  @Column('timestamptz', { name: 'date' })
  date: Date;

  @Column('int', { name: 'left_places' })
  leftPlaces: number;

  @Column('varchar', { name: 'progenda_link', nullable: true, length: 500 })
  progendaLink: string;

  @Column('text', { name: 'hour', nullable: true })
  hour: string;

  @ManyToOne(() => Formations, (formations) => formations.availabilities)
  @JoinColumn([{ name: 'formation_id', referencedColumnName: 'id' }])
  formation: Formations;

  @ManyToOne(() => Places, (places) => places.formationsAvailabilities, {
    eager: true,
  })
  @JoinColumn([{ name: 'place', referencedColumnName: 'id' }])
  place2: Places;

  @OneToMany(
    () => FormationsSubscribers,
    (formationsSubscribers) => formationsSubscribers.formationAvailability,
    { eager: true },
  )
  subscribers: FormationsSubscribers[];
}
