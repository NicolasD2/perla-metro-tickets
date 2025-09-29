/**
 * Punto de entrada principal de la aplicación NestJS
 * 
 * @description Configura y lanza el servidor con CORS, validaciones globales,
 * prefix de API y logging de endpoints disponibles.
 * 
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Función de inicialización de la aplicación
 * 
 * @async
 * @function bootstrap
 * @returns {Promise<void>}
 */
async function bootstrap() {
  // Crear aplicación NestJS
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS para permitir requests desde frontend
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Configurar validaciones globales con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Solo propiedades definidas en DTO
      transform: true,        // Transformar tipos automáticamente
      forbidNonWhitelisted: true, // Rechazar propiedades no definidas
    }),
  );
  
  // Prefix global para todas las rutas
  app.setGlobalPrefix('api');
  
  // Puerto dinámico para producción/desarrollo
  const port = process.env.PORT || 5050;
  await app.listen(port, '0.0.0.0');

  // Logging de información del servidor
  console.log(`Backend API - Sistema de Tickets ejecutandose en el puerto ${port}`);
  console.log(`Endpoints disponibles:`);
  console.log(`GET /api/tickets/findAll?admin=true|false - Listar todos los tickets`);
  console.log(`POST /api/tickets/create - Crear un nuevo ticket`);
  console.log(`GET /api/tickets/find/:id - Obtener un ticket por ID`);
  console.log(`PATCH /api/tickets/update/:id - Actualizar un ticket por ID`);
  console.log(`DELETE /api/tickets/delete/:id?admin=true|false - Eliminar (soft delete) un ticket por ID`);
}

void bootstrap();