import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { EEnvKey } from 'src/constants/env.constant';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
            validationSchema: Joi.object({
                [EEnvKey.NODE_ENV]: Joi.string().valid('development', 'production', 'test').default('development'),
                [EEnvKey.PORT]: Joi.number().default(3000),
                [EEnvKey.GLOBAL_PREFIX]: Joi.string(),
                [EEnvKey.SWAGGER_PATH]: Joi.string(),
                [EEnvKey.CACHE_TTL]: Joi.number().default(60),

                [EEnvKey.DB_HOST]: Joi.string().default('localhost'),
                [EEnvKey.DB_PORT]: Joi.number().default(3306),
                [EEnvKey.DB_USERNAME]: Joi.string(),
                [EEnvKey.DB_PASSWORD]: Joi.string(),
                [EEnvKey.DB_DATABASE]: Joi.string(),

                [EEnvKey.JWT_SECRET_KEY]: Joi.string(),
                [EEnvKey.JWT_REFRESH_SECRET_KEY]: Joi.string(),
                [EEnvKey.JWT_EXPIRATION_TIME]: Joi.number().default(3600),
                [EEnvKey.JWT_REFRESH_EXPIRATION_TIME]: Joi.number().default(86400),
            }),
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigurationModule {}
