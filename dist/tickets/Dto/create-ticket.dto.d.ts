export declare enum TicketType {
    SINGLE = "single",
    RETURN = "return"
}
export declare enum TicketStatus {
    ACTIVE = "active",
    USED = "used",
    EXPIRED = "expired"
}
export declare class CreateTicketDto {
    passengerId: string;
    date: string;
    type: TicketType;
    status: TicketStatus;
    paid: number;
}
