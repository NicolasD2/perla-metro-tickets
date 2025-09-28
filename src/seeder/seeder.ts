import {connect, model, Types} from 'mongoose';
import { TicketSchema } from 'src/tickets/schemas/ticket.schema';

const mockUsers = [
    { id: "550e8400-e29b-41d4-a716-446655440001", name: "Juan Pérez" },
    { id: "550e8400-e29b-41d4-a716-446655440002", name: "Ana Gómez" },
    { id: "550e8400-e29b-41d4-a716-446655440003", name: "Luis Torres" },
    { id: "550e8400-e29b-41d4-a716-446655440004", name: "María González" },
    { id: "550e8400-e29b-41d4-a716-446655440005", name: "Carlos Rodríguez" }
];

async function seed() {
    await connect('mongodb+srv://perla_admin:2ak13p02@perla-metro-ticket-serv.jq2wzva.mongodb.net/perla-metro-tickets');
    
    const Ticket = model('Ticket', TicketSchema);

    await Ticket.deleteMany({});

    const tickets = mockUsers.map((user, index) => ({
        passengerId: user.id,
        passengerName: user.name,
        date: new Date(Date.now() + index * 3600000),
        type: index % 2 === 0 ? 'ida' : 'vuelta',
        status: 'activo',
        paid: Math.floor(Math.random() * 50000) + 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }));
    await Ticket.create(tickets);
    console.log('Base de datos sembrada con datos de prueba.');
    mockUsers.forEach(user=>{
        console.log(`Usuario ID: ${user.id}, Nombre: ${user.name}`);
    })
    process.exit(0);
}
seed();

