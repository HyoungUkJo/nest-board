import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.provider';

@Module({
  imports: [BoardsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
