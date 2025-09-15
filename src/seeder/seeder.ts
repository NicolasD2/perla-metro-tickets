import {connect, model} from 'mongoose';
import { TicketSchema } from 'src/tickets/schemas/ticket.schema';

async function seed() {
    await connect('mongodb://localhost/perla-metro-tickets');
    
    const Ticket = model('Ticket', TicketSchema);

    await Ticket.deleteMany({});

    await Ticket.create([{
        passengerId: 'passenger1',
        date: new Date(),
        type: 'adult',
        status: 'active',
        paid: 100,
        deletedAt: null,
    }, {
        passengerId: 'passenger2',
        date: new Date(),
        type: 'child',
        status: 'active',
        paid: 50,
        deletedAt: null,
    }]);
    console.log('Seeding completed');
    process.exit(0);
}
seed();

// To run the seeder, use the command:
// npx ts-node src/seeder.ts
// Make sure you have ts-node installed as a dev dependency.