import { UpdateProfileModel } from 'src/models/updateProfile.model';
import { CreateProfileModel } from '../models';

export interface IUserService {
    createUserProfile(createProfile: CreateProfileModel): Promise<any>;
    getUserProfile(userId: number): Promise<any>;
    updateUserProfile(updateProfile: UpdateProfileModel): Promise<any>;
}