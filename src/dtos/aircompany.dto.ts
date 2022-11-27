import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateAirplaneDto {
  @IsString()
  public name: string;
  @IsOptional()
  @IsString()
  public companyType: string;
  @IsOptional()
  @IsDateString()
  public foundedAt: Date;
}
