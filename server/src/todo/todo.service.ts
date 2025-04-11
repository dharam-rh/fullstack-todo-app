import { Injectable, OnModuleInit } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService implements OnModuleInit {
  private todos: Todo[] = [];

  onModuleInit() {
    this.seedTodos();
  }

  private seedTodos() {
    this.todos = [
      {
        id: uuidv4(),
        title: '📝 Update README with setup instructions',
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: '🧹 Clean up unused components',
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: '🔁 Handle loading and error states for todos',
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: '📦 Set up GraphQL Code Generator',
        isCompleted: false,
      },
    ];
  }
  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const newTodo: Todo = {
      id: uuidv4(),
      isCompleted: false,
      ...createTodoInput,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  updateTodo(id: string, update: Partial<Todo>): Todo {
    const todo = this.findOne(id);
    if (!todo) throw new Error('TODO NOT EXISTS!');
    Object.assign(todo, update);
    return todo;
  }
}
