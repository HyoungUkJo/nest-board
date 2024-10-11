import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status-enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
    const {title, description} = createBoardDto;

    const board = this.boardRepository.create({
        title,
        description,
        status: BoardStatus.PUBLIC
    });

    await this.boardRepository.save(board);
    return board;
  }

  /* private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto){
        const {title, description} = createBoardDto

        const board = {
            id: uuid(),
            title,          // title: title
            description,    // description: description
            status: BoardStatus.PUBLIC
        }
        
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found =  this.boards.find((board)=> board.id === id);
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    deleteBoard(id:string): void {
        const found =  this.getBoardById(id);
        this.boards = this.boards.filter((board)=> board.id !== found.id);
    }

    updateBoardSataus(id:string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    } */
}
