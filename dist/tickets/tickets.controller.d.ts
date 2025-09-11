import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './Dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { UpdateTicketDto } from './Dto/update-ticket.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto): Ticket;
    findAll(admin: string): Ticket[];
    findById(id: string): Partial<Ticket>;
    update(id: string, dto: UpdateTicketDto): Ticket;
    softDelete(id: string, admin: string): boolean;
}
