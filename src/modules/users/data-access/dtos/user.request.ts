import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { BasePaginationRequestDto } from 'src/share/dtos/base-pagination-request.dto';

export class ListUserRequestDto extends BasePaginationRequestDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsEmail()
    @IsOptional()
    email: string;
}

export class QueryUserDto {
    id?: string;
    email?: string;
}
