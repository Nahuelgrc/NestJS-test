import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
    ) { }

    private async get(key): Promise<any> {
        return await this.cache.get(key);
    }

    private async set(key, value) {
        await this.cache.set(key, value);
    }

    public async withCache(key, getDataFunction) {
        let value = await this.get(key);

        if (!value) {
            value = await getDataFunction();
            this.set(key, value);
        }
        return value;
    }
}