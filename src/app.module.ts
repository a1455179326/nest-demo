/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-02 16:14:22
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-06 15:09:48
 * @FilePath: \nest\src\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ColorMiddleWare } from './common/middleware/color.middleware';
import { TodosModule } from './todos/todos.module';
import { AnimalsModule } from './animals/animals.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'nest',
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'todo.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CatsModule,
    TodosModule,
    AnimalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, ColorMiddleWare)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
