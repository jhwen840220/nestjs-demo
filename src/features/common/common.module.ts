import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AddUserMiddleware } from '../../middlewares/add-user.middleware';

export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AddUserMiddleware).forRoutes('*');
  }
}
