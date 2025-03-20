import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const allowedOrigins = ['http://localhost:4200'];

  // Enable CORS with specified origins, methods, headers, and credentials
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS', // Add PATCH here
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Start the application
  await app.listen(3000);
}

bootstrap();
