import { Ticket } from "../entities/ticket.entity";
import { CreateTicketDto } from "../Dto/create-ticket.dto";

export class TicketMapper {
    static fromDto(dto: CreateTicketDto): Ticket {
        const now = new Date().toISOString();
        return {
            id: Math.random().toString(36).substring(2, 10),
            passengerId: dto.passengerId,
            date: dto.date,
            type: dto.type,
            status: dto.status,
            paid: dto.paid,
            createdAt: new Date(now),
            updatedAt: new Date(now),
        };
    }

}