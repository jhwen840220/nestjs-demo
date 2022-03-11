import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly appService: AppService;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly configService: ConfigService,
  ) {
    this.appService = this.moduleRef.get(AppService);
  }

  @Get('/todo')
  getTodos() {
    return this.appService.getTodos();
  }

  @Get()
  getHello() {
    const username = this.configService.get('USERNAME');
    const port = this.configService.get('PORT');
    const db_host = this.configService.get('database.host');
    const app_domain = this.configService.get('APP_DOMAIN');
    const redirect_url = this.configService.get('APP_REDIRECT_URL');
    return { username, port, db_host, app_domain, redirect_url };
  }

  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  // @Post('/multiple')
  // @UseInterceptors(FilesInterceptor('files'))
  // uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
  //   return files.map(({ fieldname, originalname }) => ({
  //     fieldname,
  //     originalname,
  //   }));
  // }

  @Post('/multiple')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'first' }, { name: 'second' }]),
  )
  uploadMultipleFiles(
    @UploadedFiles() files: { [x: string]: Express.Multer.File[] },
  ) {
    const { first, second } = files;
    const list = [...first, ...second];
    return list.map(({ fieldname, originalname }) => ({
      fieldname,
      originalname,
    }));
  }
}
