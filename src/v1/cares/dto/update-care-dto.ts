import CreateCareDto from './create-care.dto';
import { IsNumber } from 'class-validator';

export default class UpdateCareDto extends CreateCareDto {
  @IsNumber()
  id: number;
}