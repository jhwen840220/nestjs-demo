import { Controller, Post, Body, UsePipes, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @UsePipes(
  //   new ValidationPipe({
  //     exceptionFactory: (errors: ValidationError[]) => {
  //       return new NotAcceptableException('格式錯誤');
  //     },
  //   }),
  // )
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
