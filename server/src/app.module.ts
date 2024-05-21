import { HttpModule } from '@nestjs/axios';
import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BlockController } from './block/block.controller';
import { BlockService } from './block/block.service';
import { HttpExceptionFilter } from './share/filters/http-exception.filter';
import { TransformInterceptor } from './share/interceptors/transform.interceptor';
import { LoggerMiddleware } from './share/middleware/logger.middleware';
import { ValidationPipe } from './share/pipes/validate.pipe';
import { ShareModule } from './share/share.module';
import { SpaceController } from './space/space.controller';
import { SpaceService } from './space/space.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { WsModule } from './ws/ws.module';
import { MinioModule } from './minio/minio.module';
import { TemplateController } from './template/template.controller';
import { TemplateService } from './template/template.service';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [
    ShareModule,
    AuthModule,
    HttpModule.register({
      timeout: 5000,
    }),
    WsModule,
    MinioModule,
  ],
  controllers: [
    AppController,
    UserController,
    BlockController,
    SpaceController,
    TemplateController,
    CategoryController,
  ],
  providers: [
    AppService,
    UserService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    BlockService,
    SpaceService,
    TemplateService,
    CategoryService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/*');
  }
}
