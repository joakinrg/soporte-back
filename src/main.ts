import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://192.168.20.96:3000',
      'http://192.168.1.70:8081',
      'http://192.168.66.212:8081',
      'http://192.168.253.0.13:8081',
      'https://ramble-client-r7f7hrw42-zenith16fs-projects.vercel.app',
      'https://ramble-client.vercel.app',
      'https://ramble-soporte.vercel.app',
      'https://ramble-admin.vercel.app',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api/support');

  const config = new DocumentBuilder()
    .setTitle('Ramble Backend-Soporte')
    .setDescription('The Ramble REST API for Support description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/soporte', app, document);

  await app.listen(process.env.PORT || 7000);
}
bootstrap();
