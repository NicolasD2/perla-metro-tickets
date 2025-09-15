"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMapper = void 0;
class TicketMapper {
    static fromDto(dto) {
        const now = new Date().toISOString();
        return {
            id: Math.random().toString(36).substring(2, 10),
            passengerId: dto.passengerId,
            date: new Date(dto.date),
            type: dto.type,
            status: dto.status,
            paid: dto.paid,
            createdAt: new Date(now),
            updatedAt: new Date(now),
        };
    }
}
exports.TicketMapper = TicketMapper;
//# sourceMappingURL=ticket.mapper.js.map