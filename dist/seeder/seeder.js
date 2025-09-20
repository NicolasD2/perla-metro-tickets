"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticket_schema_1 = require("../tickets/schemas/ticket.schema");
async function seed() {
    await (0, mongoose_1.connect)('mongodb://localhost/perla-metro-tickets');
    const Ticket = (0, mongoose_1.model)('Ticket', ticket_schema_1.TicketSchema);
    await Ticket.deleteMany({});
    await Ticket.create([{
            passengerId: 'passenger1',
            date: new Date(),
            type: 'single',
            status: 'active',
            paid: 10000,
            deletedAt: null,
        }, {
            passengerId: 'passenger2',
            date: new Date(),
            type: 'return',
            status: 'used',
            paid: 5000,
            deletedAt: null,
        }]);
    console.log('Seeding completed');
    process.exit(0);
}
seed();
//# sourceMappingURL=seeder.js.map