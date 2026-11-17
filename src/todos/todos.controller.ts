/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-10 08:35:12
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-17 15:50:39
 * @FilePath: \nest\src\todos\todos.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  // UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { QueryTodoDto } from './dto/query-todo.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/guards/jwt-auth.guard';
@Controller('todos')
// @UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.create(user.sub, createTodoDto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() query: QueryTodoDto) {
    return this.todosService.findAll(user.sub, query);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.findOne(user.sub, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(user.sub, id, updateTodoDto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.remove(user.sub, id);
  }
}
