import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customer/customers.entity';
import { FormationsAvailabilities } from './formations-availabilities.entity';
import { Formations } from './formations.entity';
import { FormationPaymentObjectModel } from '../../interfaces/formations/formation-payment-object.model';

@Entity('formations_subscribers')
export class FormationsSubscribers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'uuid', nullable: true })
  uuid: string;

  @Column('int', { name: 'customer_id' })
  customerId: number;

  @Column('int', { name: 'formation_id' })
  formationId: number;

  @Column('boolean', { name: 'hasPaid_deposit', default: false })
  hasPaidDeposit: number;

  @Column('boolean', { name: 'hasPaid_whole', default: false })
  hasPaidWhole: boolean;

  @Column('text', { name: 'stripeIntent_deposit', nullable: true })
  stripeIntentDeposit: string;

  @Column('int', { name: 'formationAvailability_id' })
  formationAvailabilityId: number;

  @Column('timestamptz', { name: 'deposit_date', nullable: true })
  depositDate: Date;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 4,
    default: 0.0,
    nullable: false,
  })
  price: number;

  @Column('int', { name: 'numberPersons', nullable: true })
  numberPersons: number;

  @Column('jsonb', { name: 'paymentObject', nullable: true })
  paymentObject: FormationPaymentObjectModel;

  @Column('text', { name: 'error_message', nullable: true })
  errorMessage: string;

  @Column('boolean', { name: 'has_payment_failed', default: false })
  hasPaymentFailed: number;

  @ManyToOne(() => Customers, (customers) => customers.formationsSubscribers)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;

  @ManyToOne(
    () => FormationsAvailabilities,
    (formationsAvailabilities) =>
      formationsAvailabilities.subscribers,
  )
  @JoinColumn([
    { name: 'formationAvailability_id', referencedColumnName: 'id' },
  ])
  formationAvailability: FormationsAvailabilities;

  @ManyToOne(() => Formations, (formations) => formations.subscribers)
  @JoinColumn([{ name: 'formation_id', referencedColumnName: 'id' }])
  formation: Formations;
}
