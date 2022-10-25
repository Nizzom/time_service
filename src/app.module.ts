import { JsonRpcModule } from '@jashkasoft/nestjs-json-rpc';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeModule } from './time/time.module';

@Module({
  imports: [
    TimeModule,
    JsonRpcModule.forRoot({
      path: '/rpc',
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
