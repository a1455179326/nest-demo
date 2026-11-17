/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-17 09:43:24
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-17 15:18:26
 * @FilePath: \nest\src\auth\decorators\current-user.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtPayload } from '../guards/jwt-auth.guard';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    return ctx.switchToHttp().getRequest().user;
  },
);
