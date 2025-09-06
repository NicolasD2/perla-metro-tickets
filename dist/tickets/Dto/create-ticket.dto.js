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
exports.CreateTicketDto = exports.TicketStatus = exports.TicketType = void 0;
const class_validator_1 = require("class-validator");
var TicketType;
(function (TicketType) {
    TicketType["SINGLE"] = "single";
    TicketType["RETURN"] = "return";
})(TicketType || (exports.TicketType = TicketType = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["ACTIVE"] = "active";
    TicketStatus["USED"] = "used";
    TicketStatus["EXPIRED"] = "expired";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
class CreateTicketDto {
    passengerId;
    Date;
    type;
    status;
    paid;
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "passengerId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "Date", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TicketType),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TicketStatus),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "paid", void 0);
//# sourceMappingURL=create-ticket.dto.js.map