import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';
import { FormationsAvailabilities } from '../formations-availabilities/formationsAvailabilities.entity';
import { FormationsEntity } from '../formations/formations.entity';

@Index('formations_subscribers_customers_id_fk', ['customerId'], {})
@Index(
  'formations_subscribers_formations_availabilities_id_fk',
  ['formationAvailabilityId'],
  {},
)
@Index('formations_subscribers_formations_id_fk', ['formationId'], {})
@Entity('formations_subscribers', { schema: 'bwozsqvguehemtybe0hq' })
export class FormationsSubscribers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('longtext', { name: 'uuid', nullable: true })
  uuid: string | null;

  @Column('int', { name: 'customer_id' })
  customerId: number;

  @Column('int', { name: 'formation_id' })
  formationId: number;

  @Column('tinyint', { name: 'hasPaid_deposit', default: () => '0' })
  hasPaidDeposit: number;

  @Column('tinyint', { name: 'hasPaid_whole', default: () => '0' })
  hasPaidWhole: number;

  @Column('longtext', { name: 'stripeIntent_deposit', nullable: true })
  stripeIntentDeposit: string | null;

  @Column('int', { name: 'formationAvailability_id' })
  formationAvailabilityId: number;

  @Column('date', { name: 'deposit_date', nullable: true })
  depositDate: string | null;

  @Column('float', { name: 'price', nullable: true, precision: 12 })
  price: number | null;

  @Column('int', { name: 'numberPersons', nullable: true })
  numberPersons: number | null;

  @Column('longtext', { name: 'paymentObject', nullable: true })
  paymentObject: string | null;

  @Column('longtext', { name: 'error_message', nullable: true })
  errorMessage: string | null;

  @Column('tinyint', { name: 'has_payment_failed', nullable: true })
  hasPaymentFailed: number | null;

  @ManyToOne(() => Customers, (customers) => customers.formationsSubscribers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;

  @ManyToOne(
    () => FormationsAvailabilities,
    (formationsAvailabilities) =>
      formationsAvailabilities.formationsSubscribers,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([
    { name: 'formationAvailability_id', referencedColumnName: 'id' },
  ])
  formationAvailability: FormationsAvailabilities;

  @ManyToOne(
    () => FormationsEntity,
    (formations) => formations.formationsSubscribers,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'formation_id', referencedColumnName: 'id' }])
  formation: FormationsEntity;
}
