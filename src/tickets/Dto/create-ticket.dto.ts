import { IsEnum, IsString, IsDateString, IsNumber } from 'class-validator';

export enum TicketType {
  SINGLE = 'ida',
  RETURN = 'vuelta',
}

export enum TicketStatus {
  ACTIVE = 'activo',
  USED = 'usado',
  EXPIRED = 'caducado',
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
