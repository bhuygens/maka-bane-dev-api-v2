import { IsJSON, IsNumber, IsString } from 'class-validator';

export class FormationPreBookingDto {
  @IsNumber()
  price: number;

  @IsNumber()
  formationId: number;

  @IsNumber()
  formationAvailabilityId: number;

  @IsNumber()
  customerId: number;

  @IsString()
  stripePaymentIntentId: string;

  @IsNumber()
  numberPersons: number;

  @IsJSON()
  paymentObject: {
    customerBillingAddress: string;

    customerBillingCity: string;

    customerBillingCountry: string;

    customerBillingZipcode: number;

    customerCardOwner: string;

    customerEmail: string;

    customerFirstname: string;

    customerLastname: string;
  };
}
