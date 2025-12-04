import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { Prisma } from "generated/prisma/client";

@ApiTags('users')
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario', description: 'Registra un nuevo usuario en el sistema' })
  @ApiBody({
    description: 'Datos del nuevo usuario',
    schema: {
      type: 'object',
      required: ['email', 'password', 'name'],
      properties: {
        email: { type: 'string', format: 'email', example: 'usuario@ejemplo.com' },
        password: { type: 'string', format: 'password', example: 'contraseña123' },
        name: { type: 'string', example: 'Juan Pérez' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en la creación del usuario' })
  async create(@Body() userData: Prisma.UserCreateInput) {
    try {
      const createdUser = await this.usersService.create(userData);
      return {
        status: "ok",
        data: {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
        },
      };
    } catch (error) {
      return {
        status: "error",
        data: error.message,
      };
    }
  }
}
