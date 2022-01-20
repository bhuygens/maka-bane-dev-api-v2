import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FormationsEntity } from '../formations/formations.entity';
import { Places } from '../places/places.entity';
import { FormationsSubscribers } from '../formations-subscribers/formations-subscribers.entity';

@Index('availabilities__formations_fk', ['formationId'], {})
@Index('availabilities_id_uindex', ['id'], { unique: true })
@Index('formations_availabilities_places_id_fk', ['place'], {})
@Entity('formations_availabilities', { schema: 'bwozsqvguehemtybe0hq' })
export class FormationsAvailabilities {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'formation_id', nullable: true })
  formationId: number | null;

  @Column('int', { name: 'place' })
  place: number;

  @Column('date', { name: 'date' })
  date: string;

  @Column('int', { name: 'left_places' })
  leftPlaces: number;

  @Column('varchar', { name: 'progenda_link', nullable: true, length: 500 })
  progendaLink: string | null;

  @Column('mediumtext', { name: 'hour', nullable: true })
  hour: string | null;

  @ManyToOne(
    () => FormationsEntity,
    (formations) => formations.formationsAvailabilities,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'formation_id', referencedColumnName: 'id' }])
  formation: FormationsEntity;

  @ManyToOne(() => Places, (places) => places.formationsAvailabilities, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'place', referencedColumnName: 'id' }])
  place2: Places;

  @OneToMany(
    () => FormationsSubscribers,
    (formationsSubscribers) => formationsSubscribers.formationAvailability,
  )
  formationsSubscribers: FormationsSubscribers[];
}
