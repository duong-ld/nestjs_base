import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ERole } from 'src/constants/entity.constant';
import { EEnvKey } from 'src/constants/env.constant';
import { UsersService } from 'src/modules/users/data-access/users.service';
import { httpBadRequest, httpUnauthorized } from 'src/share/exceptions/http.exception';

import { IAuthPayload } from '../interfaces/auth.payload';
import { LoginRequestDto, RefreshTokenRequestDto, RegisterRequestDto } from './dtos/auth-request.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(data: LoginRequestDto) {
        const user = await this.usersService.getOne({ email: data.email });

        if (!user) httpBadRequest('User not found!');

        if (user.password !== data.password) httpBadRequest('Wrong password');

        return await this.getToken(user.id, user.role);
    }

    async register(data: RegisterRequestDto) {
        return this.usersService.createUser(data);
    }

    async refreshToken(data: RefreshTokenRequestDto) {
        try {
            const payload = (await this.jwtService.verify(data.refreshToken, {
                secret: this.configService.get<string>(EEnvKey.JWT_REFRESH_SECRET_KEY),
            })) as IAuthPayload;

            const user = this.usersService.getOne({ id: payload.id });

            if (!user) httpUnauthorized('Refresh token not valid');

            return {
                accessToken: this.jwtService.sign({
                    id: payload.id,
                    role: payload.role,
                }),
            };
        } catch (err) {
            httpUnauthorized('Refresh token not valid');
        }
    }

    async getToken(id: string, role: ERole) {
        const payload = { id, role } as IAuthPayload;

        const accessToken = this.jwtService.sign(payload);
        const refeshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>(EEnvKey.JWT_REFRESH_SECRET_KEY),
            expiresIn: this.configService.get<number>(EEnvKey.JWT_REFRESH_EXPIRATION_TIME),
        });

        return { accessToken, refeshToken };
    }
}
