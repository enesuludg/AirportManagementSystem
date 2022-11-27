import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAirplaneDto {
  @IsString()
  public name: string;
  @IsString()
  public factorySerialNumber: string;
  @IsNumber()
  public airCompany: number;
  @IsOptional()
  @IsString()
  public flightDistance: string;
  @IsOptional()
  @IsString()
  public fuelCapacity: string;
  @IsOptional()
  @IsString()
  public type: string;
}
export class MoveAirplaneDto {
  @IsNumber()
  public airCompany: number;
}
