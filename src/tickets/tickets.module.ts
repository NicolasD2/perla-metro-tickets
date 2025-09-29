/**
 * Módulo de tickets para la aplicación NestJS
 * 
 * @description Configura y exporta todos los componentes relacionados con tickets:
 * controladores, servicios y schemas de MongoDB
 * 
 */

import { Module } from "@nestjs/common";
import{ TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Ticket, TicketSchema } from "./schemas/ticket.schema";

/**
 * Módulo que encapsula toda la funcionalidad de tickets
 * 
 * @class TicketsModule
 * @description Registra el schema de MongoDB, controlador y servicio de tickets
 */
@Module({
  imports: [
    // Registrar el schema de Ticket en MongoDB
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService], // Exportar servicio para uso en otros módulos
})
export class TicketsModule {}