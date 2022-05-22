import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ICreateUser } from 'src/modules/users/interfaces/create.interface';

@Exclude()
export class LoginRequestDto {
    @ApiProperty({ required: true })
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: true })
    @Expose()
    @IsString()
    @IsNotEmpty()
    password: string;
}

@Exclude()
export class RegisterRequestDto implements ICreateUser {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    password: string;
}

@Exclude()
export class RefreshTokenRequestDto {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}
