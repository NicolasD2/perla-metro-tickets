/**
 * DTO para la creación de tickets de metro
 * 
 * @description Define la estructura y validaciones para crear nuevos tickets.
 * Incluye validaciones automáticas con class-validator.
 * 
 */

import { IsEnum, IsString, IsDateString, IsNumber } from 'class-validator';

/**
 * Enum para los tipos de ticket disponibles
 */
export enum TicketType {
  /** Ticket de ida */
  SINGLE = 'ida',
  /** Ticket de vuelta */
  RETURN = 'vuelta',
}

/**
 * Enum para los estados posibles de un ticket
 */
export enum TicketStatus {
  /** Ticket activo y disponible para uso */
  ACTIVE = 'activo',
  /** Ticket ya utilizado */
  USED = 'usado',
  /** Ticket caducado o vencido */
  EXPIRED = 'caducado',
}

/**
 * DTO para crear un nuevo ticket
 * 
 * @class CreateTicketDto
 * @description Valida los datos de entrada para la creación de tickets
 */
export class CreateTicketDto {
  /**
   * ID único del pasajero (UUID V4)
   * @type {string}
   */
  @IsString()
  passengerId: string;

  /**
   * Fecha del ticket en formato ISO string
   * @type {string}
   * @example "2024-09-28T15:30:00.000Z"
   */
  @IsDateString()
  date: string;

  /**
   * Tipo de ticket
   * @type {TicketType}
   */
  @IsEnum(TicketType)
  type: TicketType;

  /**
   * Estado actual del ticket
   * @type {TicketStatus}
   */
  @IsEnum(TicketStatus)
  status: TicketStatus;

  /**
   * Monto pagado por el ticket en pesos
   * @type {number}
   */
  @IsNumber()
  paid: number;
}