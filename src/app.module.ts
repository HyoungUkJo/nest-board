import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { DatabaseModule } from './database/database.module';
import { Database } from './database/database.provider';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BoardsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}
