import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/config/caching/caching.service';
import { ECacheKey } from 'src/constants/cache.constant';
import { BasePaginationResponseDto } from 'src/share/dtos/base-pagination-response.dto';
import { httpBadRequest } from 'src/share/exceptions/http.exception';

import { ICreateUser } from '../interfaces/create.interface';
import { QueryUserDto } from './dtos/user.request';
import { ListUserRequestDto } from './dtos/user.request';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepo: UsersRepository, private readonly cachingService: CachingService) {}

    // how to use cache
    async getAll(options: ListUserRequestDto) {
        const users = await this.cachingService.get(`${ECacheKey.USERS}/option?${JSON.stringify(options)}`, () =>
            this.usersRepo.getAll(options),
        );

        return BasePaginationResponseDto.convertToPaginationResponse(users);
    }

    async getOne(options: QueryUserDto) {
        const user = await this.usersRepo.getOne(options);

        if (!user) httpBadRequest('User not found');
        return user;
    }

    async createUser(data: ICreateUser) {
        const user = await this.usersRepo.getOne({ email: data.email });

        if (user) httpBadRequest('User with this email already exsist!');

        const newUser = this.usersRepo.create(data);
        return this.usersRepo.save(newUser);
    }
}
