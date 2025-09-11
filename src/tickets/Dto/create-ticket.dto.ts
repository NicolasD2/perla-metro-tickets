import { IsEnum, IsString, IsDateString, IsNumber } from 'class-validator';

export enum TicketType {
  SINGLE = 'single',
  RETURN = 'return',
}

export enum TicketStatus {
  ACTIVE = 'active',
  USED = 'used',
  EXPIRED = 'expired',
}

export class CreateTicketDto {
  @IsString()
  passengerId: string;

  @IsDateString()
  date: string;

  @IsEnum(TicketType)
  type: TicketType;

  @IsEnum(TicketStatus)
  status: TicketStatus;

  @IsNumber()
  paid: number;
}
