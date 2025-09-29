/**
 * Controlador principal para endpoints de información y health check
 * 
 * @description Proporciona endpoints de estado del sistema y información general
 * 
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    @InjectConnection() private readonly connection: Connection
  ) {}

  /**
   * Endpoint raíz con información general de la API
   * 
   * @returns {object} Información básica y endpoints disponibles
   */
  @Get()
  getRoot() {
    return {
      message: 'Backend API - Sistema de Tickets',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      status: 'OK',
      availableEndpoints: {
        tickets: {
          list: 'GET /api/tickets?admin=true|false',
          create: 'POST /api/tickets/crear',
          findById: 'GET /api/tickets/buscar/:id',
          update: 'PATCH /api/tickets/actualizar/:id',
          softDelete: 'DELETE /api/tickets/eliminar/:id?admin=true|false'
        },
      }
    }
  }

  /**
   * Health check endpoint para monitoreo del sistema
   * 
   * @returns {object} Estado del servicio, base de datos y métricas
   */
  @Get('health')
  getHealth() {
    const dbStatus = this.getDatabaseStatus();
    return {
      status: 'OK',
      service: 'Tickets API',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()) + ' seconds',
      environment: process.env.NODE_ENV || 'development',
      database: dbStatus,
      ticketsEndpoint: '/api/tickets',
    }
  }

  /**
   * Determina el estado de conexión a la base de datos
   * 
   * @private
   * @returns {string} Estado de conexión descriptivo
   */
  private getDatabaseStatus(): string {
    const mongoUri = process.env.MONGODB_URI || '';
    const connectionReady = this.connection.readyState === 1;
    
    if (mongoUri.includes('mongodb+srv://')) {
      return connectionReady ? 'Connected (MongoDB Atlas)' : 'Disconnected (Atlas)';
    }
    
    if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
      return connectionReady ? 'Connected (Local)' : 'Disconnected (Local)';
    }
    
    if (mongoUri.includes('mongodb://') && !mongoUri.includes('localhost')) {
      return connectionReady ? 'Connected (Cloud)' : 'Disconnected (Cloud)';
    }
    
    return connectionReady ? 'Connected' : 'Disconnected';
  }
}