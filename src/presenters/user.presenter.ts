import { HttpException, Injectable } from '@nestjs/common';
import { CreateProfileModel, UpdateProfileModel } from 'src/models';
import { UserService } from 'src/services';
import { convertProfile } from '../common/mapper';
import { RedisCacheService } from '../cache/redisCache.service';

@Injectable()
export class UserPresenter {
    private readonly userService: UserService;
    private readonly redisCacheService: RedisCacheService;

    constructor(userService: UserService, redisCacheService: RedisCacheService) {
        this.userService = userService;
        this.redisCacheService = redisCacheService;
    }

    async getUserProfile(userId: number): Promise<any> {
        try {
            const getUserProfileByUserId = (userId) => async () => (await this.userService.getUserProfileByUserId(userId));
            const res = await this.redisCacheService.withCache(userId, getUserProfileByUserId(userId));
            return convertProfile(res);
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }

    async createUser(username: string, password: string, name: string, street: string, cityId: number): Promise<any> {
        try {
            //Set the CreateProfileModel with the encrypted password
            const createProfileModel = new CreateProfileModel(username, password, name, street, cityId);
            return await this.userService.createUserProfile(createProfileModel);
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }

    async updateUserProfile(userProfileId: number, name: string, street: string, cityId: number): Promise<void> {
        try {
            const updateProfileModel = new UpdateProfileModel(userProfileId, name, street, cityId);
            const res = await this.userService.updateUserProfile(updateProfileModel);
            return res;
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }
}