import {connect, model, Schema, disconnect} from 'mongoose';


const TicketSchema = new Schema({
    passengerId: { type: String, required: true },
    passengerName: { type: String, required: false },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    paid: { type: Number, required: true },
    deletedAt: { type: Date, default: null }
});

async function clearTickets() {
    try {
        console.log('Conectando a MongoDB...');
        await connect('mongodb+srv://perla_admin:2ak13p02@perla-metro-ticket-serv.jq2wzva.mongodb.net/perla-metro-tickets');
        console.log('Conectado exitosamente');
        
        const Ticket = model('Ticket', TicketSchema);
        
        const result = await Ticket.deleteMany({});
        
        console.log(`${result.deletedCount} tickets eliminados exitosamente`);
        
    } catch (error) {
        console.error('Error al limpiar tickets:', error);
    } finally {
        await disconnect();
        console.log('Conexión cerrada');
    }
}

clearTickets();