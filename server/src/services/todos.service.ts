import { HttpException, Injectable } from '@nestjs/common';
import { Todo } from '../interfaces/todo.interface';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';

// TODO: implement MongoDB
// TODO: Create a frontend for this API
@Injectable()
export class TodosService {
  private currentId = 3; // We don't need to decrement it just increment it

  // Scaffolded data
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      done: false,
      dueDate: new Date('2024-8-28'),
      description: 'Description 1',
    },
    {
      id: 2,
      title: 'Todo 2',
      done: false,
      dueDate: new Date('2025-4-10'),
      description: 'Description 2',
    },
    {
      id: 3,
      title: 'Todo 3',
      done: false,
      dueDate: new Date('2024-6-10'),
      description: 'Description 3',
    },
  ];

  getTodos() {
    return this.todos;
  }

  getTodoById(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  createTodo(todo: CreateTodoDto) {
    this.currentId++;
    this.todos.push({ ...todo, id: this.currentId });
    return this.todos[this.todos.length - 1];
  }

  updateTodo(id: number, todo: UpdateTodoDto) {
    const index = this.todos.findIndex((x) => x.id === id);

    if (this.todos.find((x) => x.id === id) === undefined) {
      throw new HttpException('Todo not found', 404);
    }

    this.todos[index] = { ...this.todos[index], ...todo };
    return this.todos[index];
  }

  deleteTodo(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    const todo = this.todos[index];
    this.todos.splice(index, 1);
    return todo;
  }
}
