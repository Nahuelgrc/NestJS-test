import { Module } from "@nestjs/common";
import { UserController, UserService } from ".";

@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {

}