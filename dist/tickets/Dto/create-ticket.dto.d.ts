export declare enum TicketType {
    SINGLE = "ida",
    RETURN = "vuelta"
}
export declare enum TicketStatus {
    ACTIVE = "activo",
    USED = "usado",
    EXPIRED = "caducado"
}
export declare class CreateTicketDto {
    passengerId: string;
    date: string;
    type: TicketType;
    status: TicketStatus;
    paid: number;
}
