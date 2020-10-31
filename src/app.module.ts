import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService, UserController, UserModule } from '../users'

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    //TODO: initialize cities and countries
  }
}
