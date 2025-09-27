import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { get } from 'axios';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @InjectConnection()private readonly connection: Connection,) {}

  @Get()
  getRoot(){
    return{
      message: 'Backend API - Sistema de Tickets',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      status: 'OK',
      availableEndpoints: {
        tickets: {
          list: 'GET /api/tickets?admin=true|false',
          create: 'POST /api/tickets',
          findById: 'GET /api/tickets/:id',
          update: 'PATCH /api/tickets/:id',
          softDelete: 'DELETE /api/tickets/:id?admin=true|false'
        },
      }
    }
  }

  @Get('health')
  getHealth(){
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

  private getDatabaseStatus(): string {
    const mongoUri = process.env.MONGODB_URI || '';
    const connectionReady = this.connection.readyState === 1;
    
    // Si usa MongoDB Atlas (mongodb+srv)
    if (mongoUri.includes('mongodb+srv://')) {
      return connectionReady ? 'Connected (MongoDB Atlas)' : 'Disconnected (Atlas)';
    }
    
    // Si usa MongoDB local
    if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
      return connectionReady ? 'Connected (Local)' : 'Disconnected (Local)';
    }
    
    // Si usa MongoDB en cloud pero no Atlas
    if (mongoUri.includes('mongodb://') && !mongoUri.includes('localhost')) {
      return connectionReady ? 'Connected (Cloud)' : 'Disconnected (Cloud)';
    }
    
    // Fallback genérico
    return connectionReady ? 'Connected' : 'Disconnected';
  }
}