import { Module, NestModule,RequestMethod,MiddlewareConsumer } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CatsModule } from './cats/cats.module.js';

import { LoggerMiddleware } from './common/middleware/logger.middleware.js';
import { ColorMiddleWare } from './common/middleware/color.middleware.js';

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
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
   configure(consumer: MiddlewareConsumer) {
   consumer
     .apply(LoggerMiddleware,ColorMiddleWare)
     .forRoutes({ path: 'cats', method: RequestMethod.GET });
 }
}
