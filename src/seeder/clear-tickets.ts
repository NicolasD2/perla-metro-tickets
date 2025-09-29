/**
 * Script para limpiar todos los tickets de la base de datos
 * 
 * @description Elimina todos los documentos de la colección 'tickets' en MongoDB.
 * Útil para resetear la base de datos durante el desarrollo.
 * 
 * @usage npx ts-node src/seeder/clear-tickets.ts
 */

import {connect, model, Schema, disconnect} from 'mongoose';
import { config } from 'dotenv';
config();

/**
 * Schema de MongoDB para los tickets
 */
const TicketSchema = new Schema({
    passengerId: { type: String, required: true },
    passengerName: { type: String, required: false },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    paid: { type: Number, required: true },
    deletedAt: { type: Date, default: null }
});

/**
 * Elimina todos los tickets de la base de datos
 * 
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Si falla la conexión o la eliminación
 */
async function clearTickets() {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        console.error('MONGODB_URL no está definido en las variables de entorno');
        return;
    }    
    try {
        await connect(mongoUrl);
        console.log('Conectado a la base de datos');
        
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