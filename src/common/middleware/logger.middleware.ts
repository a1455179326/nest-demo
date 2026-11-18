/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-02 17:08:01
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-18 09:31:44
 * @FilePath: \nest\src\common\middleware\logger.middleware.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
 use(req: Request, res: Response, next: NextFunction) {
   next();
 }
}
