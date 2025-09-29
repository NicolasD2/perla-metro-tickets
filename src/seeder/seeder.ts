/**
 * Script para generar datos de prueba de tickets en MongoDB
 * 
 * @description Genera tickets aleatorios con datos realistas para testing y desarrollo.
 * Limpia la base de datos antes de insertar nuevos registros.
 * 
 * @usage 
 * npx ts-node src/seeder/seeder.ts [cantidad]
 * npx ts-node src/seeder/seeder.ts 100
 * 
 */

import {connect, model, Schema} from 'mongoose';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

config();

/**
 * Enum para los tipos de ticket disponibles
 */
enum TicketType {
    IDA = 'ida',
    VUELTA = 'vuelta',
}

/**
 * Enum para los estados posibles de un ticket
 */
enum TicketStatus {
    ACTIVO = 'activo',
    USADO = 'usado',
    CADUCADO = 'caducado',
}

/**
 * Schema de MongoDB para los tickets
 */
const TicketSchema = new Schema({
    passengerId: { type: String, required: true },
    passengerName: { type: String, required: false },
    date: { type: Date, required: true },
    type: { type: String, enum: Object.values(TicketType), required: true },
    status: { type: String, enum: Object.values(TicketStatus), required: true },
    paid: { type: Number, required: true },
    deletedAt: { type: Date, default: null }
});

/**
 * Índice único para prevenir duplicados por pasajero, fecha y tipo
 */
TicketSchema.index(
    { passengerId: 1, date: 1, type: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } },
);

/**
 * Lista de nombres para generar pasajeros aleatorios
 */
const firstNames = [
    'Carlos', 'María', 'José', 'Ana', 'Luis', 'Carmen', 'Antonio', 'Isabel', 
    'Francisco', 'Dolores', 'Manuel', 'Pilar', 'David', 'Teresa', 'Jesús',
    'Rosa', 'Daniel', 'Cristina', 'Miguel', 'Patricia', 'Alejandro', 'Laura',
    'Rafael', 'Marta', 'Fernando', 'Elena', 'Sergio', 'Silvia', 'Pablo', 'Beatriz'
];

/**
 * Genera un nombre aleatorio de la lista
 * @returns {string} Nombre aleatorio
 */
function getRandomName(): string {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    return `${firstName}`;
}

/**
 * Genera una fecha aleatoria dentro de los últimos 30 días
 * @returns {Date} Fecha aleatoria
 */
function getRandomDate(): Date {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
    return new Date(randomTime);
}

/**
 * Genera un precio aleatorio para el ticket
 * @returns {number} Precio entre 1000 y 4500 pesos
 */
function getRandomPrice(): number {
    const basePrices = [1500, 2000, 2500, 3000, 3500, 4000];
    const basePrice = basePrices[Math.floor(Math.random() * basePrices.length)];
    const variation = Math.floor(Math.random() * 1000) - 500;
    return Math.max(1000, basePrice + variation);
}

/**
 * Genera un estado aleatorio con distribución ponderada
 * @returns {TicketStatus} Estado aleatorio (60% usado, 25% activo, 15% caducado)
 */
function getRandomStatus(): TicketStatus {
    const random = Math.random();
    if (random < 0.6) return TicketStatus.USADO;
    if (random < 0.85) return TicketStatus.ACTIVO;
    return TicketStatus.CADUCADO;
}

/**
 * Interface para definir la estructura de datos de un ticket
 */
interface TicketData {
    passengerId: string;
    passengerName: string;
    date: Date;
    type: TicketType;
    status: TicketStatus;
    paid: number;
    deletedAt: null;
}

/**
 * Función principal que genera los tickets de prueba
 * 
 * @param {number} numberOfTickets - Cantidad de tickets a generar (default: 50)
 * @returns {Promise<void>}
 */
async function randomSeed(numberOfTickets: number = 50) {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        console.error('MONGODB_URL no está definido en las variables de entorno');
        return;
    }
    
    try {
        console.log('Conectando a base de datos...');
        await connect(mongoUrl);
        console.log('Conectado exitosamente');

        const Ticket = model('Ticket', TicketSchema);

        // Limpiar base de datos
        const deletedCount = (await Ticket.deleteMany({})).deletedCount;
        console.log(`${deletedCount} tickets eliminados`);

        console.log(`Generando ${numberOfTickets} tickets...`);

        const tickets: TicketData[] = [];
        const usedCombinations = new Set<string>();

        // Generar tickets únicos
        for (let i = 0; i < numberOfTickets; i++) {
            let passengerId: string;
            let date: Date;
            let type: TicketType;
            let combinationKey: string;

            // Asegurar combinaciones únicas
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

        // Insertar tickets en la base de datos
        const createdTickets = await Ticket.create(tickets);
        console.log(`${createdTickets.length} tickets creados exitosamente`);

        // Mostrar estadísticas
        const stats = {
            total: createdTickets.length,
            activo: createdTickets.filter(t => t.status === 'activo').length,
            usado: createdTickets.filter(t => t.status === 'usado').length,
            caducado: createdTickets.filter(t => t.status === 'caducado').length,
            precioPromedio: Math.round(createdTickets.reduce((sum, t) => sum + t.paid, 0) / createdTickets.length)
        };

        console.log('Estadísticas:', stats);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit(0);
    }
}

// Ejecutar seeder con cantidad especificada por argumento o 50 por defecto
const numberOfTickets = process.argv[2] ? parseInt(process.argv[2]) : 50;
randomSeed(numberOfTickets);