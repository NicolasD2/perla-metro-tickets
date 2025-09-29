/**
 * Controlador REST para operaciones de tickets
 * 
 * @description Expone endpoints HTTP para CRUD de tickets con validaciones
 * y endpoints informativos para guiar el uso de la API
 * 
 * @author Nicolás
 */

import { Controller, Get, Post, Body, Param, Query, Patch, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './Dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { UpdateTicketDto } from './Dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  /**
   * Crear nuevo ticket
   * POST /api/tickets/create
   * 
   * @param {CreateTicketDto} createTicketDto - Datos del ticket a crear
   * @returns {Promise<Ticket>} Ticket creado
   */
  @Post('create')
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  /**
   * Listar todos los tickets (requiere admin=true)
   * GET /api/tickets/findAll?admin=true
   * 
   * @param {string} admin - Parámetro que indica permisos de administrador
   * @returns {Promise<Ticket[]>} Lista de tickets activos
   */
  @Get('findAll')
  findAll(@Query('admin') admin: string): Promise<Ticket[]> {
    return this.ticketsService.findAll(admin === 'true');
  }

  /**
   * Buscar ticket por ID
   * GET /api/tickets/find/:id
   * 
   * @param {string} id - ID del ticket a buscar
   * @returns {Promise<Partial<Ticket>>} Ticket encontrado sin campo status
   */
  @Get('find/:id')
  findById(@Param('id') id: string): Promise<Partial<Ticket>> {
    return this.ticketsService.findById(id);
  }

  /**
   * Actualizar ticket por ID
   * PATCH /api/tickets/update/:id
   * 
   * @param {string} id - ID del ticket a actualizar
   * @param {UpdateTicketDto} dto - Datos a actualizar
   * @returns {Promise<Ticket>} Ticket actualizado
   */
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketsService.update(id, dto);
  }

  /**
   * Eliminar ticket por ID usando soft delete (requiere admin=true)
   * DELETE /api/tickets/delete/:id?admin=true
   * 
   * @param {string} id - ID del ticket a eliminar
   * @param {string} admin - Parámetro que indica permisos de administrador
   * @returns {Promise<boolean>} Resultado de la operación
   */
  @Delete('delete/:id')
  softDelete(@Param('id') id: string, @Query('admin') admin : string): Promise<boolean>{
    return this.ticketsService.softDelete(id, admin==='true');
  }

  /**
   * Endpoint informativo para crear tickets
   * GET /api/tickets/create
   * 
   * @returns {object} Instrucciones de uso del endpoint POST create
   */
    @Get('create')
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

  /**
   * Endpoint informativo para actualizar tickets
   * GET /api/tickets/update/:id
   * 
   * @param {string} id - ID del ticket
   * @returns {object} Instrucciones de uso del endpoint PATCH update
   */
    @Get('update/:id')
  updateInfo(@Param('id') id: string){
    return{
      message: "Este endpoint requiere método PATCH para actualizar tickets",
      method: "PATCH",
      url: `/api/tickets/update/${id}`,
      instruction: 'Por favor, utilice Postman, curl, o una herramienta para utilizar este endpoint.',
      postmanInstructions: [
        'Abra Postman.',
        'Seleccione el método PATCH.',
        `Ingrese la URL: /api/tickets/update/${id}`,
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

  /**
   * Endpoint informativo para eliminar tickets
   * GET /api/tickets/delete/:id
   * 
   * @param {string} id - ID del ticket
   * @returns {object} Instrucciones de uso del endpoint DELETE softDelete
   */
    @Get('delete/:id')
  deleteInfo(@Param('id') id: string){
    return{
      message: "Este endpoint requiere método DELETE para eliminar tickets",
      method: "DELETE",
      url: `/api/tickets/delete/${id}?admin=true`,
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