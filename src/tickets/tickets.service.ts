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

    tickets(userId: number) {
        return this.prisma.ticket.findMany({ where: { userId } });
    }

    createTicket(data: Prisma.TicketCreateInput): Promise<Ticket> {
        return this.prisma.ticket.create({ data });
    }

    updateTicket(id: number, data: Prisma.TicketUpdateInput, userId: number) {
        return this.prisma.ticket.update({
            where: { id, userId },
            data,
        });
    }

    updateStatus(id: number, estatus: Status, userId: number) {
        return this.prisma.ticket.update({
            where: { id, userId },
            data: { estatus },
        });
    }

    deleteTicket(id: number, userId: number) {
        return this.prisma.ticket.delete({ where: { id, userId } });
    }
}
