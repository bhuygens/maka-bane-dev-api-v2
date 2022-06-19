import { IsDate, IsOptional, IsString } from 'class-validator';

export class GoogleAnalyticsDto {
  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;

  @IsString()
  dimensionMode: string;

  @IsString()
  metricsMode: string;
}
