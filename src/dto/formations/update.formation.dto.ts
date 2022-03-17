import { CreateFormationDto } from './create-formation.dto';
import { IsNumber } from 'class-validator';

export class UpdateFormationDto extends CreateFormationDto {
  @IsNumber()
  id: number;
}
