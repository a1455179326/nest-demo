import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

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
    private readonly AnimalRepository: Repository<Animal>
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

  findAll() {
   
  }

  findOne(id: number) {
    
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
     
  }

  remove(id: number) {
    
  }
}
