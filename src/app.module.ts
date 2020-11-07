import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { DatabaseModule } from './database/database.module';
import { RedisCacheModule } from "./cache/redisCache.module";
import { UserPresenter } from './presenters/user.presenter';
import { UserService, AddressService } from './services';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, RedisCacheModule],
  controllers: [UserController],
  providers: [UserService, AddressService, UserPresenter],
})

export class AppModule { }
