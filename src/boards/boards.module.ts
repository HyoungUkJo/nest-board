import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './boards.repository';
import { DatabaseModule } from 'src/database/database.module';
import { boardsProviders } from './boards.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [BoardsService, ...boardsProviders],
})
export class BoardsModule {}
