import { Controller, Get, Post, Body, Param, Query, Patch, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './Dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { UpdateTicketDto } from './Dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(@Query('admin') admin: string): Promise<Ticket[]> {
    return this.ticketsService.findAll(admin === 'true');
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Partial<Ticket>> {
    return this.ticketsService.findById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketsService.update(id, dto);
  }
  @Delete(':id')
  softDelete(@Param('id') id: string, @Query('admin') admin : string): Promise<boolean>{
    return this.ticketsService.softDelete(id, admin==='true');
  }
}