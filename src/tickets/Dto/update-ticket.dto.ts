/**
 * DTO para la actualización de tickets de metro
 * 
 * @description Define la estructura y validaciones para actualizar tickets existentes.
 * Todos los campos son opcionales para permitir actualizaciones parciales.
 * 
 */

import { IsEnum, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { TicketType, TicketStatus } from './create-ticket.dto';

/**
 * DTO para actualizar un ticket existente
 * 
 * @class UpdateTicketDto
 * @description Permite actualizar campos específicos de un ticket sin afectar los demás
 */
export class UpdateTicketDto {
  /**
   * ID único del pasajero (UUID V4) - Opcional
   * @type {string}
   * @optional
   */
  @IsOptional()
  @IsString()
  passengerId?: string;

  /**
   * Fecha del ticket en formato ISO string - Opcional
   * @type {string}
   * @optional
   * @example "2024-09-28T15:30:00.000Z"
   */
  @IsOptional()
  @IsDateString()
  date?: string;

  /**
   * Tipo de ticket - Opcional
   * @type {TicketType}
   * @optional
   */
  @IsOptional()
  @IsEnum(TicketType)
  type?: TicketType;

  /**
   * Estado actual del ticket - Opcional
   * @type {TicketStatus}
   * @optional
   */
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  /**
   * Monto pagado por el ticket en pesos - Opcional
   * @type {number}
   * @optional
   */
  @IsOptional()
  @IsNumber()
  paid?: number;
}