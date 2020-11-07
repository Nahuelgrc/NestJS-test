import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserPresenter } from '../presenters/user.presenter';

@Controller('users')
export class UserController {
  private readonly userPresenter: UserPresenter;

  constructor(userPresenter: UserPresenter) {
    this.userPresenter = userPresenter;
  }

  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('street') street: string,
    @Body('cityId') cityId: number): Promise<any> {
    return await this.userPresenter.createUser(username, password, name, street, cityId);
  }

  @Get(':id')
  async getUserProfile(
    @Param('id') userId: number): Promise<any> {
    return await this.userPresenter.getUserProfile(userId);
  }

  @Put()
  async updateUserProfile(
    @Body('userId') userId: number,
    @Body('name') name: string,
    @Body('street') street: string,
    @Body('cityId') cityId: number,
    @Body('countryId') countryId: number): Promise<any> {
    return await this.userPresenter.updateUserProfile(userId, street, cityId, countryId);
  }
}
