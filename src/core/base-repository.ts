import { ETableName } from 'src/constants/entity.constant';
import { IPagination } from 'src/share/interface/pagination.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';

export abstract class BaseRepository<E> extends Repository<E> {
    protected abstract alias: ETableName;

    protected createQb() {
        return this.createQueryBuilder(this.alias);
    }

    protected queryBuilderAddPagination(query: SelectQueryBuilder<E>, data: Partial<IPagination>) {
        if (typeof data !== 'object') {
            return query;
        }

        if (data.limit) {
            query.take(data.limit);
        }

        if (data.page) {
            query.skip((data.page - 1) * data.limit);
        }

        return query;
    }
}
