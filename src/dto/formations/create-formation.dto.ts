export class CreateFormationDto {
  name: string;
  description: string;
  benefit: string;
  duration: number;
  imagesUrl: string[];
  vat_price: number;
  duration_text: string;
  is_active: boolean;
  durationType: string;
}
