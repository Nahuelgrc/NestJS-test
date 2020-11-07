import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RedisCacheService } from '../cache/redisCache.service';
import { IAddressService } from 'src/interfaces';

@Injectable()
export class AddressService implements OnModuleInit, IAddressService {
  constructor(@Inject(process.env.DATABASE_PROVIDER) private conn: any, private readonly redisCacheService: RedisCacheService,) { }

  onModuleInit() {
    if (process.env.ALLOW_CACHE) {
      this.getAddresses().then(res => {
        res.rows.forEach(address => {
          console.log(address);
          this.redisCacheService.set(address.id, address);
        })
      });
    }
  }

  async getAddresses(): Promise<any> {
    try {
      return this.conn.query(`SELECT pro.id, ad.id AS addressId, ad.street, ci.id AS cityId, co.id as countryId FROM Profile pro INNER JOIN AppUser us ON pro.userId = us.id INNER JOIN Address ad ON pro.addressId = ad.id INNER JOIN City ci ON ad.cityId = ci.id INNER JOIN Country co ON ci.countryId = co.id;`);
    } catch (error) {
      console.error(`Error while querying table on method getAddresses - Reason:`, error)
      throw error;
    }
  }
}