/**
 * Mapper para transformar DTOs en entidades de tickets
 * 
 * @description Convierte datos de entrada (DTOs) a entidades de dominio
 * con generación automática de IDs y timestamps
 * 
 */

import { Ticket } from "../entities/ticket.entity";
import { CreateTicketDto } from "../Dto/create-ticket.dto";

/**
 * Clase utilitaria para mapeo de datos
 * 
 * @class TicketMapper
 * @description Proporciona métodos estáticos para transformar DTOs a entidades
 */
export class TicketMapper {
    /**
     * Convierte un DTO de creación a una entidad Ticket
     * 
     * @static
     * @param {CreateTicketDto} dto - Datos de entrada validados
     * @returns {Ticket} Entidad ticket con ID generado
     * 
     * @example
     * const ticket = TicketMapper.fromDto(createTicketDto);
     */
    static fromDto(dto: CreateTicketDto): Ticket {
        const now = new Date().toISOString();
        return {
            // Generar ID aleatorio temporal (MongoDB asignará el real)
            id: Math.random().toString(36).substring(2, 10),
            passengerId: dto.passengerId,
            date: new Date(dto.date),
            type: dto.type,
            status: dto.status,
            paid: dto.paid,
        };
    }
}