/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-11 09:02:11
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-11 15:09:06
 * @FilePath: \nest\src\auth\auth.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
