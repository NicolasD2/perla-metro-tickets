import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './Dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto): Ticket;
    findAll(): Ticket[];
    findById(id: string): Ticket | undefined;
}
