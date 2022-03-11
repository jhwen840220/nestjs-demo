import { Module } from '@nestjs/common';
import { CopyTodoController } from './copy-todo.controller';
import { CommonModule } from '../common/common.module';
@Module({
  imports: [CommonModule],
  controllers: [CopyTodoController],
})
export class CopyTodoModule {}
