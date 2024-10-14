import { DataSource } from 'typeorm';
import * as config from 'config'; // config 모듈 import 필요

const dbConfig = config.get('db');

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: dbConfig.type,
        host: process.env.RDS_HOSTNAME || dbConfig.host,
        port: process.env.RDS_PORT ||dbConfig.port,
        username: process.env.USERNAME || dbConfig.username,
        password: process.env.PASSWORD || dbConfig.password,
        database: process.env.DATABASE || dbConfig.database,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: dbConfig.synchronize,
      });

      return dataSource.initialize();
    },
  },
];