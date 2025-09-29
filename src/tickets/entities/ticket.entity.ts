/**
 * Entidad que define la estructura de un ticket
 * 
 * @description Modelo de datos TypeScript para representar un ticket de metro
 * con todos sus campos y tipos
 * 
 */

/**
 * Clase que representa un ticket de metro
 * 
 * @class Ticket
 * @description Define la estructura básica de datos para un ticket
 */
export class Ticket {
  id: string;
  
  passengerId: string;
  
  passengerName?: string; 
  
  date: Date;
  
  type: String;
  
  status: String;
  
  paid: number;
  
  deletedAt?: Date;
}