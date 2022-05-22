import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EEnvKey } from 'src/constants/env.constant';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './data-access/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ({
                    secret: configService.get<string>(EEnvKey.JWT_SECRET_KEY),
                    signOptions: {
                        expiresIn: configService.get<number>(EEnvKey.JWT_EXPIRATION_TIME),
                    },
                } as JwtModuleOptions),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
