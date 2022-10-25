import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TimeHandler } from './rpc.handler';
import { TimeService } from './time.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './logger.middleware';
import { In_request, In_requestSchema } from './schemas/in_requests.schema';
import { Out_request, Out_requestSchema } from './schemas/out_requests.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: In_request.name, schema: In_requestSchema },
      { name: Out_request.name, schema: Out_requestSchema },
    ]),
  ],
  controllers: [],
  providers: [TimeService, TimeHandler],
})
export class TimeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('rpc');
  }
}
