import { Module } from "@nestjs/common";
import { TicketsModule } from "./tickets/tickets.module";
import { TicketsService } from "./tickets/tickets.service";
import { TicketsController } from "./tickets/tickets.controller";
import { PrismaService } from "./prisma.service";
import { PrismaModule } from "./prisma.module";

@Module({
  imports: [
    PrismaModule,
    TicketsModule,
  ],
  providers: [TicketsService, PrismaService],
  controllers: [TicketsController],
})
export class AppModule {}
