import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorsInterceptor } from './app/shared/Error/AppError.interceptor';
import { ValidationPipe } from './app/shared/Pipes/validation.pipe';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('CDA - Challenge Badges')
    .setDescription('This is challenge of CDA')
    .setVersion('0.1')
    .build()
  )
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: "*"
  })

  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();