import { HttpException, Injectable } from '@nestjs/common';
import { CreateProfileModel } from 'src/models';
import { UpdateProfileModel } from 'src/models/updateProfile.model';
import { UserService } from 'src/users/user.service';
import { convertProfile } from '../common/mapper';

@Injectable()
export class UserPresenter {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async updateUser(userId: number, password: string, name: string, street: string, cityId: number, countryId: number) {
        try {
            const createProfileModel = new UpdateProfileModel(userId, password, name, street, cityId, countryId);
            const res = await this.userService.updateUserProfile(createProfileModel);
            return {
                data: `${res}`
            };
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }

    async createUser(username: string, password: string, name: string, street: string, cityId: number): Promise<any> {
        try {
            const createProfileModel = new CreateProfileModel(username, password, name, street, cityId);
            const res = await this.userService.createUserProfile(createProfileModel);
            return {
                id: `${res}`
            };
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }

    async getUser(userId: number): Promise<any> {
        try {
            const res = await this.userService.getUserProfile(userId);
            return convertProfile(res);
        } catch (error) {
            throw new HttpException('There was an error: ' + error, 400);
        }
    }
}