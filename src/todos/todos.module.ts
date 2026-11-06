/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-04 15:37:08
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-06 15:10:30
 * @FilePath: \nest\src\todos\todos.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service.js';
import { TodosController } from './todos.controller.js';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
