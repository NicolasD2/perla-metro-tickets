/**
 * Módulo raíz de la aplicación NestJS
 * 
 * @description Configura la conexión a MongoDB y registra módulos principales
 * 
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Módulo principal que orquesta toda la aplicación
 */
@Module({
  imports: [
    // Conexión a MongoDB usando variable de entorno
    MongooseModule.forRoot(process.env.MONGODB_URL!),
    // Módulo de funcionalidades de tickets
    TicketsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}