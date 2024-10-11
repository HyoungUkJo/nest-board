import { BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { BoardStatus } from '../boards-status-enum';

export class Board extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
