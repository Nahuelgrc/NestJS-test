import { HttpException, Injectable } from '@nestjs/common';
import { CreateProfileModel, UpdateProfileModel } from 'src/models';
import { AddressService, UserService } from 'src/services';
import { convertProfile } from '../common/mapper';
import { RedisCacheService } from '../cache/redisCache.service';

@Injectable()
export class UserPresenter {
    private readonly userService: UserService;
    private readonly addressService: AddressService;
    private readonly redisCacheService: RedisCacheService;

    constructor(userService: UserService, addressService: AddressService, redisCacheService: RedisCacheService) {
        this.userService = userService;
        this.addressService = addressService;
        this.redisCacheService = redisCacheService;
    }

    async updateUserProfile(profileId: number, street: string, cityId: number, countryId: number): Promise<void> {
        try {
            let updateAddress = false;
            if (process.env.ALLOW_CACHE) {
                const profile = await this.redisCacheService.get(profileId);
                if(profile.street !== street || profile.cityId !== cityId) {
                    updateAddress = true;
                }
            }
            const updateProfileModel = new UpdateProfileModel(profileId, street, cityId, countryId);
            const res = await this.userService.updateUserProfile(updateProfileModel, updateAddress);
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }

    async createUser(username: string, password: string, name: string, street: string, cityId: number): Promise<any> {
        try {
            const createProfileModel = new CreateProfileModel(username, password, name, street, cityId);
            const res = this.userService.createUserProfile(createProfileModel);
            return {
                id: `${res}`
            };
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }

    async getUserProfile(userId: number): Promise<any> {
        try {
            console.log('presenter');
            const res = await this.userService.getUserProfileByUserId(userId);
            return convertProfile(res);
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }
}