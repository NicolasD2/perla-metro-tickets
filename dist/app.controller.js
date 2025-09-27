"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AppController = class AppController {
    appService;
    connection;
    constructor(appService, connection) {
        this.appService = appService;
        this.connection = connection;
    }
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
        };
    }
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
        };
    }
    getDatabaseStatus() {
        const mongoUri = process.env.MONGODB_URI || '';
        const connectionReady = this.connection.readyState === 1;
        console.log('🔍 Debug MongoDB URI (first 30 chars):', mongoUri.substring(0, 30));
        console.log('🔍 Connection ready:', connectionReady);
        console.log('🔍 Contains mongodb+srv:', mongoUri.includes('mongodb+srv://'));
        if (mongoUri.includes('mongodb+srv://')) {
            console.log('✅ Atlas detected!');
            return connectionReady ? 'Connected (MongoDB Atlas)' : 'Disconnected (Atlas)';
        }
        console.log('❌ Atlas NOT detected, using fallback');
        if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
            return connectionReady ? 'Connected (Local)' : 'Disconnected (Local)';
        }
        if (mongoUri.includes('mongodb://') && !mongoUri.includes('localhost')) {
            return connectionReady ? 'Connected (Cloud)' : 'Disconnected (Cloud)';
        }
        return connectionReady ? 'Connected' : 'Disconnected';
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRoot", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHealth", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [app_service_1.AppService, mongoose_2.Connection])
], AppController);
//# sourceMappingURL=app.controller.js.map