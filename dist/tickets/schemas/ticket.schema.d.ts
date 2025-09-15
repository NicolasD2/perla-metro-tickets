import { Document } from 'mongoose';
import { TicketType, TicketStatus } from '../Dto/create-ticket.dto';
export declare class Ticket extends Document {
    passengerId: string;
    date: Date;
    type: TicketType;
    status: TicketStatus;
    paid: number;
    deletedAt?: Date;
}
export declare const TicketSchema: import("mongoose").Schema<Ticket, import("mongoose").Model<Ticket, any, any, any, Document<unknown, any, Ticket, any, {}> & Ticket & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ticket, Document<unknown, {}, import("mongoose").FlatRecord<Ticket>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Ticket> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
