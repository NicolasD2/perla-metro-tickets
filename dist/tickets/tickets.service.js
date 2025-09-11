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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const tickets_repository_1 = require("./tickets.repository");
const ticket_util_1 = require("./Util/ticket.util");
let TicketsService = class TicketsService {
    ticketsRepository;
    constructor(ticketsRepository) {
        this.ticketsRepository = ticketsRepository;
    }
    create(createTicketDto) {
        if (this.ticketsRepository.findDuplicate(createTicketDto.passengerId, createTicketDto.date)) {
            throw new Error('Ya existe un ticket para este pasajero en la misma fecha.');
        }
        const now = new Date().toISOString();
        const ticket = { id: Math.random().toString(36).substring(2, 10),
            passengerId: createTicketDto.passengerId,
            passengerName: (0, ticket_util_1.getPassengerName)(createTicketDto.passengerId),
            date: createTicketDto.date,
            type: createTicketDto.type,
            status: createTicketDto.status,
            paid: createTicketDto.paid,
            createdAt: new Date(now),
            updatedAt: new Date(now)
        };
        return this.ticketsRepository.create(ticket);
    }
    findAll(isAdmin) {
        if (!isAdmin)
            throw new common_1.ForbiddenException('Acceso denegado. Solo administradores pueden ver todos los tickets.');
        return this.ticketsRepository.findAll().map(t => ({
            id: t.id,
            passengerId: t.passengerId,
            passengerName: t.passengerName,
            date: t.date,
            type: t.type,
            status: t.status,
            paid: t.paid,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
            deletedAt: t.deletedAt
        }));
    }
    findById(id) {
        const ticket = this.ticketsRepository.findById(id);
        if (!ticket)
            throw new common_1.NotFoundException('Ticket no encontrado');
        const { status, ...rest } = ticket;
        return rest;
    }
    update(id, dto) {
        const ticket = this.ticketsRepository.findById(id);
        if (!ticket)
            throw new common_1.NotFoundException('Ticket no encontrado');
        if (dto.status == 'active' && ticket.status === 'inactive') {
            throw new common_1.BadRequestException('No se puede reactivar un ticket inactivo.');
        }
        const update = {};
        if (dto.status && ['active', 'used', 'expied'].includes(dto.status))
            update.status = dto.status;
        if (dto.type)
            update.type = dto.type;
        if (dto.date)
            update.date = dto.date;
        if (dto.paid !== undefined)
            update.paid = dto.paid;
        const updated = this.ticketsRepository.update(id, update);
        if (!updated)
            throw new common_1.NotFoundException('Error al actualizar el ticket');
        return updated;
    }
    softDelete(id, isAdmin) {
        if (!isAdmin)
            throw new common_1.ForbiddenException('Acceso denegado. Solo administradores pueden eliminar tickets.');
        return this.ticketsRepository.softDelete(id);
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tickets_repository_1.TicketsRepository])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map