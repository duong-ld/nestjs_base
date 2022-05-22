import { CacheModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EEnvKey } from 'src/constants/env.constant';

import { CachingService } from './caching.service';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ttl: configService.get<number>(EEnvKey.CACHE_TTL),
            }),
        }),
    ],
    providers: [CachingService],
    exports: [CachingService],
})
export class CachingModule {}
