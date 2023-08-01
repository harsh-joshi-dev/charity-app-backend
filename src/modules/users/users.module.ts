import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './users.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}