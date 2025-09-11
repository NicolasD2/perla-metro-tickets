import { Injectable } from "@nestjs/common";
import { TicketsRepository } from "./tickets.repository";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./Dto/create-ticket.dto";

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository) {}
   create(createTicketDto: CreateTicketDto): Ticket {
    const now = new Date().toISOString();
    const ticket: Ticket = { id: Date.now().toString(),
        passengerId: createTicketDto.passengerId,
        date: createTicketDto.date,
        type: createTicketDto.type,
        status: createTicketDto.status,
        paid: createTicketDto.paid,
        createdAt: new Date(now),
        updatedAt: new Date(now)
    };
    return this.ticketsRepository.create(ticket);
  }
   findAll(): Ticket[] {
    return this.ticketsRepository.findAll();
    }
   findById(id: string): Ticket | undefined {
    return this.ticketsRepository.findById(id);
    }
}
