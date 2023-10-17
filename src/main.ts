import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
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
  setupSwagger(app);
  await app.listen(process.env.PORT || 3000);
}

function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('UTFPR Distributed Systems Chat API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
