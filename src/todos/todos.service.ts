import { Injectable,NotFoundException  } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';


export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TodosService {
  private todolist: Todo[] = []
  private nextId: number  = 1

  create(createTodoDto: CreateTodoDto) {
    const todo :Todo ={
      id:this.nextId++,
      title: createTodoDto.title,
      completed: true
    }
    this.todolist.push(todo)
    return todo
  }

  findAll() {
    return this.todolist;
  }

  findOne(id: number) {
    const find = this.todolist.find(item=>item.id === id);
    if(!find){
      throw new NotFoundException(`代办${id}不存在`)
    }
    return find;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    
    if(updateTodoDto.title !== undefined){
       todo.title = updateTodoDto.title
    }
    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }

    return todo
  }

  remove(id: number) {
   const todo = this.findOne(id);

    this.todolist = this.todolist.filter((item) => item.id !== id);
    return todo;
  }
}
