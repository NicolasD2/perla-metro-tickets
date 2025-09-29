/**
 * Servicio de lógica de negocio para tickets
 * 
 * @description Implementa todas las operaciones CRUD con validaciones,
 * formateo de datos y control de permisos para tickets de metro
 * 
 * @author Nicolás
 */

import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./Dto/create-ticket.dto";
import { getPassengerName, formatTicketDate } from "./Util/ticket.util";
import { UpdateTicketDto } from "./Dto/update-ticket.dto";

@Injectable()
export class TicketsService {

  constructor(@InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>) {}
   
  /**
   * Formatea la respuesta de un ticket aplicando formato de fecha legible
   * 
   * @private
   * @param {any} ticket - Documento de ticket de MongoDB
   * @returns {any} Ticket con fecha formateada
   */
  private formatTicketResponse(ticket: any): any 
  {
    const ticketObj = ticket.toObject() ? ticket.toObject() : ticket;
    return {
      ...ticketObj,
      date: formatTicketDate(ticket.date),
    };
  }

  /**
   * Crea un nuevo ticket con validaciones de negocio
   * 
   * @param {CreateTicketDto} createTicketDto - Datos del ticket a crear
   * @returns {Promise<Ticket>} Ticket creado y formateado
   * @throws {BadRequestException} Si los datos son inválidos o existe duplicado
   */
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
    return this.formatTicketResponse(savedTicket);

  }

  /**
   * Obtiene todos los tickets activos (solo administradores)
   * 
   * @param {boolean} isAdmin - Indica si el usuario es administrador
   * @returns {Promise<Ticket[]>} Lista de tickets formateados
   * @throws {ForbiddenException} Si no es administrador
   */
   async findAll(isAdmin: boolean): Promise<Ticket[]> {
    if(!isAdmin) throw new ForbiddenException('Acceso denegado. Solo administradores pueden ver todos los tickets.');
 
    console.log('Buscando TODOS los tickets.');
    const tickets = await this.ticketModel.find({$or:[{deletedAt: null},{deletedAt:{$exists: false}}]}).exec();

    return tickets.map(ticket => this.formatTicketResponse(ticket));
  }

  /**
   * Busca un ticket por ID y excluye el campo status
   * 
   * @param {string} id - ID del ticket
   * @returns {Promise<Partial<Ticket>>} Ticket encontrado sin campo status
   * @throws {BadRequestException} Si el ID no es válido
   * @throws {NotFoundException} Si el ticket no existe o está eliminado
   */
   async findById(id: string): Promise<Partial<Ticket>> {

    if(!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de ticket inválido.');
    }
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket || ticket.deletedAt) throw new NotFoundException('Ticket no encontrado');
    const formattedTicket = this.formatTicketResponse(ticket);
    const { status, ...rest } = formattedTicket;
    return rest;
  }

  /**
   * Actualiza un ticket existente con validaciones
   * 
   * @param {string} id - ID del ticket a actualizar
   * @param {UpdateTicketDto} dto - Datos a actualizar
   * @returns {Promise<Ticket>} Ticket actualizado
   * @throws {BadRequestException} Si los datos son inválidos
   * @throws {NotFoundException} Si el ticket no existe
   */
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
    return this.formatTicketResponse(updatedTicket!);

  }

  /**
   * Elimina un ticket usando soft delete (solo administradores)
   * 
   * @param {string} id - ID del ticket a eliminar
   * @param {boolean} isAdmin - Indica si el usuario es administrador
   * @returns {Promise<boolean>} true si la eliminación fue exitosa
   * @throws {BadRequestException} Si el ID no es válido
   * @throws {ForbiddenException} Si no es administrador
   * @throws {NotFoundException} Si el ticket no existe
   */
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