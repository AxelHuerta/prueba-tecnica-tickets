import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TicketsModule } from "./tickets/tickets.module";
import { TicketsService } from "./tickets/tickets.service";
import { TicketsController } from "./tickets/tickets.controller";
import { PrismaService } from "./prisma.service";
import { PrismaModule } from "./prisma.module";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    TicketsModule,
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  providers: [TicketsService, PrismaService],
  controllers: [TicketsController],
})
export class AppModule {}
