/**
 * Servicio principal de la aplicación
 * 
 * @description Proporciona lógica de negocio para endpoints generales
 * 
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Retorna el estado general del servicio
   * 
   * @returns {string} Mensaje de estado
   */
  getStatus(): string {
    return 'API esta funcionando bien';
  }
}