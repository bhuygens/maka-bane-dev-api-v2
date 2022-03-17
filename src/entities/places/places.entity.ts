import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CaresAvailabilities } from '../cares/cares-availabilities.entity';
import { FormationsAvailabilities } from '../formations/formations-availabilities.entity';

@Entity('places')
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
