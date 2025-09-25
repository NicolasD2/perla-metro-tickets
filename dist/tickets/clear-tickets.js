"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticket_entity_1 = require("./entities/ticket.entity");
const mongoose_2 = require("mongoose");
const ticket_schema_1 = require("./schemas/ticket.schema");
async function clearTickets() {
    try {
        console.log('Conectando a MongoDB...');
        await (0, mongoose_1.connect)('mongodb+srv://perla_admin:2ak13p02@perla-metro-ticket-serv.jq2wzva.mongodb.net/');
        const TicketModel = (0, mongoose_2.model)(ticket_entity_1.Ticket.name, ticket_schema_1.TicketSchema);
        console.log('Limpiando tickets...');
        const result = await TicketModel.deleteMany({});
        console.log(`${result.deletedCount} tickets eliminados`);
    }
    catch (error) {
        console.error('Error al limpiar tickets:', error);
    }
    finally {
        await (0, mongoose_1.disconnect)();
        console.log('Conexión cerrada');
    }
}
clearTickets();
//# sourceMappingURL=clear-tickets.js.map