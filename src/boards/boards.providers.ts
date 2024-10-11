import { DataSource } from 'typeorm';
import { Board } from './entities/boards.entity';

export const boardsProviders = [
  {
    provide: 'BOARD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Board),
    inject: ['DATA_SOURCE'],
  },
];