import { connect, disconnect } from 'mongoose';
import { Ticket } from './entities/ticket.entity';
import { model } from 'mongoose';
import { TicketSchema } from './schemas/ticket.schema';

async function clearTickets() {
  try {
    console.log('Conectando a MongoDB...');
    await connect('mongodb+srv://perla_admin:2ak13p02@perla-metro-ticket-serv.jq2wzva.mongodb.net/');
    
    const TicketModel = model(Ticket.name, TicketSchema);
    
    console.log('Limpiando tickets...');
    const result = await TicketModel.deleteMany({});
    
    console.log(`${result.deletedCount} tickets eliminados`);
    
  } catch (error) {
    console.error('Error al limpiar tickets:', error);
  } finally {
    await disconnect();
    console.log('Conexión cerrada');
  }
}

clearTickets();