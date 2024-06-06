import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserService } from './user.service';
import { Todo } from '../schemas/todo.schema';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly todosService: UserService) {}

  @Get('todos')
  async getTodos(@Request() req): Promise<Todo[]> {
    return this.todosService.getTodos(req.user);
  }

  @Get('todo/:id')
  async getTodoById(@Param('id') id: string, @Request() req) {
    const foundTodo = this.todosService.getTodoById(id, req.user);
    if (!foundTodo) throw new HttpException('Todo not found', 404);
    return foundTodo;
  }

  @Post('todo')
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Request() req,
  ): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto, req.user);
  }

  @Put('todo/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ): Promise<Todo> {
    return this.todosService.updateTodo(id, updateTodoDto, req.user);
  }

  @Delete('todo/:id')
  async deleteTodo(@Param('id') id: string, @Request() req): Promise<Todo> {
    return this.todosService.deleteTodo(id, req.user);
  }
}
