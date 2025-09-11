import { TicketsRepository } from "./tickets.repository";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./Dto/create-ticket.dto";
export declare class TicketsService {
    private readonly ticketsRepository;
    constructor(ticketsRepository: TicketsRepository);
    create(createTicketDto: CreateTicketDto): Ticket;
    findAll(): Ticket[];
    findById(id: string): Ticket | undefined;
}
