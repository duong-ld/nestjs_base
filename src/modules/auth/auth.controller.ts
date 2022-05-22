import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GuardPublic } from 'src/guards/public.guard';

import { AuthService } from './data-access/auth.service';
import { LoginRequestDto, RefreshTokenRequestDto, RegisterRequestDto } from './data-access/dtos/auth-request.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @GuardPublic()
    @UseInterceptors(ClassSerializerInterceptor)
    login(@Body() body: LoginRequestDto) {
        return this.authService.login(body);
    }

    @Post('register')
    @GuardPublic()
    @UseInterceptors(ClassSerializerInterceptor)
    register(@Body() body: RegisterRequestDto) {
        return this.authService.register(body);
    }

    @Post('refresh-token')
    @GuardPublic()
    refreshToken(@Body() body: RefreshTokenRequestDto) {
        return this.authService.refreshToken(body);
    }
}
