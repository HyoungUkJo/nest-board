import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status-enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/boards.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async deletebBoard(id: number, user:User): Promise<void> {
    const result = await this.boardRepository.delete({id, user});
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }

/*   async getUserBoards(user:User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', {userId: user.id})
    
    const boards = await query.getMany();
    return boards;
  }
 */
  async getUserBoards(user:User): Promise<Board[]> {
    const boards = await this.boardRepository.findBy({user: user})
    return boards;
  }
}
