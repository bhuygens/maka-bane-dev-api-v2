import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';

@Entity('newsletter')
export class Newsletter {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 60 })
  email: string;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number ;

  @ManyToOne(() => Customers, (customers) => customers.newsletters)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;
}
