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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
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
                    create: 'POST /api/tickets',
                    findById: 'GET /api/tickets/:id',
                    update: 'PATCH /api/tickets/:id',
                    softDelete: 'DELETE /api/tickets/:id?admin=true|false'
                },
            }
        };
    }
    getHealth() {
        return {
            status: 'OK',
            service: 'Tickets API',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()) + ' seconds',
            environment: process.env.NODE_ENV || 'development',
            database: process.env.MONGODB_URI ? 'Connected' : 'Local',
            ticketsEndpoint: '/api/tickets',
        };
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
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map