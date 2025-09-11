import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './Dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Ticket {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(): Ticket[] {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Ticket | undefined {
    return this.ticketsService.findById(id);
  }
}