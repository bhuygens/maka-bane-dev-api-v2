export class CreateFormationDto {
  name: string;
  description: string;
  benefit: string;
  duration: number;
  images_url: string;
  tags: string;
  vat_price: number;
  vat_amount: number;
  duration_text: string;
  is_active: boolean;
}
