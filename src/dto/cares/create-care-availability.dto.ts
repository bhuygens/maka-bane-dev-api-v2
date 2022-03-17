import { IsDate, IsNumber, IsString } from 'class-validator';

export default class CreateCareAvailabilityDto {
  @IsNumber()
  readonly careId: number;

  @IsNumber()
  readonly place: number;

  @IsDate()
  readonly date: Date;

  @IsNumber()
  readonly leftPlaces: number;

  @IsString()
  readonly progendaLink: string;
}
