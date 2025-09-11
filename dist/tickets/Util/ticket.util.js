"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTicketId = generateTicketId;
function generateTicketId() {
    return Math.random().toString(36).substr(2, 10);
}
//# sourceMappingURL=ticket.util.js.map