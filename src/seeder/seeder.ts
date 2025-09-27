import {connect, model, Types} from 'mongoose';
import { TicketSchema } from 'src/tickets/schemas/ticket.schema';

async function seed() {
    await connect('mongodb+srv://perla_admin:2ak13p02@perla-metro-ticket-serv.jq2wzva.mongodb.net/perla-metro-tickets');
    
    const Ticket = model('Ticket', TicketSchema);

    await Ticket.deleteMany({});

    const userID1 = new Types.ObjectId();
    const userID2 = new Types.ObjectId();

    await Ticket.create([{
        passengerId: userID1,
        date: new Date(),
        type: 'ida',
        status: 'activo',
        paid: 10000,
        
    }, {
        passengerId: userID2,
        date: new Date(),
        type: 'vuelta',
        status: 'usado',
        paid: 5000,
        
    }]);
    console.log('Seeding completed');
    console.log('User IDs for testing:');
    console.log('User 1 ID:', userID1.toString());
    console.log('User 2 ID:', userID2.toString());
    process.exit(0);
}
seed();

