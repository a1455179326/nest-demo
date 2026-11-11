/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-11 09:02:06
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-11 13:30:42
 * @FilePath: \nest\src\users\users.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  create(username:string,passwordHash:string){
    const user = this.userRepository.create({
        username,
        passwordHash
    })
    return this.userRepository.save(user)
  }
}
