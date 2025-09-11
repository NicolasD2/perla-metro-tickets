"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTicketId = generateTicketId;
exports.getPassengerName = getPassengerName;
function generateTicketId() {
    return Math.random().toString(36).substr(2, 10);
}
function getPassengerName(passengerId) {
    const names = {
        '123': 'Juan Pérez',
        '456': 'Ana Gómez',
        '789': 'Luis Torres',
    };
    return names[passengerId] || 'Desconocido';
}
//# sourceMappingURL=ticket.util.js.map