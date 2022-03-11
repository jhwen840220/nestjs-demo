import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
  OnModuleInit,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { Agent } from 'https';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';
import { CommonModule } from './features/common/common.module';
import { UserModule } from './features/user/user.module';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigurationModule } from './common/configuration/configuration.module';

import configurationFactory from './config/configuration.factory';
import { MulterHelper } from './core/helpers/multer.helper';

import { UserEntity } from './features/user/entitiy/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
      expandVariables: true, // 開啟環境變數檔變數嵌入功能
      load: [configurationFactory],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'test',
      database: 'test',
      entities: [UserEntity],
      synchronize: true,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        httpsAgent: new Agent({ rejectUnauthorized: false }),
        timeout: config.get('HTTP_TIMEOUT'),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: MulterHelper.destination,
        filename: MulterHelper.filenameHandler,
      }),
    }),
    TodoModule,
    CopyTodoModule,
    CommonModule,
    ConfigurationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude({ path: '/todos', method: RequestMethod.GET })
      .forRoutes({ path: '/todos', method: RequestMethod.GET });
  }

  onModuleInit() {
    console.log('[App module]: init');
  }
}
