import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Prisma } from "generated/prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: Prisma.UserCreateInput) {
    try {
      const createdUser = await this.usersService.create(userData);
      return {
        status: "ok",
        data: createdUser,
      };
    } catch (error) {
      return {
        status: "error",
        data: error.message,
      };
    }
  }
}
