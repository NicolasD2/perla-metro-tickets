import { IsEnum, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { TicketType, TicketStatus } from './create-ticket.dto';

export class UpdateTicketDto {
  @IsOptional()
  @IsString()
  passengerId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(TicketType)
  type?: TicketType;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsNumber()
  paid?: number;
}