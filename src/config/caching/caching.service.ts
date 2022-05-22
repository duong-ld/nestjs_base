import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async get(key: string, callbackFn: () => Promise<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.cacheManager.get(key, (err, value) => {
                if (err) reject(err);

                if (value) {
                    resolve(value);
                } else {
                    callbackFn()
                        .then(result => {
                            this.cacheManager.set(key, result);
                            resolve(result);
                        })
                        .catch(err => {
                            reject(err);
                        });
                }
            });
        });
    }

    async set(key: string, value: any, ttl?: number) {
        if (ttl) {
            await this.cacheManager.set(key, value, {
                ttl: ttl,
            });
        } else {
            await this.cacheManager.set(key, value);
        }
    }

    async delete(key: string) {
        await this.cacheManager.del(key);
    }

    async reset() {
        await this.cacheManager.reset();
    }
}
