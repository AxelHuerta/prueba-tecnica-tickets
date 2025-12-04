import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
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
        @Body("id") id: number,
    ) {
        try {
            const updatedTicket = await this.ticketService.updateTicket(
                id,
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

    @Put(":id/status")
    async updateStatus(@Body("id") id: number, @Body() estatus: Status) {
        if (!estatus) {
            return { status: "error", data: "El estatus es requerido." };
        }

        try {
            const updatedStatusTicket = await this.ticketService.updateStatus(
                id,
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
    async delete(@Body("id") id: number) {
        try {
            const deletedTicket = await this.ticketService.deleteTicket(id);
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
