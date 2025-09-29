# Perla Metro Tickets API

Sistema de gestión de tickets de metro desarrollado con NestJS, MongoDB y TypeScript. Una API RESTful para administrar tickets con funcionalidades de CRUD y soft delete.

## Demo en Vivo

**API Base URL:** [https://perla-metro-tickets.onrender.com](https://perla-metro-tickets.onrender.com/api/tickets)

**Endpoints principales:**
- `GET /api/health` - Estado del sistema
- `GET /api/tickets/findAll?admin=true` - Listar todos los tickets (admin)
- `POST /api/tickets/create` - Crear nuevo ticket

## Características

- CRUD completo de tickets
- Soft Delete - Eliminación lógica
- Validaciones robustas con class-validator
- Índices únicos para prevenir duplicados
- Formateo automático de fechas
- Control de permisos (admin/usuario)
- Seeder incluido para datos de prueba
- Health check con estado de base de datos
- CORS configurado para frontend
- Desplegado en Render con CI/CD

## Tecnologías

- **Backend:** NestJS + TypeScript
- **Base de datos:** MongoDB Atlas
- **Validación:** class-validator + class-transformer
- **Despliegue:** Render
- **Testing:** Jest
- **Linting:** ESLint + Prettier

## Tecnologías

## Patrón de Diseño Utilizado

Este proyecto implementa el **Patrón de Arquitectura en Capas (Layered Architecture)**, siguiendo principios de **Clean Architecture** y separación de responsabilidades.

### Descripción de las capas

- **Controlador (Controller):**  
  Expone los endpoints HTTP y recibe las solicitudes del cliente. Valida y transforma los datos de entrada, delegando la lógica de negocio al servicio correspondiente.

- **Servicio (Service):**  
  Contiene la lógica de negocio principal. Orquesta las operaciones, aplica validaciones y reglas de negocio, y coordina el acceso a los datos.

- **DTOs (Data Transfer Objects):**  
  Definen la estructura de los datos que se reciben y envían a través de la API, asegurando la validación y el tipado estricto.

- **Entidad (Entity):**  
  Representa el modelo de dominio del ticket, independiente de la base de datos.

- **Schema:**  
  Define la estructura y validaciones específicas para la persistencia en MongoDB usando Mongoose.

- **Mapper:**  
  Separa la lógica de transformación entre DTOs y entidades de dominio.

- **Utilidades:**  
  Funciones auxiliares para formateo y operaciones comunes.

### Beneficios

- **Separación de responsabilidades:** Cada capa tiene una función clara y desacoplada.
- **Escalabilidad y mantenibilidad:** Facilita la extensión y el mantenimiento del código.
- **Testabilidad:** Permite probar cada capa de forma aislada.

## Instalación y Configuración Completa

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- Cuenta en MongoDB Atlas (gratuita)
- Cuenta en Render (gratuita)
- Postman (opcional, para probar la API)

### 1. Configurar MongoDB Atlas

#### Paso 1: Crear cuenta y cluster
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto (ej: "PerlaMetroTickets")
4. Crea un cluster gratuito (M0 Sandbox)
   - Provider: AWS
   - Region: Más cercana a ti
   - Cluster Name: "PerlaMetroCluster"

#### Paso 2: Configurar acceso
1. **Database Access:**
   - Ve a "Database Access" en el menú lateral
   - Click "Add New Database User"
   - Username: `perla_admin`
   - Password: Genera una contraseña segura (guárdala)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Network Access:**
   - Ve a "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

#### Paso 3: Obtener URI de conexión
1. Ve a "Clusters" y click "Connect" en tu cluster
2. Selecciona "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copia la URI de conexión, se ve así:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```
5. Reemplaza:
   - `<username>` por `perla_admin`
   - `<password>` por la contraseña que generaste
   - `myFirstDatabase` por `perla-metro-tickets`

URI final ejemplo:
```
mongodb+srv://perla_admin:tu_password@cluster0.xxxxx.mongodb.net/perla-metro-tickets?retryWrites=true&w=majority
```

### 2. Configuración Local

#### Paso 1: Clonar y configurar
```bash
# Clonar repositorio
git clone https://github.com/NicolasD2/perla-metro-tickets.git
cd perla-metro-tickets

# Instalar dependencias
npm install
```

#### Paso 2: Configurar variables de entorno

El proyecto incluye dos archivos importantes:

**`.env.example`** - Archivo de plantilla
- Es un **ejemplo** que muestra qué datos necesita la aplicación
- Está incluido en Git como **documentación**
- Contiene la **estructura** pero no datos reales

**`.env`** - Tu archivo de configuración personal
- Es donde colocas **tus datos reales** para desarrollo local
- **NO está en Git** por seguridad (contiene contraseñas)
- Es específico para tu entorno de desarrollo

```bash
# Crear tu archivo .env personal desde la plantilla
cp .env.example .env
```

Ahora edita **tu archivo `.env`** con los datos reales que obtuviste:

```env
# Configuración de tu entorno local
NODE_ENV=development
PORT=5050

# Tu URI de MongoDB Atlas (la que copiaste en el paso anterior)
MONGODB_URI=mongodb+srv://perla_admin:tu_password@cluster0.xxxxx.mongodb.net/perla-metro-tickets?retryWrites=true&w=majority

# Una clave secreta de tu elección
INTERNAL_API_KEY=mi_clave_secreta_123

# URL local de tu aplicación
API_URL=http://localhost:5050
```

#### Paso 3: Ejecutar localmente
```bash
# Modo desarrollo (con hot reload)
npm run start:dev

# La aplicación estará disponible en http://localhost:5050
```

### 3. Despliegue en Render

#### Paso 1: Preparar repositorio
1. Tu código debe estar en una rama `main` en GitHub
2. Asegúrate de que tu código esté actualizado
3. El archivo `.env` NO se sube a Git (es solo para tu uso local)

#### Paso 2: Crear servicio en Render
1. Ve a [Render](https://render.com) y crea una cuenta
2. Click "New" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Name:** `perla-metro-tickets`
   - **Region:** Oregon (US West)
   - **Branch:** `main`
   - **Runtime:** Node
   - **Build Command:** 
     ```bash
     npm install && npx tsc -p tsconfig.build.json
     ```
   - **Start Command:** 
     ```bash
     npm run start:prod
     ```
   - **Instance Type:** Free tier

#### Paso 3: Configurar variables de entorno en Render
En la sección "Environment" de tu servicio en Render, agrega **las mismas variables que usaste en tu `.env` local**, pero adaptadas para producción:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://perla_admin:tu_password@cluster0.xxxxx.mongodb.net/perla-metro-tickets?retryWrites=true&w=majority
INTERNAL_API_KEY=tu_clave_secreta_123
```

**Importante:** Render usa estas variables en lugar de leer un archivo `.env`, por eso las configuras en su dashboard.

#### Paso 4: Desplegar
1. Click "Create Web Service"
2. Render automáticamente:
   - Clonará tu repositorio
   - Instalará dependencias
   - Compilará TypeScript
   - Iniciará la aplicación
3. Te dará una URL como: `https://perla-metro-tickets.onrender.com`

### 4. Verificar instalación

#### Con Postman (Recomendado):

**Localmente:**
1. Abre Postman
2. **Health Check:**
   - Method: `GET`
   - URL: `http://localhost:5050/api/health`
   - Send

3. **Generar datos de prueba:**
   ```bash
   npx ts-node src/seeder/seeder.ts
   ```

4. **Listar tickets:**
   - Method: `GET`
   - URL: `http://localhost:5050/api/tickets/findAll?admin=true`
   - Send

**En producción:**
1. **Health Check:**
   - Method: `GET`
   - URL: `https://perla-metro-tickets.onrender.com/api/health`
   - Send

2. **Crear ticket de prueba:**
   - Method: `POST`
   - URL: `https://perla-metro-tickets.onrender.com/api/tickets/create`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "passengerId": "550e8400-e29b-41d4-a716-446655440001",
     "date": "2025-09-28T15:30:00.000Z",
     "type": "ida",
     "status": "activo",
     "paid": 2500
   }
   ```
   - Send

## Configuración de Variables de Entorno

### Resumen de archivos:

| Archivo | Propósito | ¿Se incluye en Git? | ¿Contiene datos reales? |
|---------|-----------|-------------------|------------------------|
| `.env.example` | Plantilla/documentación | ✅ Sí | ❌ No - solo ejemplos |
| `.env` | Tu configuración local | ❌ No | ✅ Sí - datos reales |

### Variables explicadas:

| Variable | ¿Qué es? | Ejemplo |
|----------|----------|---------|
| `NODE_ENV` | Entorno de ejecución | `development` o `production` |
| `PORT` | Puerto donde corre la app | `5050` (local), `10000` (Render) |
| `MONGODB_URI` | Conexión a tu base de datos | La URI que copiaste de MongoDB Atlas |
| `INTERNAL_API_KEY` | Clave para seguridad interna | Cualquier texto seguro que elijas |
| `API_URL` | URL base de tu aplicación | `http://localhost:5050` (local) |

## Solución de Problemas Comunes

### Error de conexión a MongoDB
```
MongooseError: Operation `tickets.find()` buffering timed out
```
**Solución:**
1. Verifica que la URI de MongoDB en tu `.env` sea correcta
2. Confirma que tu IP esté permitida en MongoDB Atlas (0.0.0.0/0)
3. Verifica que el usuario de BD tenga permisos correctos

### Error: "Cannot find .env file"
**Solución:**
1. Asegúrate de haber creado el archivo `.env` desde `.env.example`
2. Verifica que el archivo esté en la raíz del proyecto
3. Confirma que hayas puesto tus datos reales en el `.env`

### Error en Render: "Application failed to start"
**Solución:**
1. Revisa los logs en Render Dashboard
2. Verifica que las variables de entorno estén configuradas en Render
3. Confirma que la rama sea `main` en configuración de Render

### Puerto ya en uso localmente
```
Error: listen EADDRINUSE: address already in use :::5050
```
**Solución:**
```bash
# Matar proceso en puerto 5050
npx kill-port 5050
# O cambiar puerto en tu .env
PORT=3000
```

## Datos de Prueba

### Generar tickets aleatorios:
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

## Estructura del Proyecto

```
src/
├── app.module.ts          # Módulo principal
├── app.controller.ts      # Health check endpoint
├── main.ts               # Configuración y bootstrap
├── tickets/              # Módulo de tickets
│   ├── tickets.controller.ts  # Endpoints REST
│   ├── tickets.service.ts     # Lógica de negocio
│   ├── Dto/                   # Validación de datos
│   ├── schemas/               # Esquemas MongoDB
│   └── entities/              # Modelos de datos
└── seeder/               # Scripts de datos de prueba
    ├── seeder.ts         # Generador de tickets
    └── clear-tickets.ts  # Limpieza de BD
```

## Probando la API con Postman

### Colección de Postman
Puedes importar esta colección en Postman para probar todos los endpoints:

#### 1. Health Check
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/health`

#### 2. Crear Ticket
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/tickets/create`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "passengerId": "550e8400-e29b-41d4-a716-446655440001",
  "date": "2025-09-28T15:30:00.000Z",
  "type": "ida",
  "status": "activo",
  "paid": 2500
}
```

#### 3. Listar Tickets
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/tickets/findAll?admin=true`

#### 4. Buscar por ID
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/tickets/find/{{ticketId}}`

#### 5. Actualizar Ticket
- **Method:** `PATCH`
- **URL:** `{{baseUrl}}/api/tickets/update/{{ticketId}}`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "status": "usado"
}
```

#### 6. Eliminar Ticket
- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/api/tickets/delete/{{ticketId}}?admin=true`

### Variables de Entorno en Postman
Configura estas variables en Postman:
- `baseUrl`: `http://localhost:5050` (local) o `https://perla-metro-tickets.onrender.com` (producción)
- `ticketId`: ID de un ticket específico para pruebas

## Scripts Disponibles

```bash
npm run start          # Desarrollo
npm run start:dev      # Desarrollo con watch
npm run start:prod     # Producción
npm run build          # Compilar TypeScript
npm run test           # Tests unitarios
npm run test:e2e       # Tests end-to-end
npm run lint           # Linting con ESLint
```

## Licencia

Este proyecto está bajo la Licencia MIT.

## Autor

**Nicolás** - [GitHub](https://github.com/NicolasD2)

## Soporte

Para problemas o preguntas:

1. Revisa la sección "Solución de Problemas"
2. Verifica el health check: `/api/health`
3. Abre un [Issue](https://github.com/NicolasD2/perla-metro-tickets/issues)