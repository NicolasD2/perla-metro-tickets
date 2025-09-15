import { Model } from "mongoose";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./Dto/create-ticket.dto";
import { UpdateTicketDto } from "./Dto/update-ticket.dto";
export declare class TicketsService {
    private readonly ticketModel;
    constructor(ticketModel: Model<Ticket>);
    create(createTicketDto: CreateTicketDto): Promise<Ticket>;
    findAll(isAdmin: boolean): Promise<Ticket[]>;
    findById(id: string): Promise<Partial<Ticket>>;
    update(id: string, dto: UpdateTicketDto): Promise<Ticket>;
    softDelete(id: string, isAdmin: boolean): Promise<boolean>;
}
