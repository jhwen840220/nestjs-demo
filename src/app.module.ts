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
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './features/common/common.module';
import { UserModule } from './features/user/user.module';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigurationModule } from './common/configuration/configuration.module';
import SecretConfigFactory from './config/secret.config';
import { MulterHelper } from './core/helpers/multer.helper';
import { AuthModule } from './features/auth/auth.module';
import { ContactModule } from './features/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
      expandVariables: true, // 開啟環境變數檔變數嵌入功能
      load: [SecretConfigFactory],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
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
    CommonModule,
    ConfigurationModule,
    UserModule,
    AuthModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private connection: Connection) {}

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
