import { Ticket } from "../entities/ticket.entity";
import { CreateTicketDto } from "../Dto/create-ticket.dto";
export declare class TicketMapper {
    static fromDto(dto: CreateTicketDto): Ticket;
}
