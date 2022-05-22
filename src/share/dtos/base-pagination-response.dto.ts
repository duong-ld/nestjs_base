import { ApiProperty } from '@nestjs/swagger';

export class BasePaginationResponseDto<T> {
    @ApiProperty()
    total: number;

    data: T[];

    static convertToPaginationResponse<T>(data: [any[], number], currentPage?: number) {
        return {
            data: data[0],
            total: data[1],
            currentPage,
        } as BasePaginationResponseDto<T>;
    }
}
