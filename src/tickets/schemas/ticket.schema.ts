import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TicketType, TicketStatus } from '../Dto/create-ticket.dto';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  passengerId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: TicketType })
  type: TicketType;

  @Prop({ required: true, enum: TicketStatus })
  status: TicketStatus;

  @Prop({ required: true })
  paid: number;

  @Prop({ type: Date,default: null })
  deletedAt?: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

TicketSchema.index(
  { passengerId: 1, date: 1, type: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } },
);
