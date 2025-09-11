import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { TicketsRepository } from "./tickets.repository";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./Dto/create-ticket.dto";
import { getPassengerName } from "./Util/ticket.util";
import { UpdateTicketDto } from "./Dto/update-ticket.dto";
@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository) {}
   create(createTicketDto: CreateTicketDto): Ticket {
    if (this.ticketsRepository.findDuplicate(createTicketDto.passengerId, createTicketDto.date)) {
      throw new Error('Ya existe un ticket para este pasajero en la misma fecha.');
    }
    const now = new Date().toISOString();
    const ticket: Ticket = { id: Math.random().toString(36).substring(2, 10),
        passengerId: createTicketDto.passengerId,
        passengerName: getPassengerName(createTicketDto.passengerId),
        date: createTicketDto.date,
        type: createTicketDto.type,
        status: createTicketDto.status,
        paid: createTicketDto.paid,
        createdAt: new Date(now),
        updatedAt: new Date(now)
    };
    return this.ticketsRepository.create(ticket);
  }
   findAll(isAdmin: boolean): Ticket[] {
    if(!isAdmin) throw new ForbiddenException('Acceso denegado. Solo administradores pueden ver todos los tickets.');
    return this.ticketsRepository.findAll().map(t =>({
        id: t.id,
        passengerId: t.passengerId,
        passengerName: t.passengerName,
        date: t.date,
        type: t.type,
        status: t.status,
        paid: t.paid,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        deletedAt: t.deletedAt
    }));
  }

   findById(id: string): Partial<Ticket> {
    const ticket = this.ticketsRepository.findById(id);
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    const { status, ...rest } = ticket;
    return rest;
  }

  update(id: string, dto: UpdateTicketDto): Ticket {
    const ticket = this.ticketsRepository.findById(id);
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    
    if (dto.status == 'active' && ticket.status === 'inactive') {
      throw new BadRequestException('No se puede reactivar un ticket inactivo.');
    }

    const update: Partial<Ticket> = {};
    if(dto.status && ['active', 'used', 'expied'].includes(dto.status)) update.status= dto.status; 
    if(dto.type) update.type= dto.type;
    if(dto.date) update.date= dto.date;
    if(dto.paid !== undefined) update.paid= dto.paid;

    const updated = this.ticketsRepository.update(id, update);
    if (!updated) throw new NotFoundException('Error al actualizar el ticket');
    return updated;
  }
  softDelete(id: string, isAdmin: boolean): boolean {
    if(!isAdmin) throw new ForbiddenException('Acceso denegado. Solo administradores pueden eliminar tickets.');
    return this.ticketsRepository.softDelete(id);
  }
}
