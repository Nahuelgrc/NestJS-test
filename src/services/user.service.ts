import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/IUserService';
import { CreateProfileModel, UpdateProfileModel } from '../models';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(process.env.DATABASE_PROVIDER) private conn: any) { }

  async getUserProfileByUserId(userId: number): Promise<any> {
    try {
      const res = await this.conn.query(`SELECT pro.id, pro.name AS profileName, ad.street, ci.name as cityName, co.name as countryName FROM Profile pro INNER JOIN AppUser us ON pro.userId = us.id INNER JOIN Address ad ON pro.addressId = ad.id INNER JOIN City ci ON ad.cityId = ci.id INNER JOIN Country co ON ci.countryId = co.id AND us.id = ${userId};`);
      return res.rows[0];
    } catch (error) {
      console.error(`Error while querying table on method getUserProfile - Reason:`, error)
      throw error;
    }
  }

  async createUserProfile(createProfileModel: CreateProfileModel): Promise<any> {
    let table: string;
    try {
      await this.conn.query('begin');
      let res: any;
      table = 'AppUser';
      res = await this.conn.query(`INSERT INTO AppUser(username, password) VALUES ('${createProfileModel.username}', '${createProfileModel.password}') RETURNING id`);
      const userId = res.rows[0].id;

      table = 'Address';
      res = await this.conn.query(`INSERT INTO Address(cityId, street) VALUES (${createProfileModel.cityId}, '${createProfileModel.street}') RETURNING id`);
      const addressId = res.rows[0].id;

      table = 'Profile';
      res = await this.conn.query(`INSERT INTO Profile(userId, addressId, name) VALUES (${userId}, ${addressId}, '${createProfileModel.name}') RETURNING id`);

      await this.conn.query('commit');
      return res.rows[0];
    } catch (error) {
      console.error(`Error while inserting into table: ${table} - Reason:`, error)
      await this.conn.query("rollback");
      throw error;
    }
  }

  async updateUserProfile(updateProfileModel: UpdateProfileModel): Promise<any> {
    let table: string;
    try {
      await this.conn.query('begin');

      table = 'Address';
      await this.conn.query(`UPDATE Address ad SET street = '${updateProfileModel.street}', cityId = ${updateProfileModel.cityId} FROM Profile pro WHERE pro.addressId = ad.id AND pro.id = ${updateProfileModel.userProfileId};`);

      table = 'Profile';
      const res = await this.conn.query(`UPDATE Profile SET name = '${updateProfileModel.name}' WHERE id = ${updateProfileModel.userProfileId} RETURNING id;`);
      await this.conn.query('commit');

      return res.rows[0];
    } catch (error) {
      console.error(`Error while updating table: ${table} - Reason:`, error)
      await this.conn.query("rollback");
      throw error;
    }
  }
}
