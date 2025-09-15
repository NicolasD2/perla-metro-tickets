import {connect, model} from 'mongoose';
import { TicketSchema } from 'src/tickets/schemas/ticket.schema';

async function seed() {
    await connect('mongodb://localhost/perla-metro-tickets');
    
    const Ticket = model('Ticket', TicketSchema);

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

