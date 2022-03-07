import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cares_categories')
export class CaresCategories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 250 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 1000 })
  description: string ;
}
