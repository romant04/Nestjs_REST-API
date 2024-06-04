import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { TodoSchema } from './schemas/todo.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost/todos',
    ),
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule {}
