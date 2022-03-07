import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';
import { FormationsAvailabilities } from '../formations-availabilities/formations-availabilities.entity';
import { Formations } from '../formations/formations.entity';

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
  hasPaidWhole: number;

  @Column('text', { name: 'stripeIntent_deposit', nullable: true })
  stripeIntentDeposit: string;

  @Column('int', { name: 'formationAvailability_id' })
  formationAvailabilityId: number;

  @Column('timestamptz', { name: 'deposit_date', nullable: true })
  depositDate: Date;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 2,
    default: 0.0,
    nullable: false,
  })
  price: number;

  @Column('int', { name: 'numberPersons', nullable: true })
  numberPersons: number;

  @Column('text', { name: 'paymentObject', nullable: true })
  paymentObject: string;

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
      formationsAvailabilities.formationsSubscribers,
  )
  @JoinColumn([
    { name: 'formationAvailability_id', referencedColumnName: 'id' },
  ])
  formationAvailability: FormationsAvailabilities;

  @ManyToOne(
    () => Formations,
    (formations) => formations.formationsSubscribers,
  )
  @JoinColumn([{ name: 'formation_id', referencedColumnName: 'id' }])
  formation: Formations;
}
