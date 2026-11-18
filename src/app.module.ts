/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-02 16:14:22
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-17 15:50:02
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
import { APP_FILTER, APP_GUARD,APP_INTERCEPTOR,  } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ColorMiddleWare } from './common/middleware/color.middleware';
import { TodosModule } from './todos/todos.module';
import { AnimalsModule } from './animals/animals.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
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
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, ColorMiddleWare)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
