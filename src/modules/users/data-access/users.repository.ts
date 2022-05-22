import { ETableName } from 'src/constants/entity.constant';
import { BaseRepository } from 'src/core/base-repository';
import { User } from 'src/entities/user.entity';
import { transformQuery } from 'src/share/utils/transform-query';
import { EntityRepository } from 'typeorm';

import { QueryUserDto } from './dtos/user.request';
import { ListUserRequestDto } from './dtos/user.request';

@EntityRepository(User)
export class UsersRepository extends BaseRepository<User> {
    protected alias: ETableName = ETableName.USER;

    getAll(options: ListUserRequestDto) {
        const qb = this.createQb();

        if (options.name) {
            qb.where(`${this.alias}.name LIKE :name`, { name: `%${transformQuery(options.name)}%` });
        }
        if (options.email) {
            qb.andWhere(`${this.alias}.email = :email`, { email: transformQuery(options.email) });
        }

        this.queryBuilderAddPagination(qb, options);
        return qb.getManyAndCount();
    }

    getOne(options: QueryUserDto) {
        const qb = this.createQb();

        if (options.id) {
            qb.where(`${this.alias}.id = :id`, { id: transformQuery(options.id) });
        }

        if (options.email) {
            qb.andWhere(`${this.alias}.email = :email`, { email: `${transformQuery(options.email)}` });
        }

        return qb.getOne();
    }
}
