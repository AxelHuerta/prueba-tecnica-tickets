import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TicketsModule } from "./tickets/tickets.module";
import { TicketsService } from "./tickets/tickets.service";
import { TicketsController } from "./tickets/tickets.controller";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      models: [],
    }),
    TicketsModule,
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class AppModule {}
