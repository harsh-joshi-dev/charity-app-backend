import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './modules/users/users.controller';
import { UserService } from './modules/users/user.service';
import { User, UserSchema } from './modules/users/entity/user.entity';
import { GlobalExceptionFilter } from './common/global-exception.filter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/your_database_name'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, GlobalExceptionFilter],
})
export class AppModule {}
