import { Column, Model, Table } from "sequelize-typescript";
import { Status } from "src/enums/status";

@Table
export default class Ticket extends Model {
    @Column
    titulo: string;

    @Column
    descripción: string;

    @Column
    estatus: Status;

    @Column
    fechaCreacion: Date;
}
