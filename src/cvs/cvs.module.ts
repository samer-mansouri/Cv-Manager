import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { Cv } from './entities/cv.entity';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { CvsControllerV2 } from './cvs.controllerV2';

@Module({
  imports: [TypeOrmModule.forFeature([Cv])],
  controllers: [CvsController, CvsControllerV2],
  providers: [CvsService],
  exports: [CvsService, TypeOrmModule.forFeature([Cv])],
})
export class CvsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'v2/*', method: RequestMethod.ALL });
  }
}
