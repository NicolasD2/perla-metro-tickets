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
}
exports.TicketsRepository = TicketsRepository;
//# sourceMappingURL=tickets.repository.js.map