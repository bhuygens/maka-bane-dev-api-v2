import { IsDate, IsString } from 'class-validator';

export class GoogleAnalyticsDto {
  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  dimensionMode: string;

  @IsString()
  metricsMode: string;
}
