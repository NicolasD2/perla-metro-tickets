"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsRepository = void 0;
class TicketsRepository {
    tickets = [];
    create(ticket) {
        this.tickets.push(ticket);
        return ticket;
    }
    findAll() {
        return this.tickets;
    }
    findById(id) {
        return this.tickets.find(ticket => ticket.id === id);
    }
    findDuplicate(passengerId, date) {
        return this.tickets.find(ticket => ticket.passengerId === passengerId && ticket.date === date);
    }
    update(id, updatedFields) {
        const ticket = this.findById(id);
        if (ticket) {
            Object.assign(ticket, updatedFields, { updatedAt: new Date() });
            return ticket;
        }
        return undefined;
    }
    softDelete(id) {
        const ticket = this.tickets.find(t => t.id === id && !t.deletedAt);
        if (ticket) {
            ticket.deletedAt = new Date().toISOString();
            ticket.status = 'inactive';
            return true;
        }
        return false;
    }
}
exports.TicketsRepository = TicketsRepository;
//# sourceMappingURL=tickets.repository.js.map