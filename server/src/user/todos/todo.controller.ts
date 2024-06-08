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
import { AuthGuard } from '../../auth/auth.guard';
import { TodoService } from './todo.service';
import { Todo } from '../../schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller()
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Get()
  async getTodos(@Request() req): Promise<Todo[]> {
    return this.todosService.getTodos(req.user);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string, @Request() req) {
    const foundTodo = this.todosService.getTodoById(id, req.user);
    if (!foundTodo) throw new HttpException('Todo not found', 404);
    return foundTodo;
  }

  @Post()
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Request() req,
  ): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto, req.user);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ): Promise<Todo> {
    return this.todosService.updateTodo(id, updateTodoDto, req.user);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Request() req): Promise<Todo> {
    return this.todosService.deleteTodo(id, req.user);
  }
}
