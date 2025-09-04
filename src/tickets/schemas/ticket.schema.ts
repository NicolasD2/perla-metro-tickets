import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TicketType, TicketStatus } from '../Dto/create-ticket.dto';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  passengerId: string;

  @Prop({ required: true })
  Date: Date;

  @Prop({ required: true, enum: TicketType })
  type: TicketType;

  @Prop({ required: true, enum: TicketStatus })
  status: TicketStatus;

  @Prop({ required: true })
  paid: number;

  @Prop({ default: null })
  deletedAt: Date | null;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

TicketSchema.index(
  { passengerId: 1, Date: 1, type: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } },
);
