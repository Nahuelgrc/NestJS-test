import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { DatabaseModule } from './database/database.module';
import { UserPresenter } from './presenters/user.presenter';
import { UserService } from './users/user.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserPresenter],
})

export class AppModule { }
