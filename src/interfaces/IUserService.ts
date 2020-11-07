import { UpdateProfileModel } from 'src/models/updateProfile.model';
import { CreateProfileModel } from '../models';

export interface IUserService {
    createUserProfile(createProfile: CreateProfileModel): Promise<any>;
    getUserProfileByUserId(userId: number): Promise<any>;
    updateUserProfile(updateProfile: UpdateProfileModel): Promise<any>;
}