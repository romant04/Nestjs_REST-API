import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { TodoModule } from './user/todos/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost/todos',
    ),
    AuthModule,
    UserModule,
    TodoModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
        children: [
          {
            path: 'todos',
            module: TodoModule,
          },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
