import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { timestamp } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    return {
      status: 'OK',
      service: 'Tickets API',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()) + ' seconds',
      environment: process.env.NODE_ENV || 'development',
      database: process.env.MONGODB_URI ? 'Connected' : 'Local',
      ticketsEndpoint: '/api/tickets',
    }
  }
}