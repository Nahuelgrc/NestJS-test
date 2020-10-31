import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/interfaces/IUserService';
import { CreateProfileModel } from 'src/models';
import { UpdateProfileModel } from 'src/models/updateProfile.model';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('PG_CONNECTION') private conn: any) { }

  async updateUserProfile(updateProfileModel: UpdateProfileModel, updateAddress = false): Promise<any> {
    let table: string;
    try {
      await this.conn.query('begin');
      if (updateAddress) {
        table = 'Address';
        const res = await this.conn.query(`UPDATE`);
      }
      const res = await this.conn.query(`UPDATE PROFILE`);
      return res.rows[0];
    } catch (error) {
      console.error(`Error while updating table: ${table} - Reason:`, error)
      await this.conn.query("rollback");
      throw error;
    }
  }

  async getUserProfile(userId: number): Promise<any> {
    let table: string;
    try {
      const res = await this.conn.query(`SELECT pro.id, pro.name AS profileName, ad.street, ci.name as cityName, co.name as countryName FROM Profile pro INNER JOIN AppUser us ON pro.userId = us.id INNER JOIN Address ad ON pro.addressId = ad.id INNER JOIN City ci ON ad.cityId = ci.id INNER JOIN Country co ON ci.countryId = co.id AND us.id = ${userId};`);
      return res.rows[0];
    } catch (error) {
      console.error(`Error while querying table - getUserProfile - Reason:`, error)
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
      return res.rows[0].id;
    } catch (error) {
      console.error(`Error while inserting into table: ${table} - Reason:`, error)
      await this.conn.query("rollback");
      throw error;
    }
  }
}
