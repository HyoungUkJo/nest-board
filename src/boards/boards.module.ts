import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { DatabaseModule } from 'src/database/database.module';
import { boardsProviders } from './boards.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [BoardsService, ...boardsProviders],
})
export class BoardsModule {}
