import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserService, User } from '.';

@Controller('users')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  getUser(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<User> {
    return this.userService.find(username, password);
  }

  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('cityId') cityId: Number): Promise<any> {
    console.log(`${username}-${password}-${name}-${address}-${cityId}`);
    return this.userService.createUser();
  }

  @Post()
  login(
    @Body('username') username: string,
    @Body('password') password: string): any {
    return {};
    // return this.userService.getHello();
  }

  @Put()
  updateUser(): void {
    // return this.userService.getHello();
  }
}
