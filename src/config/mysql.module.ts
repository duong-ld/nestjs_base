import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EEnvKey } from 'src/constants/env.constant';
import { getConnectionOptions } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const connectionOptions = await getConnectionOptions();
                const host = configService.get<string>(EEnvKey.DB_HOST);
                const port = configService.get<string>(EEnvKey.DB_PORT);
                const username = configService.get<string>(EEnvKey.DB_USERNAME);
                const password = configService.get<string>(EEnvKey.DB_PASSWORD);
                const database = configService.get<string>(EEnvKey.DB_DATABASE);

                return Object.assign(connectionOptions, {
                    host: host || connectionOptions['host'],
                    port: port || connectionOptions['port'],
                    username: username || connectionOptions['username'],
                    password: password || connectionOptions['password'],
                    database: database || connectionOptions['database'],
                    entities: connectionOptions.entities,
                    migrations: connectionOptions.migrations,
                });
            },
        }),
    ],
})
export class MySQLModule {}
