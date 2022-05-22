import { Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/roles/admin.role';

import { ListUserRequestDto } from './data-access/dtos/user.request';
import { UsersService } from './data-access/users.service';

@Controller('users')
@ApiTags('User')
@UseGuards(AdminGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiBearerAuth()
    getAll(@Query() query: ListUserRequestDto) {
        return this.usersService.getAll(query);
    }

    @Get(':id')
    @ApiBearerAuth()
    getOneById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getOne({ id });
    }
}
