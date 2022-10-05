import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

function createSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Fulefinance Task')
    .setDescription('Fulefinance Task API')
    .setVersion('1.0')
    .addBasicAuth({
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('spec', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  if (process.env.ENV === 'development') {
    createSwagger(app);
  }
  await app.listen(process.env.PORT);
  Logger.log(`App is running on port: ${process.env.PORT}`);
}
bootstrap();
