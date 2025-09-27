import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 5050;
  await app.listen(port, '0.0.0.0');

  console.log('Backend API - Sistema de Tickets ejecutandose en el puerto ${port}');
  console.log(` URL base: ${process.env.NODE_ENV === 'production' ? 'https://tu-app.onrender.com' : 'http://localhost:' + port}/api`);
  console.log('Endpoints disponibles:');
  console.log('GET /api/tickets/obtener?admin=true|false - Listar todos los tickets')
  console.log('POST /api/tickets/crear - Crear un nuevo ticket')
  console.log('GET /api/tickets/buscar/:id - Obtener un ticket por ID')
  console.log('PATCH /api/tickets/actualizar/:id - Actualizar un ticket por ID')
  console.log('DELETE /api/tickets/eliminar/:id?admin=true|false - Eliminar (soft delete) un ticket por ID')
}

void bootstrap();
