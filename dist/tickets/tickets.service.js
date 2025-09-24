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
        if (!['single', 'return'].includes(createTicketDto.type)) {
            throw new common_1.BadRequestException('Tipo de ticket inválido.');
        }
        if (!['active', 'used', 'expired'].includes(createTicketDto.status)) {
            throw new common_1.BadRequestException('Estado de ticket inválido.');
        }
        if (typeof createTicketDto.paid !== 'number' || createTicketDto.paid <= 0) {
            throw new common_1.BadRequestException('El monto pagado debe ser un número positivo.');
        }
        const duplicate = await this.ticketModel.findOne({
            passengerId: createTicketDto.passengerId,
            date: createTicketDto.date,
            deletedAt: { $exists: false }
        });
        if (duplicate)
            throw new common_1.BadRequestException('Ya existe un ticket para este pasajero en la misma fecha.');
        const ticket = new this.ticketModel({
            ...createTicketDto,
            passengerName: (0, ticket_util_1.getPassengerName)(createTicketDto.passengerId),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return ticket.save();
    }
    async findAll(isAdmin) {
        if (!isAdmin)
            throw new common_1.ForbiddenException('Acceso denegado. Solo administradores pueden ver todos los tickets.');
        return this.ticketModel.find({ deletedAt: { $exists: false } }).exec();
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
        if (dto.status && !['active', 'used', 'expired'].includes(dto.status)) {
            throw new common_1.BadRequestException('Estado de ticket inválido.');
        }
        if (dto.type && !['single', 'return'].includes(dto.type)) {
            throw new common_1.BadRequestException('Tipo de ticket inválido.');
        }
        if (dto.paid !== undefined && (typeof dto.paid !== 'number' || dto.paid <= 0)) {
            throw new common_1.BadRequestException('El monto pagado debe ser un número positivo.');
        }
        if (dto.status === 'used' && ticket.status === 'expired') {
            throw new common_1.BadRequestException('No se puede cambiar el estado de un ticket expirado a usado.');
        }
        Object.assign(ticket, dto, { updatedAt: new Date() });
        return ticket.save();
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
        ticket.status = 'expired';
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