import {connect, model, Schema} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
    passengerName: { type: String, required: false },
    date: { type: Date, required: true },
    type: { type: String, enum: Object.values(TicketType), required: true },
    status: { type: String, enum: Object.values(TicketStatus), required: true },
    paid: { type: Number, required: true },
    deletedAt: { type: Date, default: null }
});

TicketSchema.index(
    { passengerId: 1, date: 1, type: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } },
);

const firstNames = [
    'Carlos', 'María', 'José', 'Ana', 'Luis', 'Carmen', 'Antonio', 'Isabel', 
    'Francisco', 'Dolores', 'Manuel', 'Pilar', 'David', 'Teresa', 'Jesús',
    'Rosa', 'Daniel', 'Cristina', 'Miguel', 'Patricia', 'Alejandro', 'Laura',
    'Rafael', 'Marta', 'Fernando', 'Elena', 'Sergio', 'Silvia', 'Pablo', 'Beatriz'
];

const lastNames = [
    'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez',
    'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno',
    'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres',
    'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Suárez'
];

function getRandomName(): string {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)];
    const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName1} ${lastName2}`;
}

function getRandomDate(): Date {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
    return new Date(randomTime);
}

function getRandomPrice(): number {
    const basePrices = [1500, 2000, 2500, 3000, 3500, 4000];
    const basePrice = basePrices[Math.floor(Math.random() * basePrices.length)];
    const variation = Math.floor(Math.random() * 1000) - 500;
    return Math.max(1000, basePrice + variation);
}

function getRandomStatus(): TicketStatus {
    const random = Math.random();
    if (random < 0.6) return TicketStatus.USADO;
    if (random < 0.85) return TicketStatus.ACTIVO;
    return TicketStatus.CADUCADO;
}

interface TicketData {
    passengerId: string;
    passengerName: string;
    date: Date;
    type: TicketType;
    status: TicketStatus;
    paid: number;
    deletedAt: null;
}

async function randomSeed(numberOfTickets: number = 50) {
    try {
        console.log('Conectando a base de datos...');
        await connect('mongodb+srv://perla_admin:2ak13p02@perla-metro-ticket-serv.jq2wzva.mongodb.net/perla-metro-tickets');
        
        const Ticket = model('Ticket', TicketSchema);

        const deletedCount = (await Ticket.deleteMany({})).deletedCount;
        console.log(`${deletedCount} tickets eliminados`);

        console.log(`Generando ${numberOfTickets} tickets...`);

        const tickets: TicketData[] = [];
        const usedCombinations = new Set<string>();

        for (let i = 0; i < numberOfTickets; i++) {
            let passengerId: string;
            let date: Date;
            let type: TicketType;
            let combinationKey: string;

            do {
                passengerId = uuidv4();
                date = getRandomDate();
                type = Math.random() < 0.5 ? TicketType.IDA : TicketType.VUELTA;
                combinationKey = `${passengerId}-${date.toISOString().split('T')[0]}-${type}`;
            } while (usedCombinations.has(combinationKey));

            usedCombinations.add(combinationKey);

            const ticket: TicketData = {
                passengerId,
                passengerName: getRandomName(),
                date,
                type,
                status: getRandomStatus(),
                paid: getRandomPrice(),
                deletedAt: null
            };

            tickets.push(ticket);
        }

        const createdTickets = await Ticket.create(tickets);
        console.log(`${createdTickets.length} tickets creados exitosamente`);

        const stats = {
            total: createdTickets.length,
            activo: createdTickets.filter(t => t.status === 'activo').length,
            usado: createdTickets.filter(t => t.status === 'usado').length,
            caducado: createdTickets.filter(t => t.status === 'caducado').length,
            precioPromedio: Math.round(createdTickets.reduce((sum, t) => sum + t.paid, 0) / createdTickets.length)
        };

        console.log(`Estadísticas: ${stats.total} total, ${stats.activo} activos, ${stats.usado} usados, ${stats.caducado} caducados`);
        console.log(`Precio promedio: $${stats.precioPromedio}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit(0);
    }
}

const numberOfTickets = process.argv[2] ? parseInt(process.argv[2]) : 50;
randomSeed(numberOfTickets);