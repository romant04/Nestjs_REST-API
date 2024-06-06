import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from '../schemas/todo.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from '../schemas/user.schema';
import { MongoIdMiddleware } from '../middleware/mongo-id.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MongoIdMiddleware).forRoutes(UserController);
  }
}
