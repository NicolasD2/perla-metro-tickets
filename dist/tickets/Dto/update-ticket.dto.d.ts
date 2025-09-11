import { TicketType, TicketStatus } from './create-ticket.dto';
export declare class UpdateTicketDto {
    passengerId?: string;
    date?: string;
    type?: TicketType;
    status?: TicketStatus;
    paid?: number;
}
