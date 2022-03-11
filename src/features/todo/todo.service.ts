import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todos: { id: number; title: string; description: string }[] = [
    {
      id: 1,
      title: 'Title 1',
      description: '',
    },
  ];

  getTodos(): { id: number; title: string; description: string }[] {
    return this.todos;
  }

  getTodo(id: number) {
    const todo = this.todos.find((x) => x.id === id);
    return todo || {};
  }

  createTodo(item: { id: number; title: string; description: string }) {
    this.todos.push(item);
  }
}
