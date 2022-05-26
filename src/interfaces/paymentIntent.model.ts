export interface PaymentIntentModel {
  customer: string;
  amount: number;
  currency: string;
  payment_method_types: [string];
  payment_method_options?: {};
}