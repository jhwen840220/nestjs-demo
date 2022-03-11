import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseArrayPipe,
  BadRequestException,
  NotAcceptableException,
  UseGuards,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { TodoService } from './todo.service';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from '../../decorators/user.decorator';
import { Auth } from '../../decorators/auth.decorator';
import { ConfigurationService } from 'src/common/configuration/configuration.service';
@Controller('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly configService: ConfigurationService,
  ) {}

  @Get()
  getAll() {
    return this.todoService.getTodos();
  }

  @Auth('staff')
  @Get('/user')
  getUser(@User('name') name: string): object {
    return { name, username: this.configService.get('USERNAME') };
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new NotAcceptableException('格式錯誤');
      },
    }),
  )
  create(@Body() dto: CreateTodoDto) {
    return {
      id: 1,
      ...dto,
    };
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTodoDto) {
    return {
      id,
      ...dto,
    };
  }

  @Post('/multi')
  createMulti(
    @Body(new ParseArrayPipe({ items: CreateTodoDto })) dtos: CreateTodoDto[],
  ) {
    return dtos;
  }

  @Get(':id')
  getTodo(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.todoService.getTodo(id);
  }

  @Get('/error')
  getError() {
    throw new BadRequestException('出錯囉!');
  }
}
