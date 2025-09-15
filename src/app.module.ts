import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/perla-metro-tickets'),   TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
