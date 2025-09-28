import {connect, model, Schema} from 'mongoose';

enum TicketType {
    IDA = 'ida',
    VUELTA = 'vuelta',
}
enum TicketStatus {
    ACTIVO = 'activo',
    USADO = 'usado',
    CADUCADO = 'caducado',
}

const TicketSchema = new Schema({
    passengerId: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: Object.values(TicketType), required: true },
    status: { type: String, enum: Object.values(TicketStatus), required: true },
    paid: { type: Number, required: true },
    deletedAt: { type: Date, default: null }
});

async function verifyData() {
    await connect('mongodb+srv://perla_admin:2ak13p02@perla-metro-ticket-serv.jq2wzva.mongodb.net/perla-metro-tickets');
    
    const Ticket = model('Ticket', TicketSchema);
    
    console.log('🔍 Verificando datos en la base de datos...');
    const allTickets = await Ticket.find({});
    console.log(`📊 Total tickets encontrados: ${allTickets.length}`);
    
    if (allTickets.length > 0) {
        console.log('\n✅ Datos encontrados:');
        allTickets.forEach((ticket, index) => {
            console.log(`${index + 1}. ID: ${ticket._id}`);
            console.log(`   PassengerID: ${ticket.passengerId}`);
            console.log(`   Type: ${ticket.type}`);
            console.log(`   Status: ${ticket.status}`);
            console.log(`   Paid: ${ticket.paid}`);
            console.log(`   DeletedAt: ${ticket.deletedAt}`);
            console.log('');
        });
    } else {
        console.log('❌ No se encontraron tickets en la base de datos');
    }
    
    process.exit(0);
}

verifyData().catch(console.error);