import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service.js';
import { CreateCatDto } from './dto/create-cat.dto.js';
import { UpdateCatDto } from './dto/update-cat.dto.js';

import {ForbiddenException}  from '../common/exception/forbidden.exception.js';
import {RolesGuard} from "../guard/roles.guard.js"

@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
     throw new ForbiddenException();
    // return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
