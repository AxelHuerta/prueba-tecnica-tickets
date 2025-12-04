import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica un usuario y retorna un token JWT' })
    @ApiBody({
        description: 'Credenciales de inicio de sesión',
        schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string', format: 'email', example: 'usuario@ejemplo.com' },
                password: { type: 'string', format: 'password', example: 'contraseña123' }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Login exitoso', schema: {
        type: 'object',
        properties: {
            access_token: { type: 'string', description: 'Token JWT para autenticación' }
        }
    }})
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    signIn(@Body() data: { email: string; password: string }) {
        try {
            return this.authService.signIn(data.email, data.password);
        } catch (error) {
            return {
                status: "error",
                data: "Credenciales inválidas",
            };
        }
    }
}
