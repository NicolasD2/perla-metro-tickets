/**
 * Schema de MongoDB para la colección de tickets
 * 
 * @description Define la estructura de datos, validaciones, índices y 
 * configuraciones específicas para MongoDB usando Mongoose
 * 
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TicketType, TicketStatus } from '../Dto/create-ticket.dto';

/**
 * Schema de MongoDB para tickets
 * 
 * @class Ticket
 * @extends {Document}
 * @description Extiende Document de Mongoose para funcionalidades de MongoDB
 */
@Schema()
export class Ticket extends Document {
  /** ID único del pasajero - Campo requerido */
  @Prop({ required: true })
  passengerId: string;

  /** Nombre del pasajero - Campo opcional */
  @Prop({required: false})
  passengerName?: string;

  /** Fecha del ticket - Campo requerido */
  @Prop({ required: true })
  date: Date;

  /** Tipo de ticket con validación enum - Campo requerido */
  @Prop({ required: true, enum: TicketType })
  type: TicketType;

  /** Estado del ticket con validación enum - Campo requerido */
  @Prop({ required: true, enum: TicketStatus })
  status: TicketStatus;

  /** Monto pagado - Campo requerido */
  @Prop({ required: true })
  paid: number;

  /** Fecha de soft delete - Por defecto null */
  @Prop({ type: Date,default: null })
  deletedAt?: Date;
}

// Crear schema de Mongoose desde la clase
export const TicketSchema = SchemaFactory.createForClass(Ticket);

/**
 * Índice único compuesto para prevenir tickets duplicados
 * 
 * @description Evita que el mismo pasajero tenga múltiples tickets
 * del mismo tipo en la misma fecha (solo para tickets no eliminados)
 */
TicketSchema.index(
  { passengerId: 1, date: 1, type: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } },
);