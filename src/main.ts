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
  
  console.log(`Application is running on: http://localhost:${port}/api`);
  console.log('URL base : http://localhost:5050/api');
  console.log('Health check : http://localhost:5050/api/health');
  console.log('Tickets endpoint : http://localhost:5050/api/tickets');
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);

}

void bootstrap();
