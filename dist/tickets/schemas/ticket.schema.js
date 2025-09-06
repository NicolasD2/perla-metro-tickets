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
exports.TicketSchema = exports.Ticket = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const create_ticket_dto_1 = require("../Dto/create-ticket.dto");
let Ticket = class Ticket extends mongoose_2.Document {
    passengerId;
    Date;
    type;
    status;
    paid;
    deletedAt;
};
exports.Ticket = Ticket;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Ticket.prototype, "passengerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "Date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: create_ticket_dto_1.TicketType }),
    __metadata("design:type", String)
], Ticket.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: create_ticket_dto_1.TicketStatus }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Ticket.prototype, "paid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Object)
], Ticket.prototype, "deletedAt", void 0);
exports.Ticket = Ticket = __decorate([
    (0, mongoose_1.Schema)()
], Ticket);
exports.TicketSchema = mongoose_1.SchemaFactory.createForClass(Ticket);
exports.TicketSchema.index({ passengerId: 1, Date: 1, type: 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });
//# sourceMappingURL=ticket.schema.js.map