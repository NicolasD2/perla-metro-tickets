"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_util_1 = require("./Util/ticket.util");
let TicketsService = class TicketsService {
    ticketModel;
    constructor(ticketModel) {
        this.ticketModel = ticketModel;
    }
    async create(createTicketDto) {
        if (!['ida', 'vuelta'].includes(createTicketDto.type)) {
            throw new common_1.BadRequestException('Tipo de ticket inválido.');
        }
        if (!['activo', 'usado', 'caducado'].includes(createTicketDto.status)) {
            throw new common_1.BadRequestException('Estado de ticket inválido.');
        }
        if (typeof createTicketDto.paid !== 'number' || createTicketDto.paid <= 0) {
            throw new common_1.BadRequestException('El monto pagado debe ser un número positivo.');
        }
        const duplicate = await this.ticketModel.findOne({
            passengerId: createTicketDto.passengerId,
            date: createTicketDto.date,
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }]
        });
        if (duplicate)
            throw new common_1.BadRequestException('Ya existe un ticket para este pasajero en la misma fecha.');
        const ticket = new this.ticketModel({
            ...createTicketDto,
            passengerName: (0, ticket_util_1.getPassengerName)(createTicketDto.passengerId),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        });
        const savedTicket = await ticket.save();
        console.log('Ticket creado:', savedTicket);
        return savedTicket;
    }
    async findAll(isAdmin) {
        if (!isAdmin)
            throw new common_1.ForbiddenException('Acceso denegado. Solo administradores pueden ver todos los tickets.');
        console.log('Buscando TODOS los tickets.');
        const allTickets = await this.ticketModel.find({}).exec();
        console.log('Total tickets en BD:', allTickets.length);
        console.log('Tickets encontrados:', allTickets);
        console.log('Aplicando filtro deletedAt...');
        const activeTickets = await this.ticketModel.find({ deletedAt: { $exists: false } }).exec();
        console.log('Tickets activos:', activeTickets.length);
        console.log('Tickets activos data:', activeTickets);
        return this.ticketModel.find({ $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] }).exec();
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('ID de ticket inválido.');
        }
        const ticket = await this.ticketModel.findById(id).exec();
        if (!ticket || ticket.deletedAt)
            throw new common_1.NotFoundException('Ticket no encontrado');
        const { status, ...rest } = ticket.toObject();
        return rest;
    }
    async update(id, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('ID de ticket inválido.');
        }
        const ticket = await this.ticketModel.findById(id).exec();
        if (!ticket || ticket.deletedAt) {
            throw new common_1.NotFoundException('Ticket no encontrado');
        }
        if (dto.status && !['activo', 'usado', 'caducado'].includes(dto.status)) {
            throw new common_1.BadRequestException('Estado de ticket inválido.');
        }
        if (dto.type && !['ida', 'vuelta'].includes(dto.type)) {
            throw new common_1.BadRequestException('Tipo de ticket inválido.');
        }
        if (dto.paid !== undefined && (typeof dto.paid !== 'number' || dto.paid <= 0)) {
            throw new common_1.BadRequestException('El monto pagado debe ser un número positivo.');
        }
        if (dto.status === 'usado' && ticket.status === 'caducado') {
            throw new common_1.BadRequestException('No se puede cambiar el estado de un ticket caducado a usado.');
        }
        const existingTicket = await this.ticketModel.findOne({
            _id: id, $or: [
                { deletedAt: { $exists: false } },
                { deletedAt: null }
            ]
        }).exec();
        if (!existingTicket) {
            throw new common_1.NotFoundException('Ticket no encontrado o ya eliminado.');
        }
        if (dto.status == 'usado' && existingTicket.status === 'caducado') {
            throw new common_1.BadRequestException('No se puede cambiar el estado de un ticket caducado a usado.');
        }
        const updateData = { updatedAt: new Date() };
        if (dto.date !== undefined && dto.date !== null)
            updateData.date = dto.date;
        if (dto.status !== undefined && dto.status !== null)
            updateData.status = dto.status;
        if (dto.type !== undefined && dto.type !== null)
            updateData.type = dto.type;
        if (dto.paid !== undefined && dto.paid !== null)
            updateData.paid = dto.paid;
        const updatedTicket = await this.ticketModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: false }).exec();
        return updatedTicket;
    }
    async softDelete(id, isAdmin) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('ID de ticket inválido.');
        }
        if (!isAdmin)
            throw new common_1.ForbiddenException('Acceso denegado. Solo administradores pueden eliminar tickets.');
        const ticket = await this.ticketModel.findById(id).exec();
        if (!ticket || ticket.deletedAt)
            throw new common_1.NotFoundException('Ticket no encontrado');
        ticket.deletedAt = new Date();
        ticket.status = 'caducado';
        await ticket.save();
        return true;
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ticket_entity_1.Ticket.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map