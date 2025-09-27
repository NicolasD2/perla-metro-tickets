import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./Dto/create-ticket.dto";
import { getPassengerName } from "./Util/ticket.util";
import { UpdateTicketDto } from "./Dto/update-ticket.dto";

@Injectable()
export class TicketsService {

  constructor(@InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>) {}
   
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    if(!['ida','vuelta'].includes(createTicketDto.type)) {
      throw new BadRequestException('Tipo de ticket inválido.');
    }
    if(!['activo','usado','caducado'].includes(createTicketDto.status)) {
      throw new BadRequestException('Estado de ticket inválido.');
    }
    if(typeof createTicketDto.paid !== 'number' || createTicketDto.paid <= 0) {
      throw new BadRequestException('El monto pagado debe ser un número positivo.');
    }

    const duplicate = await this.ticketModel.findOne({
      passengerId: createTicketDto.passengerId,
      date: createTicketDto.date,
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }]
    });
    if (duplicate) throw new BadRequestException('Ya existe un ticket para este pasajero en la misma fecha.');
    
    const ticket = new this.ticketModel({
      ...createTicketDto,
      passengerName: getPassengerName(createTicketDto.passengerId),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    });
    const savedTicket = await ticket.save();
    console.log('Ticket creado:', savedTicket);
    return savedTicket;

  }

   async findAll(isAdmin: boolean): Promise<Ticket[]> {
    if(!isAdmin) throw new ForbiddenException('Acceso denegado. Solo administradores pueden ver todos los tickets.');
 
    console.log('Buscando TODOS los tickets.');
    const allTickets = await this.ticketModel.find({}).exec();

    const activeTickets = await this.ticketModel.find({deletedAt: {$exists: false}}).exec();

    return this.ticketModel.find({$or:[{deletedAt: null},{deletedAt:{$exists: false}}]}).exec();
  }

   async findById(id: string): Promise<Partial<Ticket>> {

    if(!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de ticket inválido.');
    }
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket || ticket.deletedAt) throw new NotFoundException('Ticket no encontrado');
    const { status, ...rest } = ticket.toObject();
    return rest;
  }

  async update(id: string, dto: UpdateTicketDto): Promise<Ticket> {
    if(!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de ticket inválido.');
    }
    const ticket = await this.ticketModel.findById(id).exec();
    
    if (!ticket || ticket.deletedAt){
      throw new NotFoundException('Ticket no encontrado');
    } 
    
    if (dto.status && !['activo', 'usado', 'caducado'].includes(dto.status)) {
      throw new BadRequestException('Estado de ticket inválido.');
    }

    if(dto.type && !['ida', 'vuelta'].includes(dto.type)) {
      throw new BadRequestException('Tipo de ticket inválido.');
    }

    if(dto.paid !== undefined && (typeof dto.paid !== 'number' || dto.paid <= 0)) {
      throw new BadRequestException('El monto pagado debe ser un número positivo.');
    }

    if(dto.status === 'usado' && ticket.status === 'caducado') {
      throw new BadRequestException('No se puede cambiar el estado de un ticket caducado a usado.');
    }

    const existingTicket = await this.ticketModel.findOne({
      _id: id, $or: [
        { deletedAt: { $exists: false } },
        { deletedAt: null }
      ]
    }).exec();

    if (!existingTicket) {
      throw new NotFoundException('Ticket no encontrado o ya eliminado.');
    }

    if(dto.status== 'usado' && existingTicket.status === 'caducado') {
      throw new BadRequestException('No se puede cambiar el estado de un ticket caducado a usado.');
    }

    const updateData: any ={updatedAt: new Date()};
    if(dto.date !== undefined && dto.date !== null) updateData.date = dto.date;
    if(dto.status !== undefined && dto.status !== null) updateData.status = dto.status;
    if(dto.type !== undefined && dto.type !== null) updateData.type = dto.type;
    if(dto.paid !== undefined && dto.paid !== null) updateData.paid = dto.paid;

    const updatedTicket = await this.ticketModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: false }).exec();
    return updatedTicket!;

  }

  async softDelete(id: string, isAdmin: boolean): Promise<boolean> {
    if(!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de ticket inválido.');
    }
    if(!isAdmin) throw new ForbiddenException('Acceso denegado. Solo administradores pueden eliminar tickets.');
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket || ticket.deletedAt) throw new NotFoundException('Ticket no encontrado');
    ticket.deletedAt = new Date();
    ticket.status = 'caducado';
    await ticket.save();
    return true;
  }
}
