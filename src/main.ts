import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'; // ✅ هنا ضيف ClassSerializerInterceptor
import { RolesGuard } from './auth/roles.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
