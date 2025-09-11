import { Ticket } from "../entities/ticket.entity";
import { CreateTicketDto } from "../Dto/create-ticket.dto";

export class TicketMapper {
    static fromDto(dto: CreateTicketDto): Ticket {
        return {
            id: Date.now().toString(),
            passengerId: dto.passengerId,
            date: dto.Date,
            type: dto.type,
            status: dto.status,
            paid: dto.paid,
        };
    }

}