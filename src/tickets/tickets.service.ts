import { Injectable } from "@nestjs/common";
import { Prisma, Status, Ticket } from "generated/prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TicketsService {
    constructor(private readonly prisma: PrismaService) {}

    async ticket(
        ticketWhereUniqueInput: Prisma.TicketWhereUniqueInput,
    ): Promise<Ticket | null> {
        return this.prisma.ticket.findUnique({
            where: ticketWhereUniqueInput,
        });
    }

    tickets() {
        return this.prisma.ticket.findMany();
    }

    createTicket(data: Prisma.TicketCreateInput): Promise<Ticket> {
        return this.prisma.ticket.create({ data });
    }

    updateTicket(id: number, data: Prisma.TicketUpdateInput) {
        return this.prisma.ticket.update({
            where: { id },
            data,
        });
    }

    updateStatus(id: number, estatus: Status) {
        return this.prisma.ticket.update({
            where: { id },
            data: { estatus },
        });
    }

    deleteTicket(id: number) {
        return this.prisma.ticket.delete({ where: { id } });
    }
}
