import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.userService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findOneById(id);
    const { password, ...result } = user;
    return result;
  }
}
