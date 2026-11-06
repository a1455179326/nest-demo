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
