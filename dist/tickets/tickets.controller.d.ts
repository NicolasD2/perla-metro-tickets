import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './Dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { UpdateTicketDto } from './Dto/update-ticket.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto): Promise<Ticket>;
    findAll(admin: string): Promise<Ticket[]>;
    findById(id: string): Promise<Partial<Ticket>>;
    update(id: string, dto: UpdateTicketDto): Promise<Ticket>;
    softDelete(id: string, admin: string): Promise<boolean>;
}
