import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationException } from './shared/exception.shared';
import { ErrorFilter } from './shared/filters/error.filter';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { LoggerApi } from './shared/logger.shared';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new LoggerApi();
  app.useLogger(logger);
  app.enableCors();
  app.use(helmet());
  app.useGlobalInterceptors(
    new LoggerInterceptor(logger),
    new ResponseInterceptor(logger),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new ErrorFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );
  setupSwagger(app);
  await app.listen(process.env.PORT || 3000);
}

function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('UTFPR Distributed Systems Chat API')
    .addBearerAuth({
      name: 'Authorization',
      type: 'http',
      scheme: 'bearer',
      description: 'Enter JWT token',
      bearerFormat: 'JWT',
    })
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
