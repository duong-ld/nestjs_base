import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CachingModule } from './config/caching/caching.module';
import { ConfigurationModule } from './config/config.module';
import { MySQLModule } from './config/mysql.module';
import { GlobalGuardModule } from './guards/global-guard.module';
import { MODULES } from './modules';
import { GlobalInterceptorModule } from './share/interceptors/global-interceptor.module';
import { LoggerMiddleware } from './share/middleware/logger.middleware';
import { ValidationPipeModule } from './share/pipes/validation-pipe.module';

@Module({
    imports: [
        ConfigurationModule,
        GlobalInterceptorModule,
        MySQLModule,
        CachingModule,
        ValidationPipeModule,
        GlobalGuardModule,
        ...MODULES,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
