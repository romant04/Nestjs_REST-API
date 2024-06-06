import { HttpException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Todo } from '../schemas/todo.schema';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from '../schemas/user.schema';

// TODO: Create a frontend for this API
@Injectable()
export class UserService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<Todo>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getTodos(user: User) {
    const userData = await this.userModel
      .findOne()
      .where('email')
      .equals(user.email)
      .populate('todos');
    return userData.todos;
  }

  async getTodoById(id: string, user: User) {
    const userData = await this.userModel
      .findOne()
      .where('email')
      .equals(user.email);
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new HttpException('Todo not found', 404);
    const todoKeys = userData.todos as unknown;
    const todoIds = todoKeys as Types.ObjectId[];
    if (!todoIds.includes(todo._id))
      throw new HttpException('Todo is not yours', 404);
    return todo;
  }

  async createTodo(todo: CreateTodoDto, user: User) {
    const findUser = await this.userModel
      .findOne()
      .where('email')
      .equals(user.email);
    if (!findUser) throw new HttpException('User not found', 404);
    const newTodo = new this.todoModel(todo);
    newTodo._id = new mongoose.Types.ObjectId();
    const savedTodo = await newTodo.save();
    await findUser.updateOne({ $push: { todos: savedTodo._id } }).exec();
    return savedTodo;
  }

  async updateTodo(id: string, todo: UpdateTodoDto, user: User) {
    const userData = await this.userModel
      .findOne()
      .where('email')
      .equals(user.email);
    const todoKeys = userData.todos as unknown;
    const todoIds = todoKeys as string[];
    if (!todoIds.includes(id))
      throw new HttpException('Todo is not yours', 404);

    return this.todoModel.findByIdAndUpdate(id, todo, {
      new: true,
    });
  }

  async deleteTodo(id: string, user: User) {
    const userData = await this.userModel
      .findOne()
      .where('email')
      .equals(user.email);
    const todoKeys = userData.todos as unknown;
    const todoIds = todoKeys as string[];

    if (!todoIds.includes(id))
      throw new HttpException('Todo is not yours', 404);

    return this.todoModel.findByIdAndDelete(id);
  }
}
