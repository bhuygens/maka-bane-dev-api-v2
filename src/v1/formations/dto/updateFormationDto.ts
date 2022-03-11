import { CreateFormationDto } from './createFormationDto';
import { IsNumber } from 'class-validator';

export class UpdateFormationDto extends CreateFormationDto {
  @IsNumber()
  id: number;
}
