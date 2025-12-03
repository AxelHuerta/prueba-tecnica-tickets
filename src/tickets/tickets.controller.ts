import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import Ticket from "src/models/ticket";
import { TicketsService } from "src/tickets/tickets.service";

@Controller("tickets")
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) {}

    @Get()
    findAll() {
        try {
            const getTickets = async () => {
                return {
                    status: "ok",
                    data: await this.ticketService.getTickets(),
                };
            };

            getTickets();
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }

    @Post()
    create(@Body() ticketData: Partial<Ticket>) {
        try {
            return {
                status: "ok",
                data: this.ticketService.createTicket(ticketData),
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }

    @Put(":id")
    update(@Body() ticketData: Partial<Ticket>, @Body("id") id: number) {
        try {
            return {
                status: "ok",
                data: this.ticketService.updateTicket(id, ticketData),
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }

    @Put(":id/status")
    updateStatus(@Body() ticketData: Partial<Ticket>, @Body("id") id: number) {
        if (!ticketData.estatus) {
            return { status: "error", data: "El estatus es requerido." };
        }

        try {
            return {
                status: "ok",
                data: this.ticketService.updateStatus(id, ticketData.estatus),
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }

    @Delete(":id")
    delete(@Body("id") id: number) {
        try {
            return {
                status: "ok",
                data: this.ticketService.deleteTicket(id),
            };
        } catch (error) {
            return {
                status: "error",
                data: error.message,
            };
        }
    }
}
