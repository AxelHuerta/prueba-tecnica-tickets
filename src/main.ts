import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestión de Tickets')
    .setDescription('API para gestionar tickets y usuarios con autenticación JWT')
    .setVersion('1.0')
    .addBearerAuth() // Para autenticación JWT
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL: http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
