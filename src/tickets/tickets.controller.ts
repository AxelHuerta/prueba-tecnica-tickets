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
import { Prisma, Status } from "generated/prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { TicketsService } from "src/tickets/tickets.service";

@UseGuards(AuthGuard)
@Controller("tickets")
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) {}

    @Get()
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
