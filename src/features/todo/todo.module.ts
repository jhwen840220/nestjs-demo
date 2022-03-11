import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../common/configuration/configuration.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      path: `../${process.env.NODE_ENV || 'development'}.env`,
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
