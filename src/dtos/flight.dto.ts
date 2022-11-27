import { STATUS } from '@/interfaces/flight.interface';
import { IsString, IsEnum, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateFlightDto {
  @IsOptional()
  @IsEnum(STATUS)
  public status: string;
  @IsNumber()
  public airCompany: number;
  @IsNumber()
  public airPlane: number;
  @IsOptional()
  @IsString()
  public departureCountry: string;
  @IsOptional()
  @IsString()
  public destinationCountry: string;
  @IsOptional()
  @IsString()
  public distance: string;
  @IsOptional()
  @IsDateString()
  public estimatedFlightTime: number;
  @IsOptional()
  @IsDateString()
  public startedAt: Date;
  @IsOptional()
  @IsDateString()
  public endAt: Date;
  @IsOptional()
  @IsDateString()
  public delayStartedAt: Date;
}

export class FlightByStatustDto {
  @IsEnum(STATUS)
  public status: string;
  @IsNumber()
  public airCompany: number;
}
export class FlightStatustDto {
  @IsEnum(STATUS)
  public status: string;
  @IsNumber()
  public flightId: number;
}
