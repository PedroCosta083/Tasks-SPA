import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './domain/task/task.module';
import { PrismaClient } from '@prisma/client';
import { TagModule } from './domain/tags/tag.module';

@Module({
  imports: [TaskModule,TagModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: PrismaClient,
    useValue: new PrismaClient(),
  }],
})
export class AppModule { }
