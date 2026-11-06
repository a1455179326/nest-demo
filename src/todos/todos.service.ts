/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-04 15:37:08
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-06 14:30:43
 * @FilePath: \nest\src\todos\todos.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { QueryTodoDto } from './dto/query-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create({
      title: createTodoDto.title,
      completed: false,
    });
    return this.todoRepository.save(todo);
  }

  async findAll(query: QueryTodoDto) {
    const { page, limit, keyword, complated } = query;

    const where: FindOptionsWhere<Todo> = {};

    if (keyword?.trim()) {
      where.title = Like(`%${keyword.trim()}%`);
    }

    if (complated !== undefined) {
      where.completed = complated;
    }

    const [items, total] = await this.todoRepository.findAndCount({
      where,
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    const todo = this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`代办${id}不存在`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);

    if (!todo) {
      return;
    }

    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }
    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }

    return todo;
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    if (!todo) {
      return;
    }

    await this.todoRepository.remove(todo);

    return { ...todo, id };
  }
}
