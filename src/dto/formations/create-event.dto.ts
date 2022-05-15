import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {

  @IsNumber()
  formationId: number;
  @IsDate()
  date: Date;
  @IsString()
  hour: string;
  @IsNumber()
  leftPlaces: number;
}
