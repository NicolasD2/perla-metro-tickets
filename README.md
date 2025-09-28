# Perla Metro Tickets API

Sistema de gestión de tickets de metro desarrollado con NestJS, MongoDB y TypeScript. Una API RESTful para administrar tickets de transporte público con funcionalidades completas de CRUD y soft delete.

## Demo en Vivo

**API Base URL:** (https://perla-metro-tickets.onrender.com/api/tickets/)

**Endpoints principales:**
- `GET /api/health` - Estado del sistema
- `GET /api/tickets/findAll?admin=true` - Listar todos los tickets (admin)
- `POST /api/tickets/create` - Crear nuevo ticket

## Características

- ✅ **CRUD completo** de tickets
- ✅ **Soft Delete** - Eliminación lógica
- ✅ **Validaciones robustas** con class-validator
- ✅ **Índices únicos** para prevenir duplicados
- ✅ **Formateo automático** de fechas
- ✅ **Control de permisos** (admin/usuario)
- ✅ **Seeder incluido** para datos de prueba
- ✅ **Health check** con estado de base de datos
- ✅ **CORS configurado** para frontend
- ✅ **Desplegado en Render** con CI/CD

## 🛠 Tecnologías

- **Backend:** NestJS + TypeScript
- **Base de datos:** MongoDB Atlas
- **Validación:** class-validator + class-transformer
- **Despliegue:** Render
- **Testing:** Jest
- **Linting:** ESLint + Prettier

## Instalación Local

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- Cuenta en MongoDB Atlas (o MongoDB local)

### Pasos

1. **Clonar el repositorio:**
```bash
git clone https://github.com/NicolasD2/perla-metro-tickets.git
cd perla-metro-tickets
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
```env
NODE_ENV=development
PORT=5050
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
INTERNAL_API_KEY=tu_clave_secreta
API_URL=http://localhost:5050
```

4. **Ejecutar en desarrollo:**
```bash
npm run start:dev
```

La API estará disponible en `http://localhost:5050`

##  Estructura del Proyecto

```
src/
├── app.module.ts          # Módulo principal
├── app.controller.ts      # Controlador raíz y health check
├── main.ts               # Punto de entrada
├── tickets/              # Módulo de tickets
│   ├── tickets.controller.ts
│   ├── tickets.service.ts
│   ├── tickets.module.ts
│   ├── Dto/              # Data Transfer Objects
│   ├── entities/         # Entidades
│   ├── schemas/          # Schemas de MongoDB
│   ├── Mapper/           # Mappers
│   └── Util/             # Utilidades
└── seeder/               # Scripts de datos de prueba
    ├── seeder.ts
    └── clear-tickets.ts
```

##  Uso de la API

### Health Check
```bash
GET /api/health
```

### Crear Ticket
```bash
POST /api/tickets/create
Content-Type: application/json

{
  "passengerId": "550e8400-e29b-41d4-a716-446655440001",
  "date": "2025-09-28T15:30:00.000Z",
  "type": "ida",
  "status": "activo",
  "paid": 2500
}
```

### Listar Tickets (Admin)
```bash
GET /api/tickets/findAll?admin=true
```

### Buscar Ticket por ID
```bash
GET /api/tickets/find/:id
```

### Actualizar Ticket
```bash
PATCH /api/tickets/update/:id
Content-Type: application/json

{
  "status": "usado"
}
```

### Eliminar Ticket (Admin)
```bash
DELETE /api/tickets/delete/:id?admin=true
```

## 🎲 Datos de Prueba

### Generar datos aleatorios:
```bash
# 30 tickets por defecto
npx ts-node src/seeder/seeder.ts

# Cantidad específica
npx ts-node src/seeder/seeder.ts 50
```

### Limpiar base de datos:
```bash
npx ts-node src/seeder/clear-tickets.ts
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

## 📝 Validaciones

### Tipos de Ticket
- `ida` - Ticket de ida
- `vuelta` - Ticket de vuelta

### Estados de Ticket
- `activo` - Ticket válido y sin usar
- `usado` - Ticket ya utilizado
- `caducado` - Ticket expirado

### Reglas de Negocio
- ✅ Un pasajero no puede tener tickets duplicados (mismo día + tipo)
- ✅ No se puede cambiar un ticket caducado a usado
- ✅ El monto debe ser positivo
- ✅ Solo admins pueden ver/eliminar todos los tickets

## Despliegue

### Render (Automático)

1. **Fork del repositorio**
2. **Conectar con Render:**
   - New Web Service
   - Connect GitHub repo
   - Branch: `main`
   - Build: `npm install && npx tsc -p tsconfig.build.json`
   - Start: `npm run start:prod`

3. **Variables de entorno en Render:**
```
NODE_ENV=production
MONGODB_URI=tu_mongodb_atlas_uri
INTERNAL_API_KEY=tu_clave_secreta
```

### Manual

```bash
# Build de producción
npm run build

# Ejecutar en producción
npm run start:prod
```

## Scripts Disponibles

```bash
npm run start          # Desarrollo
npm run start:dev      # Desarrollo con watch
npm run start:prod     # Producción
npm run build          # Build
npm run test           # Tests
npm run lint           # Linting
```

## Ejemplos de Respuesta

### Ticket Creado
```json
{
  "_id": "67f1e5d4a1b2c3d4e5f6g7h8",
  "passengerId": "550e8400-e29b-41d4-a716-446655440001",
  "passengerName": "Juan Pérez",
  "date": "28/09/2025 15:30",
  "type": "ida",
  "status": "activo",
  "paid": 2500,
  "deletedAt": null
}
```

### Health Check
```json
{
  "status": "OK",
  "service": "Tickets API",
  "timestamp": "2025-09-28T20:30:00.000Z",
  "uptime": "120 seconds",
  "environment": "production",
  "database": "Connected (MongoDB Atlas)",
  "ticketsEndpoint": "/api/tickets"
}
```
## Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

## Autor

**Nicolás** - [GitHub](https://github.com/NicolasD2)

## Soporte

Si tienes preguntas o problemas:

1. Abre un [Issue](https://github.com/NicolasD2/perla-metro-tickets/issues)
2. Revisa la documentación de endpoints
3. Verifica el health check: `/api/health`

---
