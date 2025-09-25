"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticket_schema_1 = require("../tickets/schemas/ticket.schema");
async function seed() {
    await (0, mongoose_1.connect)('mongodb+srv://perla_admin:2ak13p02@perla-metro-ticket-serv.jq2wzva.mongodb.net/perla-metro-tickets');
    const Ticket = (0, mongoose_1.model)('Ticket', ticket_schema_1.TicketSchema);
    await Ticket.deleteMany({});
    const userID1 = new mongoose_1.Types.ObjectId();
    const userID2 = new mongoose_1.Types.ObjectId();
    await Ticket.create([{
            passengerId: userID1,
            date: new Date(),
            type: 'single',
            status: 'active',
            paid: 10000,
        }, {
            passengerId: userID2,
            date: new Date(),
            type: 'return',
            status: 'used',
            paid: 5000,
        }]);
    console.log('Seeding completed');
    console.log('User IDs for testing:');
    console.log('User 1 ID:', userID1.toString());
    console.log('User 2 ID:', userID2.toString());
    process.exit(0);
}
seed();
//# sourceMappingURL=seeder.js.map