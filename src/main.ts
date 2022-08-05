import helmet from "helmet";
import * as compression from "compression";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .setGlobalPrefix("api")
    .use(helmet())
    .use(compression())
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    )
    .enableCors();

  await app.listen(3000);
}

bootstrap();
