
import {connect, model, Schema, disconnect} from 'mongoose';
import { config } from 'dotenv';
config();

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
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        console.error('MONGODB_URL no está definido en las variables de entorno');
        return;
    }    
    try {

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