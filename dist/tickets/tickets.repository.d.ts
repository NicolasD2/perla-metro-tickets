import { Ticket } from "./entities/ticket.entity";
export declare class TicketsRepository {
    private tickets;
    create(ticket: Ticket): Ticket;
    findAll(): Ticket[];
    findById(id: string): Ticket | undefined;
}
