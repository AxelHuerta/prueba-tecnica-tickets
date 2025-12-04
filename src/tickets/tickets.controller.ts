import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Prisma, Status } from "generated/prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { TicketsService } from "src/tickets/tickets.service";

@ApiTags('tickets')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("tickets")
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los tickets', description: 'Retorna todos los tickets asociados al usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Lista de tickets obtenida exitosamente' })
    @ApiResponse({ status: 401, description: 'Token de autenticación faltante o inválido' })
    async findAll(@Request() req) {
        try {
            const userId = Number(req.user.sub);
            const getTickets = await this.ticketService.tickets(userId);
            return {
                status: "ok",
                data: getTickets,
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo ticket', description: 'Crea un nuevo ticket asociado al usuario autenticado' })
    @ApiBody({
        description: 'Datos del nuevo ticket',
        schema: {
            type: 'object',
            required: ['titulo', 'descripcion', 'estatus'],
            properties: {
                titulo: { type: 'string', example: 'Error en el login' },
                descripcion: { type: 'string', example: 'Los usuarios no pueden iniciar sesión' },
                estatus: { type: 'string', enum: ['PENDIENTE', 'EN_PROCESO', 'TERMINADO'], example: 'PENDIENTE' }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Ticket creado exitosamente' })
    @ApiResponse({ status: 401, description: 'Token de autenticación faltante o inválido' })
    async create(@Body() ticketData: Prisma.TicketCreateInput, @Request() req) {
        try {
            const userId = Number(req.user.sub);

            // Asignar el userId del token al ticket
            const ticketWithUser = {
                ...ticketData,
                user: {
                    connect: { id: userId },
                },
            };

            const createdTicket = await this.ticketService.createTicket(
                ticketWithUser,
            );
            return {
                status: "ok",
                data: createdTicket,
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }

    @Put(":id")
    @ApiOperation({ summary: 'Actualizar un ticket completo', description: 'Actualiza todos los campos de un ticket existente' })
    @ApiParam({ name: 'id', description: 'ID del ticket a actualizar', type: 'integer', example: 1 })
    @ApiBody({
        description: 'Datos actualizados del ticket',
        schema: {
            type: 'object',
            properties: {
                titulo: { type: 'string', example: 'Error en el login - Actualizado' },
                descripcion: { type: 'string', example: 'Problema resuelto parcialmente' },
                estatus: { type: 'string', enum: ['PENDIENTE', 'EN_PROCESO', 'TERMINADO'], example: 'EN_PROCESO' }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Ticket actualizado exitosamente' })
    @ApiResponse({ status: 400, description: 'ID inválido o error al actualizar' })
    @ApiResponse({ status: 401, description: 'Token de autenticación faltante o inválido' })
    @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
    async update(
        @Body() ticketData: Prisma.TicketUpdateInput,
        @Param("id") id: string,
        @Request() req,
    ) {
        try {
            const idNumber = Number(id);
            if (Number.isNaN(idNumber)) {
                return {
                    status: "error",
                    data: "El ID proporcionado no es un número válido.",
                };
            }

            const userId = Number(req.user.sub);
            const updatedTicket = await this.ticketService.updateTicket(
                idNumber,
                ticketData,
                userId,
            );
            return {
                status: "ok",
                data: updatedTicket,
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }

    @Patch(":id/status")
    @ApiOperation({ summary: 'Actualizar el estatus de un ticket', description: 'Actualiza únicamente el estatus de un ticket existente' })
    @ApiParam({ name: 'id', description: 'ID del ticket a actualizar', type: 'integer', example: 1 })
    @ApiBody({
        description: 'Nuevo estatus del ticket',
        schema: {
            type: 'object',
            required: ['estatus'],
            properties: {
                estatus: { type: 'string', enum: ['PENDIENTE', 'EN_PROCESO', 'TERMINADO'], example: 'TERMINADO' }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Estatus del ticket actualizado exitosamente' })
    @ApiResponse({ status: 400, description: 'ID inválido o estatus faltante' })
    @ApiResponse({ status: 401, description: 'Token de autenticación faltante o inválido' })
    @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
    async updateStatus(
        @Param("id") id: string,
        @Body("estatus") estatus: Status,
        @Request() req,
    ) {
        if (!estatus) {
            return { status: "error", data: "El estatus es requerido." };
        }

        const idNumber = Number(id);
        if (Number.isNaN(idNumber)) {
            return {
                status: "error",
                data: "El ID proporcionado no es un número válido.",
            };
        }

        const userId = Number(req.user.sub);

        try {
            const updatedStatusTicket = await this.ticketService.updateStatus(
                idNumber,
                estatus,
                userId,
            );
            return {
                status: "ok",
                data: updatedStatusTicket,
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Eliminar un ticket', description: 'Elimina un ticket existente del usuario autenticado' })
    @ApiParam({ name: 'id', description: 'ID del ticket a eliminar', type: 'integer', example: 1 })
    @ApiResponse({ status: 200, description: 'Ticket eliminado exitosamente' })
    @ApiResponse({ status: 400, description: 'ID inválido o error al eliminar' })
    @ApiResponse({ status: 401, description: 'Token de autenticación faltante o inválido' })
    @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
    async delete(@Param("id") id: string, @Request() req) {
        const idNumber = Number(id);
        if (Number.isNaN(idNumber)) {
            return {
                status: "error",
                data: "El ID proporcionado no es un número válido.",
            };
        }

        const userId = Number(req.user.sub);

        try {
            const deletedTicket = await this.ticketService.deleteTicket(
                idNumber,
                userId,
            );
            return {
                status: "ok",
                data: deletedTicket,
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }
}
