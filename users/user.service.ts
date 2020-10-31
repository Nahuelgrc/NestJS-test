import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { User } from '.';

@Injectable()
export class UserService {

  async find(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const ret: User = {
        "id": 25,
        "username": "zxcv",
        "password": "asdf",
      };
      resolve(ret);
    });
  }

  createUser(): any {
    return 'Hello World!';
  }
}
