import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CaresAvailabilities } from './CaresAvailabilities';
import { FormationsAvailabilities } from '../formations-availabilities/formationsAvailabilities.entity';

@Index('places_address_uindex', ['address'], { unique: true })
@Index('places_id_uindex', ['id'], { unique: true })
@Entity('places', { schema: 'bwozsqvguehemtybe0hq' })
export class Places {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'address', unique: true, length: 100 })
  address: string;

  @OneToMany(
    () => CaresAvailabilities,
    (caresAvailabilities) => caresAvailabilities.place2,
  )
  caresAvailabilities: CaresAvailabilities[];

  @OneToMany(
    () => FormationsAvailabilities,
    (formationsAvailabilities) => formationsAvailabilities.place2,
  )
  formationsAvailabilities: FormationsAvailabilities[];
}
