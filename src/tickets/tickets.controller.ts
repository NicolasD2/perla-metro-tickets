import { Controller, Get, Post, Body, Param, Query, Patch, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './Dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { UpdateTicketDto } from './Dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('crear')
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get('obtener')
  findAll(@Query('admin') admin: string): Promise<Ticket[]> {
    return this.ticketsService.findAll(admin === 'true');
  }

  @Get('buscar/:id')
  findById(@Param('id') id: string): Promise<Partial<Ticket>> {
    return this.ticketsService.findById(id);
  }
  @Patch('actualizar/:id')
  update(@Param('id') id: string, @Body() dto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketsService.update(id, dto);
  }
  @Delete('eliminar/:id')
  softDelete(@Param('id') id: string, @Query('admin') admin : string): Promise<boolean>{
    return this.ticketsService.softDelete(id, admin==='true');
  }

    @Get('crear')
  createInfo(){
    return{
      message: "Este endpoint requiere método POST para crear tickets",
      method: "POST",
      url: "/api/tickets/crear",
      instruction: 'Por favor, utilice Postman, curl, o una herramienta para utilizar este endpoint.',
      postmanInstructions: [
        'Abra Postman.',
        'Seleccione el método POST.',
        'Ingrese la URL: /api/tickets/crear',
        'En el cuerpo de la solicitud, incluya los datos del ticket en formato JSON.'
      ],
      exampleBody: {
        body:{
          passengerId: "test-user-016",
          date: "2025-09-25T15:01:00.000Z",
          type: "ida",
          status: "activo", 
          paid: 452100
        }
      }
    };
  }
    @Get('actualizar/:id')
  updateInfo(@Param('id') id: string){
    return{
      message: "Este endpoint requiere método PATCH para actualizar tickets",
      method: "PATCH",
      url: `/api/tickets/actualizar/${id}`,
      instruction: 'Por favor, utilice Postman, curl, o una herramienta para utilizar este endpoint.',
      postmanInstructions: [
        'Abra Postman.',
        'Seleccione el método PATCH.',
        `Ingrese la URL: /api/tickets/actualizar/${id}`,
        'En el cuerpo de la solicitud, incluya los datos actualizados del ticket en formato JSON.'
      ],
      exampleBody: {
        body:{
          passengerId: "test-user-016",
          date: "2025-09-25T15:01:00.000Z",
          type: "ida",
          status: "activo", 
          paid: 452100
        }
      }
    };
  }
    @Get('eliminar/:id')
  deleteInfo(@Param('id') id: string){
    return{
      message: "Este endpoint requiere método DELETE para eliminar tickets",
      method: "DELETE",
      url: `/api/tickets/eliminar/${id}?admin=true`,
      important: "REQUIERE admin=true para funcionar",
      instruction: 'Por favor, utilice Postman, curl, o una herramienta para utilizar este endpoint.',
      postmanInstructions: [
        'Abra Postman.',
        'Seleccione el método DELETE.',
        `Ingrese la URL: /api/tickets/eliminar/${id}?admin=true`,
        'Asegúrese de incluir el parámetro de consulta admin=true para tener los permisos necesarios.'
      ]
    };
  }
}