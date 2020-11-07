import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RedisCacheService } from '../cache/redisCache.service';
import { AddressService } from './address.service';

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(private readonly redisCacheService: RedisCacheService, private readonly addressService: AddressService) { }

  onModuleInit() {
    if (process.env.ALLOW_CACHE) {
      this.addressService.getAddresses().then(res => {
        res.rows.forEach(address => {
          console.log(address);
          this.redisCacheService.set(address.id, address);
        })
      });
    }
  }
}