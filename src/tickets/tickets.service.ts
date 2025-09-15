import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./Dto/create-ticket.dto";
import { getPassengerName } from "./Util/ticket.util";
import { UpdateTicketDto } from "./Dto/update-ticket.dto";

@Injectable()
export class TicketsService {
  
  constructor(@InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>) {}
   
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const duplicate = await this.ticketModel.findOne({
      passengerId: createTicketDto.passengerId,
      date: createTicketDto.date,
      deletedAt: {$exists: false}
    });
    if (duplicate) throw new BadRequestException('Ya existe un ticket para este pasajero en la misma fecha.');
    
    const ticket = new this.ticketModel({
      ...createTicketDto,
      passengerName: getPassengerName(createTicketDto.passengerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return ticket.save();

  }

   async findAll(isAdmin: boolean): Promise<Ticket[]> {
    if(!isAdmin) throw new ForbiddenException('Acceso denegado. Solo administradores pueden ver todos los tickets.');
    return this.ticketModel.find({deletedAt: {$exists: false}}).exec();
  }

   async findById(id: string): Promise<Partial<Ticket>> {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket || ticket.deletedAt) throw new NotFoundException('Ticket no encontrado');
    const { status, ...rest } = ticket.toObject();
    return rest;
  }

  async update(id: string, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket || ticket.deletedAt) throw new NotFoundException('Ticket no encontrado');
    
    if (dto.status && !['active', 'used', 'expired'].includes(dto.status)) {
      throw new BadRequestException('Estado de ticket inválido.');
    }
    Object.assign(ticket, dto, { updatedAt: new Date() });
    return ticket.save();

  }

  async softDelete(id: string, isAdmin: boolean): Promise<boolean> {
    if(!isAdmin) throw new ForbiddenException('Acceso denegado. Solo administradores pueden eliminar tickets.');
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket || ticket.deletedAt) throw new NotFoundException('Ticket no encontrado');
    ticket.deletedAt = new Date();
    ticket.status = 'expired';
    await ticket.save();
    return true;
  }
}
