import { Module } from "@nestjs/common";
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule],
  providers: [TicketsService, PrismaService],
  controllers: [TicketsController]
})
export class TicketsModule {}
