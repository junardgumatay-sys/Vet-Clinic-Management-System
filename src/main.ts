import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const isProd = process.env.NODE_ENV === 'production';

  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // 1. Strict CORS (supports comma-separated FRONTEND_URL origins; blocks wildcard * in prod)
  const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim())
    : isProd
      ? false
      : ['http://localhost:5173', 'http://localhost:3001'];

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // 2. Versioned API prefix
  app.setGlobalPrefix('api/v1');

  // 3. Global validation, DB constraint filter, and @Exclude() serializer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: isProd,
    }),
  );

  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 4. Swagger UI (enabled in dev, or in prod only if ENABLE_SWAGGER=true)
  if (!isProd || process.env.ENABLE_SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Veterinary Clinic Management API')
      .setDescription(
        'API documentation for appointments, clinical records, prescriptions, and billing',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // 5. Graceful shutdown for Docker / cloud hosting restarts
  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`Server running on http://0.0.0.0:${port}/api/v1 (${process.env.NODE_ENV || 'development'})`);
}
void bootstrap();