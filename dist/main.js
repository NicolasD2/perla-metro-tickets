"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 5050;
    await app.listen(port, '0.0.0.0');
    console.log('Backend API - Sistema de Tickets ejecutandose en el puerto ${port}');
    console.log(` URL base: ${process.env.NODE_ENV === 'production' ? 'https://tu-app.onrender.com' : 'http://localhost:' + port}/api`);
    console.log('Endpoints disponibles:');
    console.log('GET /api/tickets - Listar todos los tickets');
    console.log('POST /api/tickets - Crear un nuevo ticket');
    console.log('GET /api/tickets/:id - Obtener un ticket por ID');
    console.log('PATCH /api/tickets/:id - Actualizar un ticket por ID');
    console.log('DELETE /api/tickets/:id - Eliminar (soft delete) un ticket por ID');
}
void bootstrap();
//# sourceMappingURL=main.js.map