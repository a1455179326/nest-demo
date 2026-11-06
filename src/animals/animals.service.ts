import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

export interface Animals {
  id: number;
  name: string;
  gender: string;
  species: string;
  age: number;
}

@Injectable()
export class AnimalsService {
  private animals: Animals[] = [];
  private nextId: number = 1;
  create(createAnimalDto: CreateAnimalDto) {
    const aniaml = {
      id: this.nextId,
      name: createAnimalDto.name,
      gender: createAnimalDto.gender,
      species: createAnimalDto.species,
      age: 888,
    };
    this.animals.push(aniaml);
    this.nextId++;
    return aniaml;
  }

  findAll() {
    return this.animals;
  }

  findOne(id: number) {
    const animal = this.animals.find((item) => item.id === id);
    if (!animal) {
      throw new NotFoundException(`animal ${id}不存在`);
    }
    return animal;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const aniaml = this.findOne(id);
    if (updateAnimalDto.name !== undefined) {
      aniaml.name = updateAnimalDto.name;
    }
    if (updateAnimalDto.age !== undefined) {
      aniaml.age = updateAnimalDto.age;
    }
    return aniaml;
  }

  remove(id: number) {
    const aniaml = this.findOne(id);
    this.animals = this.animals.filter((item) => item.id !== id);
    return aniaml;
  }
}
