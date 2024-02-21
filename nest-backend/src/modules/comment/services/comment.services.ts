import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CreateCommentDto } from '../dtos/requests/create-comment.dto';

@Injectable()
export class CommentServices {
  constructor(private commentRepository: CommentRepository) {}

  async create(dto: CreateCommentDto) {
    const sprint = await this.commentRepository.create(dto);

    return sprint;
  }
}
