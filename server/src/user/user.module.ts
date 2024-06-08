import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from '../schemas/todo.schema';
import { UserController } from './user.controller';
import { TodoService } from './todos/todo.service';
import { UserSchema } from '../schemas/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [TodoService, UserService],
})
export class UserModule {}
