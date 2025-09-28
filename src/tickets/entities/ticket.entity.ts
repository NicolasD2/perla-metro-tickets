export class Ticket {
  id: string;
  passengerId: string;
  passengerName?: string; 
  date: Date;
  type: String;
  status: String;
  paid: number;
  deletedAt?: Date;
}