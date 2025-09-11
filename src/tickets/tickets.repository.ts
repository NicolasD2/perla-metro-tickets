import { Ticket } from "./entities/ticket.entity";

export class TicketsRepository {
  private tickets: Ticket[] = [];

  create(ticket: Ticket): Ticket {
    this.tickets.push(ticket);
    return ticket;
  }

  findAll(): Ticket[] {
    return this.tickets;
  }
  findById(id: string): Ticket | undefined {  
    return this.tickets.find(ticket => ticket.id === id);
  }
}