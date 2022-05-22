import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from './data-access/users.repository';
import { UsersService } from './data-access/users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
