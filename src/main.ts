import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EEnvKey } from './constants/env.constant';
import { initSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.setGlobalPrefix(configService.get<string>(EEnvKey.GLOBAL_PREFIX) || 'api');
    app.enableCors();

    // Swagger
    const swaggerPath = configService.get<string>(EEnvKey.SWAGGER_PATH);
    if (swaggerPath) {
        initSwagger(app, swaggerPath);
    }

    await app.listen(configService.get<number>(EEnvKey.PORT) || 3000);
}
bootstrap();
