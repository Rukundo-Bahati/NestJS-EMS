import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost) 
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
 
  app.enableCors()
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Employee Management API')
    .setDescription('REST API documentation for employee management system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();