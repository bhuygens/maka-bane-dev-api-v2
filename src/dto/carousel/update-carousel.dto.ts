import { IsNumber } from 'class-validator';
import CreateCareDto from '../cares/create-care.dto';
import CreateCarouselDto from './create-carousel.dto';

export default class UpdateCarouselDto extends CreateCarouselDto {
  @IsNumber()
  id: number;
}
