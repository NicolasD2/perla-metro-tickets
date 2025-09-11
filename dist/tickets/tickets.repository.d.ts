import { Ticket } from "./entities/ticket.entity";
export declare class TicketsRepository {
    private tickets;
    create(ticket: Ticket): Ticket;
    findAll(): Ticket[];
    findById(id: string): Ticket | undefined;
    findDuplicate(passengerId: string, date: string): Ticket | undefined;
    update(id: string, updatedFields: Partial<Ticket>): Ticket | undefined;
    softDelete(id: string): boolean;
}
