import { IsDate, IsNumber, IsString } from 'class-validator';

export default class CreateFormationAvailabilityDto {
  @IsNumber()
  readonly formationId: number;

  @IsNumber()
  readonly place: number;

  @IsDate()
  readonly date: Date;

  @IsNumber()
  readonly leftPlaces: number;

  @IsString()
  readonly progendaLink: string;

  @IsString()
  readonly hour: string;

}