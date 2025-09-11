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
  findDuplicate(passengerId: string, date: string): Ticket | undefined {  
    return this.tickets.find(ticket => ticket.passengerId === passengerId && ticket.date === date);
  }
  update(id: string, updatedFields: Partial<Ticket>): Ticket | undefined {
   const ticket = this.findById(id);
   if (ticket) {
    Object.assign(ticket, updatedFields, { updatedAt: new Date() });
    return ticket;
   }
    return undefined;
  }
  softDelete(id: string): boolean {
    const ticket = this.tickets.find(t => t.id === id && !t.deletedAt);
    if (ticket) {
      ticket.deletedAt = new Date().toISOString();
      ticket.status = 'inactive';
      return true;
    }
    return false;
  }
}