import { TicketsRepository } from "./tickets.repository";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./Dto/create-ticket.dto";
import { UpdateTicketDto } from "./Dto/update-ticket.dto";
export declare class TicketsService {
    private readonly ticketsRepository;
    constructor(ticketsRepository: TicketsRepository);
    create(createTicketDto: CreateTicketDto): Ticket;
    findAll(isAdmin: boolean): Ticket[];
    findById(id: string): Partial<Ticket>;
    update(id: string, dto: UpdateTicketDto): Ticket;
    softDelete(id: string, isAdmin: boolean): boolean;
}
