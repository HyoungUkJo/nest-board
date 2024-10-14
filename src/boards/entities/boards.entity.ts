import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from '../boards-status-enum';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
    /*
     * ManyToOne : 다대일 관계를 가지고 있음
     * eager true: user을 조회할때 게시글에 대한 정보까지 가지고 온다.
    */
  @ManyToOne(type=> User, user=>user.boards, {eager: false})
  user: User
}
