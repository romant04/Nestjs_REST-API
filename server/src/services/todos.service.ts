import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../schemas/todo.schema';
import { UpdateTodoDto } from '../dto/update-todo.dto';

// TODO: Implement users and authentication
// TODO: Create a frontend for this API
@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  getTodos() {
    return this.todoModel.find();
  }

  getTodoById(id: string) {
    return this.todoModel.findById(id);
  }

  createTodo(todo: CreateTodoDto) {
    const newTodo = new this.todoModel(todo);
    return newTodo.save();
  }

  updateTodo(id: string, todo: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, todo, {
      new: true,
    });
  }

  deleteTodo(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
