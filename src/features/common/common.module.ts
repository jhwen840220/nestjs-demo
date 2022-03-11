import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoModule } from '../todo/todo.module';
import { AddUserMiddleware } from '../../middlewares/add-user.middleware';
@Module({
  imports: [TodoModule],
  exports: [TodoModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddUserMiddleware).forRoutes('*');
  }
}
