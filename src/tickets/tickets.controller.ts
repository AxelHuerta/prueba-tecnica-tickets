import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
} from "@nestjs/common";
import { Prisma, Status } from "generated/prisma/client";
import { TicketsService } from "src/tickets/tickets.service";

@Controller("tickets")
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) {}

    @Get()
    async findAll() {
        try {
            const getTickets = await this.ticketService.tickets();
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
    async create(@Body() ticketData: Prisma.TicketCreateInput) {
        try {
            const createdTicket = await this.ticketService.createTicket(
                ticketData,
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
    ) {
        try {
            const idNumber = Number(id);
            if (Number.isNaN(idNumber)) {
                return {
                    status: "error",
                    data: "El ID proporcionado no es un número válido.",
                };
            }
            const updatedTicket = await this.ticketService.updateTicket(
                idNumber,
                ticketData,
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

        try {
            const updatedStatusTicket = await this.ticketService.updateStatus(
                idNumber,
                estatus,
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
    async delete(@Param("id") id: string) {
        const idNumber = Number(id);
        if (Number.isNaN(idNumber)) {
            return {
                status: "error",
                data: "El ID proporcionado no es un número válido.",
            };
        }

        try {
            const deletedTicket = await this.ticketService.deleteTicket(
                idNumber,
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
