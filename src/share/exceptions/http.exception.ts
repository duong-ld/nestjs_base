import { BadRequestException, HttpStatus, UnauthorizedException } from '@nestjs/common';

export function httpBadRequest(message?: string, errorCode?: string) {
    throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errorCode,
        message,
    });
}

export function httpUnauthorized(message?: string) {
    throw new UnauthorizedException(message);
}
