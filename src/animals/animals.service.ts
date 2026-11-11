/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-10 08:35:12
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-10 14:20:06
 * @FilePath: \nest\src\animals\animals.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { QueryAnimalDto } from './dto/query-animal.dto';

import { Animal } from './entities/animal.entity';
export interface Animals {
  id: number;
  name: string;
  gender: string;
  species: string;
  age: number;
}

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly AnimalRepository: Repository<Animal>,
  ) {}

  create(createAnimalDto: CreateAnimalDto) {
    const animal = this.AnimalRepository.create({
      name: createAnimalDto.name,
      gender: createAnimalDto.gender,
      species: createAnimalDto.species,
      age: createAnimalDto.age,
    });
    return this.AnimalRepository.save(animal);
  }

  async findAll(query: QueryAnimalDto) {
    const { page, limit, keyword } = query;
    const where: FindOptionsWhere<Animal> = {};

    const keywordTrim = keyword?.trim();
    if (keyword?.trim()) {
      where.name = Like(`%${keywordTrim}%`);
    }

    const [items, total] = await this.AnimalRepository.findAndCount({
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

 async findOne(id: number) {
    const animal =await this.AnimalRepository.findOneBy({id})
    if(!animal){
      throw new NotFoundException(`${id}不存在`)
    }
    return animal
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {}

  remove(id: number) {}
}
