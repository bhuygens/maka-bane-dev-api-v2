import { CreateFormationDto } from './create-formation.dto';
import { IsArray, IsNumber } from 'class-validator';

export class UpdateFormationDto extends CreateFormationDto {
  @IsNumber()
  id: number;

  @IsArray()
  updatedImages: string[];
}
