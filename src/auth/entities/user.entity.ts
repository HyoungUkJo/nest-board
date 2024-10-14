import { Board } from 'src/boards/entities/boards.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  /*
   * OneToMany : 일 대다 관계를 가지고 있음
   * eager true: user을 조회할때 게시글에 대한 정보까지 가지고 온다.
   */
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
