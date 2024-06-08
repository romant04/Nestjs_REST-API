import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from '../../schemas/todo.schema';
import { UserSchema } from '../../schemas/user.schema';
import { TodoController } from './todo.controller';
import { MongoIdMiddleware } from '../../middleware/mongo-id.middleware';
import { TodoService } from './todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MongoIdMiddleware).forRoutes(TodoController);
  }
}
