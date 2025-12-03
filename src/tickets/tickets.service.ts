import { Injectable } from "@nestjs/common";
import { Status } from "src/enums/status";
import Ticket from "src/models/ticket";

@Injectable()
export class TicketsService {
    getTickets() {
        return Ticket.findAll();
    }

    createTicket(data: Partial<Ticket>) {
        return Ticket.create(data);
    }

    updateTicket(id: number, data: Partial<Ticket>) {
        return Ticket.update(data, { where: { id } });
    }

    updateStatus(id: number, estatus: Status) {
        return Ticket.update({ estatus }, { where: { id } });
    }

    deleteTicket(id: number) {
        return Ticket.destroy({ where: { id } });
    }
}
