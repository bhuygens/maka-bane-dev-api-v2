import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';

@Index('newsletter_customers_id_fk', ['customerId'], {})
@Index('newsletter_email_uindex', ['email'], { unique: true })
@Index('newsletter_id_uindex', ['id'], { unique: true })
@Entity('newsletter', { schema: 'bwozsqvguehemtybe0hq' })
export class Newsletter {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 60 })
  email: string;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number | null;

  @ManyToOne(() => Customers, (customers) => customers.newsletters, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;
}
