/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-04 15:37:08
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-04 15:39:53
 * @FilePath: \nest\src\todos\dto\update-todo.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PartialType } from '@nestjs/mapped-types';

import { CreateTodoDto } from './create-todo.dto.js';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
