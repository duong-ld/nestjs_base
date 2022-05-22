import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class BasePaginationRequestDto {
    @ApiProperty({ required: false })
    @Min(1)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page: number;

    @ApiProperty({ required: false })
    @Min(1)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}
