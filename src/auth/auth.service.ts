/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-11 09:02:16
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-13 15:59:45
 * @FilePath: \nest\src\auth\auth.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  ConflictException,
  Injectable,UnauthorizedException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt, timingSafeEqual, } from 'node:crypto';
import { promisify } from 'node:util';
import { QueryFailedError } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByUsername(
      dto.username,
    );

    if (existing) {
      throw new ConflictException('用户名已存在');
    }

    // 每个密码使用独立的随机盐
    const salt = randomBytes(16).toString('hex');

    const derivedKey = (await scryptAsync(
      dto.password,
      salt,
      64,
    )) as Buffer;

    // 同时保存算法标识、盐和哈希，供登录时验证
    const passwordHash =
      `scrypt:${salt}:${derivedKey.toString('hex')}`;
    try {
      const user = await this.usersService.create(
        dto.username,
        passwordHash,
      );

      // 显式选择响应字段，避免泄露密码哈希
      return {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      };
    } catch (error) {
      // 两个请求可能同时通过上面的重复检查，
      // 因此还需要处理数据库唯一约束冲突。
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        throw new ConflictException('用户名已存在');
      }

      throw error;
    }
  }

 async login(dto: LoginDto) {
  const user =
    await this.usersService.findByUsernameWithPassword(
      dto.username,
    );
    // console.log(user)

  // 用户不存在也走一次哈希比较之外的分支，
  // 统一返回相同错误提示。
  if (!user) {
    throw new UnauthorizedException('用户名或密码错误');
  }

  const valid = await this.verifyPassword(
    dto.password,
    user.passwordHash,
  );

  if (!valid) {
    throw new UnauthorizedException('用户名或密码错误');
  }

  const accessToken = await this.jwtService.signAsync({
    sub: user.id,
    username: user.username,
  });

  return { accessToken };
}

private async verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [algorithm, salt, hashHex] = stored.split(':');

  if (algorithm !== 'scrypt' || !salt || !hashHex) {
    return false;
  }

  const expected = Buffer.from(hashHex, 'hex');

  const actual = (await scryptAsync(
    password,
    salt,
    expected.length,
  )) as Buffer;

  // 长度一致时使用恒定时间比较
  return (
    actual.length === expected.length &&
    timingSafeEqual(actual, expected)
  );
}

}